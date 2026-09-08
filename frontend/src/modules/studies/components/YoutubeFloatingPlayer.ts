import { ytService } from '../YoutubeService';

export const YoutubeFloatingPlayer = () => `
<div id="yt-floating-container" class="fixed bottom-4 left-4 z-[90] flex flex-col items-start transition-all duration-300">
  <!-- Expanded Widget -->
  <div id="yt-floating-expanded" class="hidden glass-panel rounded-xl p-3 flex flex-col relative w-72 shadow-2xl mb-2 border border-outline-variant/30 origin-bottom-left transition-all duration-300 scale-95 opacity-0">
    <div class="flex items-center justify-between mb-2">
      <div class="flex items-center gap-2 overflow-hidden">
         <div id="yt-float-cover" class="w-8 h-8 rounded bg-surface-container-highest bg-cover bg-center flex shrink-0 items-center justify-center">
           <span class="material-symbols-outlined text-on-surface-variant/50 text-[16px]">music_note</span>
         </div>
         <div class="overflow-hidden flex-1">
           <h3 id="yt-float-title" class="font-headline-sm font-bold text-on-surface truncate text-xs leading-tight">Sem áudio</h3>
           <p id="yt-float-artist" class="font-label-md text-on-surface-variant truncate text-[9px] uppercase mt-0.5">Nenhuma música ou playlist selecionada</p>
         </div>
      </div>
      <button id="yt-float-minimize" class="text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-white/5 transition-colors cursor-pointer" title="Minimizar">
        <span class="material-symbols-outlined text-[16px]">close_fullscreen</span>
      </button>
    </div>

    <!-- Controls & Volume -->
    <div class="flex items-center justify-between my-1 px-1 gap-2">
      <div class="flex items-center gap-1.5">
        <button id="yt-float-prev" class="text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-white/5 transition-colors cursor-pointer" title="Anterior / Reiniciar">
          <span class="material-symbols-outlined text-[18px]">skip_previous</span>
        </button>
        <button id="yt-float-play" class="w-8 h-8 bg-primary text-on-secondary rounded-full flex items-center justify-center hover:bg-primary-fixed shadow-[0_0_10px_rgba(255,82,82,0.3)] transition-all cursor-pointer">
          <span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">play_arrow</span>
        </button>
        <button id="yt-float-next" class="text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-white/5 transition-colors cursor-pointer" title="Próxima / Reiniciar">
          <span class="material-symbols-outlined text-[18px]">skip_next</span>
        </button>
      </div>

      <!-- Volume -->
      <div class="flex items-center gap-1.5 bg-surface-container-highest/60 px-2 py-1 rounded-full border border-white/5">
        <button id="yt-float-volume-btn" class="text-on-surface-variant hover:text-on-surface flex items-center justify-center cursor-pointer transition-colors" title="Mutar / Desmutar">
          <span id="yt-float-volume-icon" class="material-symbols-outlined text-[15px]">volume_up</span>
        </button>
        <input type="range" id="yt-float-volume" min="0" max="100" value="100" class="w-14 h-1 bg-surface-container-low rounded-full appearance-none outline-none cursor-pointer accent-primary" title="Volume" />
      </div>
    </div>

    <!-- Progress -->
    <div class="flex flex-col gap-1 mt-1">
      <div class="h-1 bg-surface-container-highest rounded-full overflow-hidden cursor-pointer" id="yt-float-progress-container">
        <div id="yt-float-progress-bar" class="h-full bg-primary w-0 pointer-events-none transition-all duration-300"></div>
      </div>
      <div class="flex justify-between text-[9px] text-on-surface-variant">
        <span id="yt-float-time-current">0:00</span>
        <span id="yt-float-time-total">0:00</span>
      </div>
    </div>
  </div>

  <!-- Collapsed Bubble -->
  <button id="yt-floating-bubble" class="w-12 h-12 rounded-full bg-surface-container-highest border border-outline-variant/50 shadow-lg flex items-center justify-center hover:bg-surface-container transition-colors group relative cursor-pointer" title="Player de Música">
    <div id="yt-bubble-ring" class="absolute inset-0 rounded-full border-2 border-primary opacity-0 scale-110 transition-all duration-1000"></div>
    <span id="yt-bubble-icon" class="material-symbols-outlined text-primary text-[24px] group-hover:scale-110 transition-transform">music_note</span>
  </button>
</div>
`;

