import { ytService, parseYoutubeUrl, type YoutubeMediaType } from '../YoutubeService';

export const YoutubePlayerCard = () => `
<section id="yt-card-root" class="glass-panel rounded-xl p-4 flex flex-col relative group glow-hover transition-all duration-300">
  <div class="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
    <div class="absolute -right-12 -top-12 w-40 h-40 bg-secondary/5 rounded-full blur-2xl group-hover:bg-secondary/10 transition-colors pointer-events-none"></div>
  </div>
  
  <div class="flex items-center justify-between relative z-10">
     <div class="flex gap-3 items-center overflow-hidden">
       <div id="yt-cover" class="w-12 h-12 rounded-md bg-surface-container-highest bg-cover bg-center flex shrink-0 items-center justify-center shadow-lg transition-all duration-500">
         <span class="material-symbols-outlined text-on-surface-variant/50 text-[24px]">music_note</span>
       </div>
       <div class="overflow-hidden flex-1">
         <h3 id="yt-title" class="font-headline-sm font-bold text-on-surface truncate text-sm leading-tight">Sem áudio</h3>
         <p id="yt-artist" class="font-label-md text-on-surface-variant truncate text-[10px] uppercase mt-0.5">Nenhuma música ou playlist selecionada</p>
       </div>
     </div>
     <button id="yt-menu-btn" class="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full hover:bg-white/5 shrink-0 cursor-pointer" title="Configurar Músicas e Playlists">
       <span class="material-symbols-outlined text-[24px]">queue_music</span>
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
       <button id="yt-btn-prev" class="text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-white/5 transition-colors cursor-pointer" title="Anterior / Reiniciar">
         <span class="material-symbols-outlined text-[18px]">skip_previous</span>
       </button>
       <button id="yt-btn-play" class="w-10 h-10 bg-primary text-on-secondary rounded-full flex items-center justify-center hover:bg-primary-fixed shadow-[0_0_15px_rgba(255,82,82,0.3)] transition-all cursor-pointer">
         <span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">play_arrow</span>
       </button>
       <button id="yt-btn-next" class="text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-white/5 transition-colors cursor-pointer" title="Próxima / Reiniciar">
         <span class="material-symbols-outlined text-[18px]">skip_next</span>
       </button>
     </div>

     <!-- Controle de Volume -->
     <div class="flex items-center gap-1.5 w-20 justify-end">
       <span id="yt-volume-icon" class="material-symbols-outlined text-[16px] text-on-surface-variant shrink-0">volume_up</span>
       <input type="range" id="yt-volume" min="0" max="100" value="100" class="w-12 h-1 bg-surface-container-highest rounded-full appearance-none outline-none cursor-pointer accent-primary" />
     </div>
  </div>

  <!-- Modal de Configuração de Música / Playlist -->
  <div id="yt-config-modal" class="hidden absolute top-2 left-1/2 -translate-x-1/2 w-80 z-50 glass-panel bg-surface-container/95 backdrop-blur-md rounded-xl p-4 flex flex-col shadow-2xl border border-outline-variant/50">
    <div class="flex justify-between items-center mb-3">
      <h3 class="font-headline-sm text-on-surface text-sm font-bold flex items-center gap-1.5">
        <span class="material-symbols-outlined text-[18px] text-primary">queue_music</span>
        <span>Músicas & Playlists</span>
      </h3>
      <button id="yt-config-close" class="text-on-surface-variant hover:text-on-surface cursor-pointer"><span class="material-symbols-outlined text-[18px]">close</span></button>
    </div>

    <!-- Toggle Música Única / Playlist -->
    <div class="flex bg-surface-container-highest p-0.5 rounded-lg border border-white/5 text-xs mb-2.5">
      <button type="button" id="yt-tab-video" class="flex-1 py-1 rounded-md text-on-surface font-bold bg-white/10 transition-all flex items-center justify-center gap-1 cursor-pointer">
        <span class="material-symbols-outlined text-[14px]">music_note</span>
        <span>Música Única</span>
      </button>
      <button type="button" id="yt-tab-playlist" class="flex-1 py-1 rounded-md text-on-surface-variant hover:text-on-surface transition-all flex items-center justify-center gap-1 cursor-pointer">
        <span class="material-symbols-outlined text-[14px]">playlist_play</span>
        <span>Playlist</span>
      </button>
    </div>
    
    <div class="flex flex-col gap-2 shrink-0">
      <input type="text" id="yt-playlist-url" placeholder="URL ou ID da Música (Vídeo)..." class="w-full bg-surface-container-highest border border-outline-variant/50 rounded px-2.5 py-1.5 text-xs text-on-surface outline-none focus:border-primary/50" />
      <input type="text" id="yt-playlist-name" placeholder="Nome (opcional)" class="w-full bg-surface-container-highest border border-outline-variant/50 rounded px-2.5 py-1.5 text-xs text-on-surface outline-none focus:border-primary/50" />
      <div class="flex gap-2 mt-1">
        <button id="yt-load-btn" class="flex-1 py-1.5 rounded bg-primary text-on-secondary font-bold hover:bg-primary-fixed transition-colors text-xs cursor-pointer">Tocar</button>
        <button id="yt-save-btn" class="flex-1 py-1.5 rounded bg-surface border border-outline-variant/50 text-on-surface hover:bg-surface-container-highest transition-colors text-xs cursor-pointer">Salvar</button>
      </div>
    </div>
    
    <div class="h-px bg-outline-variant/30 my-3 w-full shrink-0"></div>
    
    <h4 class="font-label-md text-on-surface-variant text-[10px] uppercase mb-1.5 shrink-0 flex items-center justify-between">
      <span>Salvas</span>
      <span id="yt-saved-count" class="text-primary font-mono text-[10px]">0</span>
    </h4>
    <div id="yt-saved-list" class="flex flex-col gap-1.5 overflow-y-auto custom-scrollbar flex-1 max-h-48 pb-1">
      <!-- Músicas / Playlists salvas -->
    </div>
  </div>

  <!-- Toast de Notificação -->
  <div id="yt-toast" class="hidden absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-on-secondary px-3 py-1.5 rounded-full shadow-[0_0_15px_rgba(255,82,82,0.3)] items-center gap-1.5 z-[100] transition-opacity duration-300 opacity-0 text-xs font-bold whitespace-nowrap pointer-events-none">
    <span class="material-symbols-outlined text-[16px]">play_circle</span>
    <span id="yt-toast-msg">Tocando...</span>
  </div>
</section>
`;

