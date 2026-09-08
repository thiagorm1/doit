export type YoutubeMediaType = 'video' | 'playlist';

export type SavedMedia = {
  id: string;
  name: string;
  type: YoutubeMediaType;
};

// Backwards compatibility alias
export type SavedPlaylist = SavedMedia;

export interface ParsedYoutubeUrl {
  id: string;
  type: YoutubeMediaType;
}

export const parseYoutubeUrl = (input: string, preferType?: YoutubeMediaType): ParsedYoutubeUrl | null => {
  const trimmed = input.trim();
  if (!trimmed) return null;

  try {
    let url: URL | null = null;
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      url = new URL(trimmed);
    } else if (trimmed.includes('youtube.com/') || trimmed.includes('youtu.be/')) {
      url = new URL('https://' + trimmed);
    }

    if (url) {
      const hostname = url.hostname.replace('www.', '');

      // youtu.be/VIDEO_ID
      if (hostname === 'youtu.be') {
        const videoId = url.pathname.slice(1).split('/')[0].split('?')[0];
        const list = url.searchParams.get('list');
        if (preferType === 'playlist' && list) {
          return { id: list, type: 'playlist' };
        }
        if (videoId) {
          return { id: videoId, type: 'video' };
        }
      }

      const v = url.searchParams.get('v');
      const list = url.searchParams.get('list');

      if (preferType === 'playlist' && list) {
        return { id: list, type: 'playlist' };
      }
      if (preferType === 'video' && v) {
        return { id: v, type: 'video' };
      }

      if (v) {
        return { id: v, type: 'video' };
      }
      if (list) {
        return { id: list, type: 'playlist' };
      }

      const paths = url.pathname.split('/').filter(Boolean);
      if (paths.length >= 2 && (paths[0] === 'embed' || paths[0] === 'shorts')) {
        return { id: paths[1], type: 'video' };
      }
    }
  } catch (e) {}

  // Fallbacks if not recognized as standard URL
  if (trimmed.includes('list=')) {
    const match = trimmed.match(/list=([a-zA-Z0-9_-]+)/);
    if (match) return { id: match[1], type: 'playlist' };
  }

  if (trimmed.includes('v=')) {
    const match = trimmed.match(/v=([a-zA-Z0-9_-]+)/);
    if (match) return { id: match[1], type: 'video' };
  }

  if (preferType === 'playlist') {
    return { id: trimmed, type: 'playlist' };
  }
  if (preferType === 'video') {
    return { id: trimmed, type: 'video' };
  }

  if (trimmed.startsWith('PL') || trimmed.startsWith('UU') || trimmed.startsWith('LL') || trimmed.startsWith('RD') || trimmed.length > 20) {
    return { id: trimmed, type: 'playlist' };
  }

  return { id: trimmed, type: 'video' };
};

type Listener = () => void;

class YoutubeService {
  private player: any = null;
  private pendingMedia: { id: string, type: YoutubeMediaType } | null = null;
  private updateInterval: any = null;
  private listeners: Listener[] = [];

  public isPlaying = false;
  public currentTime = 0;
  public duration = 0;
  public volume = 100;
  
  public activeId: string | null = null;
  public activeType: YoutubeMediaType = 'playlist';

  public get activeListId(): string | null {
    return this.activeId;
  }
  public set activeListId(val: string | null) {
    this.activeId = val;
  }

  public currentVideoData = {
    title: 'Sem áudio',
    artist: 'Nenhuma música ou playlist selecionada',
    cover: ''
  };

  public savedPlaylists: SavedMedia[] = [];

  constructor() {
    this.loadSavedState();
    this.initDOM();
  }

