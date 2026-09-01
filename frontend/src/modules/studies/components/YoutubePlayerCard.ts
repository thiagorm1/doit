export const YoutubePlayerCard = () => `
<section class="glass-panel rounded-xl p-4 flex flex-col relative group glow-hover transition-all duration-300">
  <div class="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
    <div class="absolute -right-12 -top-12 w-40 h-40 bg-secondary/5 rounded-full blur-2xl group-hover:bg-secondary/10 transition-colors pointer-events-none"></div>
  </div>
  
  <div class="flex items-center justify-between relative z-10">
     <div class="flex gap-3 items-center overflow-hidden">
       <div id="yt-cover" class="w-12 h-12 rounded-md bg-surface-container-highest bg-cover bg-center flex shrink-0 items-center justify-center shadow-lg">
         <span class="material-symbols-outlined text-on-surface-variant/50 text-[24px]">music_note</span>
       </div>
       <div class="overflow-hidden flex-1">
         <h3 id="yt-title" class="font-headline-sm font-bold text-on-surface truncate text-sm leading-tight">Sem áudio</h3>
         <p id="yt-artist" class="font-label-md text-on-surface-variant truncate text-[10px] uppercase mt-0.5">Nenhuma playlist selecionada</p>
       </div>
     </div>
     <button id="yt-menu-btn" class="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full hover:bg-white/5 shrink-0">
       <span class="material-symbols-outlined text-[24px]">playlist_play</span>
     </button>
  </div>
  
  <div class="flex flex-col gap-xs mt-2 relative z-10">
     <div class="h-1 bg-surface-container-highest rounded-full overflow-hidden cursor-pointer" id="yt-progress-container">
       <div id="yt-progress-bar" class="h-full bg-primary w-0 pointer-events-none transition-all duration-300"></div>
     </div>
     <div class="flex justify-between text-[10px] text-on-surface-variant font-label-md">
       <span id="yt-time-current">0:00</span>
       <span id="yt-time-total">0:00</span>
     </div>
  </div>

  <div class="flex items-center justify-between mt-2 relative z-10">
    <!-- Espaço vazio para manter os controles centralizados -->
    <div class="w-20 hidden sm:block"></div> 

    <div class="flex items-center justify-center gap-4">
      <button id="yt-btn-prev" class="text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-white/5 transition-colors">
        <span class="material-symbols-outlined text-[18px]">skip_previous</span>
      </button>
      <button id="yt-btn-play" class="w-10 h-10 bg-primary text-on-secondary rounded-full flex items-center justify-center hover:bg-primary-fixed shadow-[0_0_15px_rgba(255,82,82,0.3)] transition-all">
        <span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">play_arrow</span>
      </button>
      <button id="yt-btn-next" class="text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-white/5 transition-colors">
        <span class="material-symbols-outlined text-[18px]">skip_next</span>
      </button>
    </div>

    <!-- Controle de Volume -->
    <div class="flex items-center gap-1.5 w-20 justify-end">
      <span id="yt-volume-icon" class="material-symbols-outlined text-[16px] text-on-surface-variant shrink-0">volume_up</span>
      <input type="range" id="yt-volume" min="0" max="100" value="100" class="w-12 h-1 bg-surface-container-highest rounded-full appearance-none outline-none cursor-pointer accent-primary" />
    </div>
  </div>

  <!-- Modal de Configuração de Playlist -->
  <div id="yt-config-modal" class="hidden absolute top-2 left-1/2 -translate-x-1/2 w-72 z-50 glass-panel bg-surface-container/95 backdrop-blur-md rounded-xl p-4 flex flex-col shadow-2xl border border-outline-variant/50">
    <div class="flex justify-between items-center mb-3">
      <h3 class="font-headline-sm text-on-surface text-sm font-bold">Playlists</h3>
      <button id="yt-config-close" class="text-on-surface-variant hover:text-on-surface"><span class="material-symbols-outlined text-[18px]">close</span></button>
    </div>
    
    <div class="flex flex-col gap-2 shrink-0">
      <input type="text" id="yt-playlist-url" placeholder="URL ou ID da Playlist..." class="w-full bg-surface-container-highest border border-outline-variant/50 rounded px-2 py-1.5 text-xs text-on-surface" />
      <input type="text" id="yt-playlist-name" placeholder="Nome (opcional)" class="w-full bg-surface-container-highest border border-outline-variant/50 rounded px-2 py-1.5 text-xs text-on-surface" />
      <div class="flex gap-2 mt-1">
        <button id="yt-load-btn" class="flex-1 py-1.5 rounded bg-primary text-on-secondary font-bold hover:bg-primary-fixed transition-colors text-xs">Tocar</button>
        <button id="yt-save-btn" class="flex-1 py-1.5 rounded bg-surface border border-outline-variant/50 text-on-surface hover:bg-surface-container-highest transition-colors text-xs">Salvar</button>
      </div>
    </div>
    
    <div class="h-px bg-outline-variant/30 my-3 w-full shrink-0"></div>
    
    <h4 class="font-label-md text-on-surface-variant text-[10px] uppercase mb-1.5 shrink-0">Playlists Salvas</h4>
    <div id="yt-saved-list" class="flex flex-col gap-1 overflow-y-auto custom-scrollbar flex-1 max-h-48 pb-1">
      <!-- Playlists salvas -->
    </div>
  </div>

  <!-- Toast de Notificação -->
  <div id="yt-toast" class="hidden absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-on-secondary px-3 py-1.5 rounded-full shadow-[0_0_15px_rgba(255,82,82,0.3)] items-center gap-1.5 z-[100] transition-opacity duration-300 opacity-0 text-xs font-bold whitespace-nowrap pointer-events-none">
    <span class="material-symbols-outlined text-[16px]">play_circle</span>
    <span id="yt-toast-msg">Tocando...</span>
  </div>

  <!-- Iframe do player escondido -->
  <div id="yt-player-container" class="hidden absolute opacity-0 pointer-events-none w-0 h-0"></div>
</section>
`;