export const initYoutubeFloatingPlayer = () => {
  const container = document.getElementById('yt-floating-container');
  if (!container) return;

  const el = {
    expanded: document.getElementById('yt-floating-expanded')!,
    bubble: document.getElementById('yt-floating-bubble')!,
    bubbleRing: document.getElementById('yt-bubble-ring')!,
    bubbleIcon: document.getElementById('yt-bubble-icon')!,
    minimizeBtn: document.getElementById('yt-float-minimize')!,
    title: document.getElementById('yt-float-title')!,
    artist: document.getElementById('yt-float-artist')!,
    cover: document.getElementById('yt-float-cover')!,
    playBtn: document.getElementById('yt-float-play')!,
    prevBtn: document.getElementById('yt-float-prev')!,
    nextBtn: document.getElementById('yt-float-next')!,
    progressBar: document.getElementById('yt-float-progress-bar')!,
    progressContainer: document.getElementById('yt-float-progress-container')!,
    timeCurrent: document.getElementById('yt-float-time-current')!,
    timeTotal: document.getElementById('yt-float-time-total')!,
    volumeInput: document.getElementById('yt-float-volume') as HTMLInputElement | null,
    volumeIcon: document.getElementById('yt-float-volume-icon'),
    volumeBtn: document.getElementById('yt-float-volume-btn')
  };

  const formatTime = (secs: number) => {
    if (!secs || isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // State
  let isExpanded = false;
  
  const toggleExpand = () => {
    isExpanded = !isExpanded;
    if (isExpanded) {
      el.expanded.classList.remove('hidden');
      setTimeout(() => {
        el.expanded.classList.remove('scale-95', 'opacity-0');
        el.expanded.classList.add('scale-100', 'opacity-100');
      }, 10);
      el.bubble.classList.add('hidden');
    } else {
      el.expanded.classList.remove('scale-100', 'opacity-100');
      el.expanded.classList.add('scale-95', 'opacity-0');
      setTimeout(() => {
        el.expanded.classList.add('hidden');
        el.bubble.classList.remove('hidden');
      }, 300);
    }
  };

  el.bubble.addEventListener('click', toggleExpand);
  el.minimizeBtn.addEventListener('click', toggleExpand);

  // --- UI Update from Service ---
  const updateUI = () => {
    // Visibility: hide if on Dashboard (StudiesView handles it)
    const isDashboard = window.location.pathname === '/estudos' || window.location.pathname === '/estudos/';
    if (isDashboard) {
      container.classList.add('hidden');
      return;
    } else {
      container.classList.remove('hidden');
    }

    // Play/Pause button
    el.playBtn.innerHTML = ytService.isPlaying 
      ? `<span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">pause</span>`
      : `<span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">play_arrow</span>`;

    // Bubble Animation
    if (ytService.isPlaying) {
      el.bubbleRing.classList.remove('opacity-0', 'scale-110');
      el.bubbleRing.classList.add('opacity-50', 'scale-150', 'animate-pulse');
      el.bubbleIcon.textContent = 'equalizer';
    } else {
      el.bubbleRing.classList.add('opacity-0', 'scale-110');
      el.bubbleRing.classList.remove('opacity-50', 'scale-150', 'animate-pulse');
      el.bubbleIcon.textContent = 'music_note';
    }

    // Video Data
    el.title.textContent = ytService.currentVideoData.title;
    el.artist.textContent = ytService.currentVideoData.artist;
    if (ytService.currentVideoData.cover) {
      el.cover.style.backgroundImage = ytService.currentVideoData.cover;
      el.cover.innerHTML = '';
    } else {
      el.cover.style.backgroundImage = 'none';
      el.cover.innerHTML = `<span class="material-symbols-outlined text-on-surface-variant/50 text-[16px]">music_note</span>`;
    }

    // Time & Progress
    el.timeCurrent.textContent = formatTime(ytService.currentTime);
    el.timeTotal.textContent = formatTime(ytService.duration);
    if (ytService.duration > 0) {
      el.progressBar.style.width = `${(ytService.currentTime / ytService.duration) * 100}%`;
    }

    // Volume
    if (el.volumeInput) {
      el.volumeInput.value = ytService.volume.toString();
    }
    if (el.volumeIcon) {
      if (ytService.volume === 0) el.volumeIcon.textContent = 'volume_off';
      else if (ytService.volume < 50) el.volumeIcon.textContent = 'volume_down';
      else el.volumeIcon.textContent = 'volume_up';
    }
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

  // Volume listeners
  let previousVolume = 100;
  if (el.volumeBtn) {
    el.volumeBtn.addEventListener('click', () => {
      if (ytService.volume > 0) {
        previousVolume = ytService.volume;
        ytService.setVolume(0);
      } else {
        ytService.setVolume(previousVolume || 50);
      }
    });
  }

  if (el.volumeInput) {
    el.volumeInput.addEventListener('input', (e: any) => {
      ytService.setVolume(parseInt(e.target.value, 10));
    });
  }
};