export const initYoutubePlayer = () => {
  const el = {
    root: document.getElementById('yt-card-root')!,
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
    savedList: document.getElementById('yt-saved-list')!,
    savedCount: document.getElementById('yt-saved-count')!,
    tabVideo: document.getElementById('yt-tab-video'),
    tabPlaylist: document.getElementById('yt-tab-playlist'),
    volumeInput: document.getElementById('yt-volume') as HTMLInputElement,
    volumeIcon: document.getElementById('yt-volume-icon')!
  };

  if (!el.root) return;

  const formatTime = (secs: number) => {
    if (!secs || isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // State: 'video' (Música Única) | 'playlist'
  let activeTab: YoutubeMediaType = 'video';

  const setTab = (tab: YoutubeMediaType) => {
    activeTab = tab;
    if (tab === 'video') {
      el.tabVideo?.classList.add('text-on-surface', 'font-bold', 'bg-white/10');
      el.tabVideo?.classList.remove('text-on-surface-variant');
      el.tabPlaylist?.classList.remove('text-on-surface', 'font-bold', 'bg-white/10');
      el.tabPlaylist?.classList.add('text-on-surface-variant');
      if (el.urlInput) el.urlInput.placeholder = 'URL ou ID da Música (Vídeo)...';
    } else {
      el.tabPlaylist?.classList.add('text-on-surface', 'font-bold', 'bg-white/10');
      el.tabPlaylist?.classList.remove('text-on-surface-variant');
      el.tabVideo?.classList.remove('text-on-surface', 'font-bold', 'bg-white/10');
      el.tabVideo?.classList.add('text-on-surface-variant');
      if (el.urlInput) el.urlInput.placeholder = 'URL ou ID da Playlist...';
    }
  };

  if (el.tabVideo) el.tabVideo.addEventListener('click', () => setTab('video'));
  if (el.tabPlaylist) el.tabPlaylist.addEventListener('click', () => setTab('playlist'));

  // Auto-detect tab from input
  if (el.urlInput) {
    el.urlInput.addEventListener('input', () => {
      const val = el.urlInput.value.trim();
      if (val.includes('playlist?list=') && !val.includes('watch?v=')) {
        setTab('playlist');
      } else if (val.includes('youtu.be/') || val.includes('watch?v=')) {
        setTab('video');
      }
    });
  }

  // --- UI Update from Service ---
  const updateUI = () => {
    if (!document.body.contains(el.root)) throw new Error("detached");

    // Play/Pause button
    el.playBtn.innerHTML = ytService.isPlaying 
      ? `<span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">pause</span>`
      : `<span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">play_arrow</span>`;

    // Video Data
    el.title.textContent = ytService.currentVideoData.title;
    el.artist.textContent = ytService.currentVideoData.artist;
    if (ytService.currentVideoData.cover) {
      el.cover.style.backgroundImage = ytService.currentVideoData.cover;
      el.cover.innerHTML = '';
    } else {
      el.cover.style.backgroundImage = 'none';
      el.cover.innerHTML = `<span class="material-symbols-outlined text-on-surface-variant/50 text-[24px]">music_note</span>`;
    }

    // Time & Progress
    el.timeCurrent.textContent = formatTime(ytService.currentTime);
    el.timeTotal.textContent = formatTime(ytService.duration);
    if (ytService.duration > 0) {
      el.progressBar.style.width = `${(ytService.currentTime / ytService.duration) * 100}%`;
    }

    // Volume
    el.volumeInput.value = ytService.volume.toString();
    if (ytService.volume === 0) el.volumeIcon.textContent = 'volume_off';
    else if (ytService.volume < 50) el.volumeIcon.textContent = 'volume_down';
    else el.volumeIcon.textContent = 'volume_up';
  };

  ytService.subscribe(updateUI);

  // --- Controls ---
  el.playBtn.addEventListener('click', () => ytService.togglePlay());
  el.prevBtn.addEventListener('click', () => ytService.prevVideo());
  el.nextBtn.addEventListener('click', () => ytService.nextVideo());
  
  el.progressContainer.addEventListener('click', (e: MouseEvent) => {
    const rect = el.progressContainer.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    ytService.seek(pos);
  });

  el.volumeInput.addEventListener('input', (e: any) => {
    ytService.setVolume(parseInt(e.target.value));
  });

  // --- Modal & Playlists ---
  el.menuBtn.addEventListener('click', () => el.modal.classList.remove('hidden'));
  el.modalClose.addEventListener('click', () => el.modal.classList.add('hidden'));

  el.loadBtn.addEventListener('click', () => {
    const val = el.urlInput.value.trim();
    if (!val) return;
    const parsed = parseYoutubeUrl(val, activeTab);
    if (parsed) {
      ytService.loadMedia(parsed.id, parsed.type);
      el.modal.classList.add('hidden');
      showToast(parsed.type === 'video' ? 'Tocando música...' : 'Tocando playlist...');
    }
  });

  el.saveBtn.addEventListener('click', () => {
    const val = el.urlInput.value.trim();
    if (!val) return;
    const parsed = parseYoutubeUrl(val, activeTab);
    if (!parsed) return;

    const defaultName = parsed.type === 'video' ? 'Música Salva' : 'Playlist Salva';
    const name = el.nameInput.value.trim() || defaultName;
    
    const playlists = [...ytService.savedPlaylists];
    if (!playlists.find(p => p.id === parsed.id)) {
      playlists.push({ id: parsed.id, name, type: parsed.type });
      ytService.savePlaylists(playlists);
      el.nameInput.value = '';
      showToast('Salvo com sucesso!');
    }
  });

  // --- Render Saved Playlists / Videos ---
  const renderSavedPlaylists = () => {
    const playlists = ytService.savedPlaylists;
    el.savedList.innerHTML = '';
    
    if (el.savedCount) {
      el.savedCount.textContent = playlists.length.toString();
    }

    if (playlists.length === 0) {
      el.savedList.innerHTML = '<span class="text-[10px] text-on-surface-variant text-center mt-2">Nenhuma salva.</span>';
      return;
    }
    
    playlists.forEach(pl => {
      const item = document.createElement('div');
      item.className = "flex items-center justify-between bg-surface-container-highest p-1.5 rounded-lg border border-outline-variant/30 hover:border-primary/50 transition-colors gap-2";
      
      const isVideo = pl.type === 'video';
      const icon = isVideo ? 'music_note' : 'playlist_play';
      const badgeText = isVideo ? 'MÚSICA' : 'PLAYLIST';
      const badgeColor = isVideo ? 'bg-secondary/15 text-secondary' : 'bg-primary/15 text-primary';

      const btnPlay = document.createElement('button');
      btnPlay.className = "flex-1 text-left truncate text-xs text-on-surface font-medium flex items-center gap-1.5 cursor-pointer";
      btnPlay.innerHTML = `
        <span class="material-symbols-outlined text-[16px] shrink-0 ${isVideo ? 'text-secondary' : 'text-primary'}">${icon}</span>
        <span class="truncate flex-1">${pl.name || pl.id}</span>
        <span class="text-[9px] px-1.5 py-0.5 rounded font-bold uppercase shrink-0 ${badgeColor}">${badgeText}</span>
      `;
      btnPlay.onclick = () => {
        el.urlInput.value = pl.id;
        setTab(pl.type);
        ytService.loadMedia(pl.id, pl.type);
        el.modal.classList.add('hidden');
        showToast(`Tocando: ${pl.name || pl.id}`);
      };

      const btnDel = document.createElement('button');
      btnDel.className = "text-on-surface-variant hover:text-error shrink-0 p-1 rounded hover:bg-error/10 transition-colors cursor-pointer";
      btnDel.innerHTML = '<span class="material-symbols-outlined text-[14px]">delete</span>';
      btnDel.title = 'Excluir';
      btnDel.onclick = (e) => {
        e.stopPropagation();
        const updated = ytService.savedPlaylists.filter(p => p.id !== pl.id);
        ytService.savePlaylists(updated);
      };

      item.appendChild(btnPlay);
      item.appendChild(btnDel);
      el.savedList.appendChild(item);
    });
  };

  let lastPlCount = -1;
  ytService.subscribe(() => {
    if (lastPlCount !== ytService.savedPlaylists.length) {
      lastPlCount = ytService.savedPlaylists.length;
      renderSavedPlaylists();
    }
  });

  // Toast
  let toastTimeout: any;
  const showToast = (msg: string) => {
    const toast = document.getElementById('yt-toast')!;
    document.getElementById('yt-toast-msg')!.textContent = msg;
    
    clearTimeout(toastTimeout);
    toast.classList.remove('hidden');
    toast.classList.add('flex');
    
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
};