export const initYoutubePlayer = () => {
  const el = {
    title: document.getElementById('yt-title')!,
    artist: document.getElementById('yt-artist')!,
    cover: document.getElementById('yt-cover')!,
    menuBtn: document.getElementById('yt-menu-btn')!,
    playBtn: document.getElementById('yt-btn-play')!,
    prevBtn: document.getElementById('yt-btn-prev')!,
    nextBtn: document.getElementById('yt-btn-next')!,
    progressBar: document.getElementById('yt-progress-bar')!,
    progressContainer: document.getElementById('yt-progress-container')!,
    timeCurrent: document.getElementById('yt-time-current')!,
    timeTotal: document.getElementById('yt-time-total')!,
    modal: document.getElementById('yt-config-modal')!,
    modalClose: document.getElementById('yt-config-close')!,
    urlInput: document.getElementById('yt-playlist-url') as HTMLInputElement,
    nameInput: document.getElementById('yt-playlist-name') as HTMLInputElement,
    loadBtn: document.getElementById('yt-load-btn')!,
    saveBtn: document.getElementById('yt-save-btn')!,
    savedList: document.getElementById('yt-saved-list')!
  };

  let player: any = null;
  let isPlaying = false;
  let updateInterval: any = null;
  let isApiReady = false;
  let pendingPlaylistId: string | null = null;
  let activeListId: string | null = null;

  // Load Iframe API
  if (!window['YT']) {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
  }

  const formatTime = (secs: number) => {
    if (!secs || isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const updateUI = () => {
    if (!player || !player.getPlayerState) return;
    
    const state = player.getPlayerState();
    isPlaying = (state === 1); // 1 = playing
    
    el.playBtn.innerHTML = isPlaying 
      ? `<span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">pause</span>`
      : `<span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">play_arrow</span>`;

    try {
      const data = player.getVideoData();
      if (data && data.title) {
        el.title.textContent = data.title;
        el.artist.textContent = data.author || 'YouTube';
        el.cover.style.backgroundImage = `url(https://img.youtube.com/vi/${data.video_id}/mqdefault.jpg)`;
        el.cover.innerHTML = '';
      }
    } catch(e) {}
  };

  const onPlayerReady = (event: any) => {
    updateUI();
    
    const vol = parseInt((document.getElementById('yt-volume') as HTMLInputElement).value) || 100;
    if (player.setVolume) player.setVolume(vol);

    if (pendingPlaylistId) {
      player.loadPlaylist({ list: pendingPlaylistId, listType: 'playlist' });
      pendingPlaylistId = null;
    } else {
      // Auto-resume state
      try {
        const saved = localStorage.getItem('doit_yt_state');
        if (saved) {
          const state = JSON.parse(saved);
          if (state.listId) {
            activeListId = state.listId;
            player.cuePlaylist({
              list: state.listId,
              listType: 'playlist',
              index: state.index || 0,
              startSeconds: state.time || 0
            });
          }
        }
      } catch(e) {}
    }
  };

  const onPlayerStateChange = (event: any) => {
    updateUI();
    if (event.data === 1) { // Playing
      if (!updateInterval) {
        updateInterval = setInterval(() => {
          const curr = player.getCurrentTime();
          const total = player.getDuration();
          el.timeCurrent.textContent = formatTime(curr);
          el.timeTotal.textContent = formatTime(total);
          if (total > 0) {
            el.progressBar.style.width = `${(curr / total) * 100}%`;
          }
          
          if (activeListId) {
            const state = {
              listId: activeListId,
              index: player.getPlaylistIndex() || 0,
              time: curr
            };
            localStorage.setItem('doit_yt_state', JSON.stringify(state));
          }
        }, 1000);
      }
    } else {
      clearInterval(updateInterval);
      updateInterval = null;
    }
  };

  window['onYouTubeIframeAPIReady'] = () => {
    isApiReady = true;
    player = new window['YT'].Player('yt-player-container', {
      height: '10',
      width: '10',
      playerVars: {
        'playsinline': 1,
      },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  };

  // Se a API já estiver carregada e pronta
  if (window['YT'] && window['YT'].Player && !isApiReady) {
    window['onYouTubeIframeAPIReady']();
  }

  el.playBtn.addEventListener('click', () => {
    if (!player) return;
    if (isPlaying) player.pauseVideo();
    else player.playVideo();
  });

  el.prevBtn.addEventListener('click', () => player && player.previousVideo());
  el.nextBtn.addEventListener('click', () => player && player.nextVideo());

  el.progressContainer.addEventListener('click', (e: MouseEvent) => {
    if (!player) return;
    const rect = el.progressContainer.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const total = player.getDuration();
    if (total > 0) {
      player.seekTo(total * pos, true);
    }
  });

  // Modal logic
  el.menuBtn.addEventListener('click', () => el.modal.classList.remove('hidden'));
  el.modalClose.addEventListener('click', () => el.modal.classList.add('hidden'));

  const loadPlaylist = (listId: string) => {
    activeListId = listId;
    if (!player) {
      pendingPlaylistId = listId;
    } else {
      player.loadPlaylist({ list: listId, listType: 'playlist' });
    }
    el.modal.classList.add('hidden');
  };

  const extractListId = (val: string) => {
    if (val.includes('list=')) {
      try {
        const url = new URL(val);
        return url.searchParams.get('list') || val;
      } catch(e) {
        return val;
      }
    }
    return val;
  };

  el.loadBtn.addEventListener('click', () => {
    const listId = extractListId(el.urlInput.value);
    if (listId) {
      loadPlaylist(listId);
    }
  });

  // Lógica de Toast
  let toastTimeout: any;
  const showToast = (msg: string) => {
    const toast = document.getElementById('yt-toast')!;
    document.getElementById('yt-toast-msg')!.textContent = msg;
    
    clearTimeout(toastTimeout);
    toast.classList.remove('hidden');
    toast.classList.add('flex');
    
    // Pequeno atraso para a transição do Tailwind funcionar
    setTimeout(() => {
      toast.classList.remove('opacity-0');
      toast.classList.add('opacity-100');
    }, 10);
    
    toastTimeout = setTimeout(() => {
      toast.classList.remove('opacity-100');
      toast.classList.add('opacity-0');
      setTimeout(() => {
        toast.classList.remove('flex');
        toast.classList.add('hidden');
      }, 300);
    }, 3000);
  };

  // Lógica de Salvar Playlists
  type SavedPlaylist = { id: string, name: string };
  const getSavedPlaylists = (): SavedPlaylist[] => {
    try {
      const saved = localStorage.getItem('doit_yt_playlists');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  };

  const renderSavedPlaylists = () => {
    const playlists = getSavedPlaylists();
    el.savedList.innerHTML = '';
    if (playlists.length === 0) {
      el.savedList.innerHTML = '<span class="text-[10px] text-on-surface-variant text-center mt-2">Nenhuma salva.</span>';
      return;
    }
    playlists.forEach(pl => {
      const item = document.createElement('div');
      item.className = "flex items-center justify-between bg-surface-container-highest p-1.5 rounded border border-outline-variant/30 hover:border-primary/50 transition-colors";
      
      const btnPlay = document.createElement('button');
      btnPlay.className = "flex-1 text-left truncate text-[11px] text-on-surface font-medium";
      btnPlay.textContent = pl.name || pl.id;
      btnPlay.onclick = () => {
        el.urlInput.value = pl.id;
        loadPlaylist(pl.id);
        showToast(`Tocando a playlist salva: ${pl.name || pl.id}`);
      };

      const btnDel = document.createElement('button');
      btnDel.className = "text-on-surface-variant hover:text-error ml-2 shrink-0 p-0.5 rounded hover:bg-error/10 transition-colors";
      btnDel.innerHTML = '<span class="material-symbols-outlined text-[14px]">delete</span>';
      btnDel.onclick = (e) => {
        e.stopPropagation();
        const updated = getSavedPlaylists().filter(p => p.id !== pl.id);
        localStorage.setItem('doit_yt_playlists', JSON.stringify(updated));
        renderSavedPlaylists();
      };

      item.appendChild(btnPlay);
      item.appendChild(btnDel);
      el.savedList.appendChild(item);
    });
  };

  el.saveBtn.addEventListener('click', () => {
    const val = el.urlInput.value.trim();
    if (!val) return;
    const listId = extractListId(val);
    const name = el.nameInput.value.trim() || 'Playlist Salva';
    
    if (listId) {
      const playlists = getSavedPlaylists();
      if (!playlists.find(p => p.id === listId)) {
        playlists.push({ id: listId, name });
        localStorage.setItem('doit_yt_playlists', JSON.stringify(playlists));
        renderSavedPlaylists();
        el.nameInput.value = '';
      }
    }
  });

  // Render inicial
  renderSavedPlaylists();

  // Lógica de Volume
  const volumeInput = document.getElementById('yt-volume') as HTMLInputElement;
  const volumeIcon = document.getElementById('yt-volume-icon')!;

  const updateVolumeIcon = (vol: number) => {
    if (vol === 0) volumeIcon.textContent = 'volume_off';
    else if (vol < 50) volumeIcon.textContent = 'volume_down';
    else volumeIcon.textContent = 'volume_up';
  };

  volumeInput.addEventListener('input', (e: any) => {
    const vol = parseInt(e.target.value);
    if (player && player.setVolume) {
      player.setVolume(vol);
      if (vol > 0 && player.isMuted && player.unMute) {
        player.unMute();
      }
    }
    updateVolumeIcon(vol);
  });
};