  public subscribe(listener: Listener) {
    this.listeners.push(listener);
    listener(); // Initial sync
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  public notify() {
    this.listeners = this.listeners.filter(fn => {
      try {
        fn();
        return true;
      } catch (e) {
        return false;
      }
    });
  }

  private loadSavedState() {
    try {
      const savedStr = localStorage.getItem('doit_yt_playlists');
      if (savedStr) {
        const parsed = JSON.parse(savedStr);
        this.savedPlaylists = parsed.map((item: any) => ({
          id: item.id,
          name: item.name,
          type: item.type || (item.id.startsWith('PL') || item.id.startsWith('UU') || item.id.startsWith('RD') || item.id.length > 20 ? 'playlist' : 'video')
        }));
      } else {
        this.savedPlaylists = [];
      }
      
      const savedStateStr = localStorage.getItem('doit_yt_state');
      if (savedStateStr) {
        const state = JSON.parse(savedStateStr);
        if (state.volume !== undefined) this.volume = state.volume;
      }
    } catch(e) {}
  }

  private saveState() {
    try {
      if (this.activeId) {
        const state = {
          id: this.activeId,
          type: this.activeType,
          listId: this.activeId,
          index: this.player?.getPlaylistIndex ? this.player.getPlaylistIndex() : 0,
          time: this.currentTime,
          volume: this.volume
        };
        localStorage.setItem('doit_yt_state', JSON.stringify(state));
      }
    } catch(e) {}
  }

  public savePlaylists(playlists: SavedMedia[]) {
    this.savedPlaylists = playlists;
    localStorage.setItem('doit_yt_playlists', JSON.stringify(playlists));
    this.notify();
  }

  private initDOM() {
    if (!document.getElementById('yt-global-container')) {
      const div = document.createElement('div');
      div.id = 'yt-global-container';
      div.className = 'hidden absolute opacity-0 pointer-events-none w-0 h-0';
      document.body.appendChild(div);
    }

    if (!(window as any).YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const checkApi = setInterval(() => {
      if ((window as any).YT && (window as any).YT.Player) {
        clearInterval(checkApi);
        this.initPlayer();
      }
    }, 100);
  }

  private initPlayer() {
    this.player = new (window as any).YT.Player('yt-global-container', {
      height: '10',
      width: '10',
      playerVars: {
        'playsinline': 1,
      },
      events: {
        'onReady': () => this.onPlayerReady(),
        'onStateChange': (e: any) => this.onPlayerStateChange(e)
      }
    });
  }

  private onPlayerReady() {
    if (this.player.setVolume) this.player.setVolume(this.volume);

    if (this.pendingMedia) {
      if (this.pendingMedia.type === 'video') {
        this.player.loadVideoById(this.pendingMedia.id);
      } else {
        this.player.loadPlaylist({ list: this.pendingMedia.id, listType: 'playlist' });
      }
      this.pendingMedia = null;
    } else {
      // Auto-resume state
      try {
        const saved = localStorage.getItem('doit_yt_state');
        if (saved) {
          const state = JSON.parse(saved);
          const id = state.id || state.listId;
          const type: YoutubeMediaType = state.type || (state.listId && !state.type ? 'playlist' : 'video');
          if (id) {
            this.activeId = id;
            this.activeType = type;
            if (type === 'video') {
              if (this.player.cueVideoById) {
                this.player.cueVideoById({
                  videoId: id,
                  startSeconds: state.time || 0
                });
              }
            } else {
              if (this.player.cuePlaylist) {
                this.player.cuePlaylist({
                  list: id,
                  listType: 'playlist',
                  index: state.index || 0,
                  startSeconds: state.time || 0
                });
              }
            }
          }
        }
      } catch(e) {}
    }
    this.updateVideoData();
  }

  private onPlayerStateChange(event: any) {
    this.isPlaying = (event.data === 1); // 1 = playing
    this.updateVideoData();

    if (this.isPlaying) {
      if (!this.updateInterval) {
        this.updateInterval = setInterval(() => {
          this.currentTime = this.player.getCurrentTime();
          this.duration = this.player.getDuration();
          this.saveState();
          this.notify();
        }, 1000);
      }
    } else {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
      this.notify();
    }
  }

  private updateVideoData() {
    if (!this.player || !this.player.getVideoData) return;
    try {
      const data = this.player.getVideoData();
      if (data && data.title) {
        this.currentVideoData = {
          title: data.title,
          artist: data.author || 'YouTube',
          cover: `url(https://img.youtube.com/vi/${data.video_id}/mqdefault.jpg)`
        };
      }
    } catch(e) {}
    this.notify();
  }

  // --- Public Controls ---
  
  public loadMedia(id: string, type: YoutubeMediaType = 'video') {
    this.activeId = id;
    this.activeType = type;
    if (!this.player) {
      this.pendingMedia = { id, type };
    } else {
      if (type === 'video') {
        this.player.loadVideoById(id);
      } else {
        this.player.loadPlaylist({ list: id, listType: 'playlist' });
      }
    }
    this.saveState();
  }

  public loadVideo(videoId: string) {
    this.loadMedia(videoId, 'video');
  }

  public loadPlaylist(listId: string) {
    this.loadMedia(listId, 'playlist');
  }

  public togglePlay() {
    if (!this.player) return;
    if (this.isPlaying) this.player.pauseVideo();
    else this.player.playVideo();
  }

  public nextVideo() {
    if (!this.player) return;
    if (this.activeType === 'playlist' && this.player.nextVideo) {
      this.player.nextVideo();
    } else {
      // Single video: restart playback
      if (this.player.seekTo) {
        this.player.seekTo(0, true);
      }
    }
  }

  public prevVideo() {
    if (!this.player) return;
    if (this.activeType === 'playlist' && this.player.previousVideo) {
      this.player.previousVideo();
    } else {
      if (this.player.seekTo) {
        this.player.seekTo(0, true);
      }
    }
  }

  public setVolume(vol: number) {
    this.volume = vol;
    if (this.player && this.player.setVolume) {
      this.player.setVolume(vol);
      if (vol > 0 && this.player.isMuted && this.player.unMute) {
        this.player.unMute();
      }
    }
    this.saveState();
    this.notify();
  }

  public seek(positionRatio: number) {
    if (!this.player) return;
    const total = this.player.getDuration();
    if (total > 0) {
      this.player.seekTo(total * positionRatio, true);
      this.currentTime = total * positionRatio;
      this.notify();
    }
  }
}

export const ytService = new YoutubeService();
