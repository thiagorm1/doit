export type SavedPlaylist = { id: string, name: string };
type Listener = () => void;

class YoutubeService {
  private player: any = null;
  private isApiReady = false;
  private pendingPlaylistId: string | null = null;
  private updateInterval: any = null;
  private listeners: Listener[] = [];

  public isPlaying = false;
  public currentTime = 0;
  public duration = 0;
  public volume = 100;
  public activeListId: string | null = null;
  public currentVideoData = {
    title: 'Sem áudio',
    artist: 'Nenhuma playlist selecionada',
    cover: ''
  };
  public savedPlaylists: SavedPlaylist[] = [];

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
    // Keep only listeners that don't throw (or we can just run them safely)
    this.listeners = this.listeners.filter(fn => {
      try {
        fn();
        return true;
      } catch (e) {
        return false; // Auto-unsubscribe if DOM is gone and throws error
      }
    });
  }

  private loadSavedState() {
    try {
      const savedPlaylistsStr = localStorage.getItem('doit_yt_playlists');
      this.savedPlaylists = savedPlaylistsStr ? JSON.parse(savedPlaylistsStr) : [];
      
      const savedStateStr = localStorage.getItem('doit_yt_state');
      if (savedStateStr) {
        const state = JSON.parse(savedStateStr);
        if (state.volume !== undefined) this.volume = state.volume;
        // Rest of state is loaded when player is ready
      }
    } catch(e) {}
  }

  private saveState() {
    try {
      if (this.activeListId) {
        const state = {
          listId: this.activeListId,
          index: this.player?.getPlaylistIndex() || 0,
          time: this.currentTime,
          volume: this.volume
        };
        localStorage.setItem('doit_yt_state', JSON.stringify(state));
      }
    } catch(e) {}
  }

  public savePlaylists(playlists: SavedPlaylist[]) {
    this.savedPlaylists = playlists;
    localStorage.setItem('doit_yt_playlists', JSON.stringify(playlists));
    this.notify();
  }

  private initDOM() {
    // Append hidden iframe container to body
    if (!document.getElementById('yt-global-container')) {
      const div = document.createElement('div');
      div.id = 'yt-global-container';
      div.className = 'hidden absolute opacity-0 pointer-events-none w-0 h-0';
      document.body.appendChild(div);
    }

    // Load Iframe API
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
    this.isApiReady = true;
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

    if (this.pendingPlaylistId) {
      this.player.loadPlaylist({ list: this.pendingPlaylistId, listType: 'playlist' });
      this.pendingPlaylistId = null;
    } else {
      // Auto-resume state
      try {
        const saved = localStorage.getItem('doit_yt_state');
        if (saved) {
          const state = JSON.parse(saved);
          if (state.listId) {
            this.activeListId = state.listId;
            this.player.cuePlaylist({
              list: state.listId,
              listType: 'playlist',
              index: state.index || 0,
              startSeconds: state.time || 0
            });
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
  
  public loadPlaylist(listId: string) {
    this.activeListId = listId;
    if (!this.player) {
      this.pendingPlaylistId = listId;
    } else {
      this.player.loadPlaylist({ list: listId, listType: 'playlist' });
    }
    this.saveState();
  }

  public togglePlay() {
    if (!this.player) return;
    if (this.isPlaying) this.player.pauseVideo();
    else this.player.playVideo();
  }

  public nextVideo() {
    if (this.player) this.player.nextVideo();
  }

  public prevVideo() {
    if (this.player) this.player.previousVideo();
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
