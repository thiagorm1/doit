import { API_BASE_URL } from '../../../shared/config';
export const PomodoroCard = () => `
<section class="glass-panel rounded-xl p-lg col-span-1 lg:col-span-4 flex flex-col justify-between relative overflow-hidden group glow-hover transition-all duration-300">
  <div class="absolute -right-12 -top-12 w-40 h-40 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors pointer-events-none"></div>
  
  <!-- Config Modal Overlay -->
  <div id="pomodoro-config-modal" class="hidden absolute inset-0 bg-surface-container/95 z-50 p-6 flex flex-col justify-center rounded-xl backdrop-blur-sm border border-outline-variant/30">
    <h3 class="font-headline-md text-on-surface mb-4">Configurações</h3>
    <div class="space-y-3 font-body-sm">
      <div class="flex justify-between items-center">
        <label class="text-on-surface-variant">Tempo de Foco (min)</label>
        <input type="number" id="cfg-focus" class="w-16 bg-surface-container-highest border border-outline-variant/50 rounded text-center text-on-surface" value="25" />
      </div>
      <div class="flex justify-between items-center">
        <label class="text-on-surface-variant">Descanso Curto (min)</label>
        <input type="number" id="cfg-short" class="w-16 bg-surface-container-highest border border-outline-variant/50 rounded text-center text-on-surface" value="5" />
      </div>
      <div class="flex justify-between items-center">
        <label class="text-on-surface-variant">Pausa Longa (min)</label>
        <input type="number" id="cfg-long" class="w-16 bg-surface-container-highest border border-outline-variant/50 rounded text-center text-on-surface" value="15" />
      </div>
      <div class="flex justify-between items-center">
        <label class="text-on-surface-variant">Ciclos</label>
        <input type="number" id="cfg-cycles" class="w-16 bg-surface-container-highest border border-outline-variant/50 rounded text-center text-on-surface" value="4" />
      </div>
    </div>
    <div class="flex gap-2 mt-6">
      <button id="pomo-cfg-cancel" class="flex-1 py-2 rounded border border-outline-variant/50 text-on-surface-variant hover:text-on-surface transition-colors">Cancelar</button>
      <button id="pomo-cfg-save" class="flex-1 py-2 rounded bg-primary text-on-secondary font-bold hover:bg-primary-fixed transition-colors">Salvar</button>
    </div>
  </div>

  <div class="flex justify-between items-start mb-md relative z-10">
    <h2 class="font-headline-md text-headline-md text-on-surface flex items-center gap-sm">
      <span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1;">timer</span>
      <span id="pomo-title">Foco Ativo</span>
    </h2>
    <div class="flex gap-2">
      <button id="pomo-cfg-btn" class="text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center bg-surface-container-highest rounded-md w-7 h-7">
        <span class="material-symbols-outlined text-[16px]">settings</span>
      </button>
      <span id="pomo-badge" class="px-sm py-xs bg-primary/15 text-primary text-label-caps font-label-caps rounded-md transition-colors">ESTUDO</span>
    </div>
  </div>
  <div class="flex-1 flex flex-col items-center justify-center py-md relative z-10">
    <div class="relative w-48 h-48 flex items-center justify-center mb-md">
      <svg class="absolute inset-0 w-full h-full transform -rotate-90">
        <circle class="text-surface-container-highest" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" stroke-width="4"></circle>
        <circle id="pomo-ring" class="text-primary drop-shadow-[0_0_10px_rgba(255,82,82,0.5)] progress-ring__circle transition-all duration-1000 ease-linear" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" stroke-dasharray="552.92" stroke-dashoffset="0" stroke-linecap="round" stroke-width="8"></circle>
      </svg>
      <div class="text-center">
        <span id="pomo-time" class="block font-display-lg text-[56px] leading-none font-bold text-on-surface tracking-tighter">25:00</span>
        <span id="pomo-cycle-text" class="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mt-xs block">Sessão 1/4</span>
      </div>
    </div>
    
    <div id="pomo-controls" class="flex gap-md w-full justify-center">
      <button id="pomo-reset" class="w-12 h-12 rounded-full border border-outline-variant/50 flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:border-on-surface transition-all">
        <span class="material-symbols-outlined">restart_alt</span>
      </button>
      <button id="pomo-play" class="w-12 h-12 rounded-full bg-primary text-on-secondary flex items-center justify-center hover:bg-primary-fixed shadow-[0_0_15px_rgba(255,82,82,0.3)] transition-all">
        <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">play_arrow</span>
      </button>
      <button id="pomo-skip" class="w-12 h-12 rounded-full border border-outline-variant/50 flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:border-on-surface transition-all">
        <span class="material-symbols-outlined">skip_next</span>
      </button>
    </div>

    <div id="pomo-complete-area" class="hidden w-full flex justify-center mt-2">
      <button id="pomo-complete-btn" class="w-full py-3 rounded-lg bg-tertiary text-on-primary font-bold hover:brightness-110 shadow-[0_0_15px_rgba(78,222,163,0.3)] transition-all flex items-center justify-center gap-2">
        <span class="material-symbols-outlined">done_all</span> Concluir Pomodoro
      </button>
    </div>
  </div>
</section>
`;

export const initPomodoro = () => {
  const state = {
    focusMin: 25,
    shortMin: 5,
    longMin: 15,
    totalCycles: 4,

    mode: 'focus' as 'focus' | 'short' | 'long' | 'done',
    currentCycle: 1,
    timeLeft: 25 * 60,
    isRunning: false,
    intervalId: null as any
  };

  const el = {
    time: document.getElementById('pomo-time')!,
    cycleText: document.getElementById('pomo-cycle-text')!,
    title: document.getElementById('pomo-title')!,
    badge: document.getElementById('pomo-badge')!,
    ring: document.getElementById('pomo-ring')!,
    
    playBtn: document.getElementById('pomo-play')!,
    resetBtn: document.getElementById('pomo-reset')!,
    skipBtn: document.getElementById('pomo-skip')!,
    
    cfgBtn: document.getElementById('pomo-cfg-btn')!,
    cfgModal: document.getElementById('pomodoro-config-modal')!,
    cfgSave: document.getElementById('pomo-cfg-save')!,
    cfgCancel: document.getElementById('pomo-cfg-cancel')!,
    
    controls: document.getElementById('pomo-controls')!,
    completeArea: document.getElementById('pomo-complete-area')!,
    completeBtn: document.getElementById('pomo-complete-btn')!,

    iFocus: document.getElementById('cfg-focus') as HTMLInputElement,
    iShort: document.getElementById('cfg-short') as HTMLInputElement,
    iLong: document.getElementById('cfg-long') as HTMLInputElement,
    iCycles: document.getElementById('cfg-cycles') as HTMLInputElement,
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const getTotalTimeForMode = () => {
    if (state.mode === 'focus') return state.focusMin * 60;
    if (state.mode === 'short') return state.shortMin * 60;
    return state.longMin * 60;
  };

  const updateUI = () => {
    if (state.mode === 'done') {
      el.time.textContent = "00:00";
      el.cycleText.textContent = "CICLOS CONCLUÍDOS";
      el.title.textContent = "Pomodoro Finalizado";
      el.badge.textContent = "DONE";
      el.badge.className = "px-sm py-xs bg-tertiary/15 text-tertiary text-label-caps font-label-caps rounded-md transition-colors";
      el.ring.style.strokeDashoffset = "0";
      
      el.controls.classList.add('hidden');
      el.completeArea.classList.remove('hidden');
      return;
    }

    el.controls.classList.remove('hidden');
    el.completeArea.classList.add('hidden');

    el.time.textContent = formatTime(state.timeLeft);
    el.cycleText.textContent = `Sessão ${state.currentCycle}/${state.totalCycles}`;
    
    if (state.mode === 'focus') {
      el.title.textContent = "Foco Ativo";
      el.badge.textContent = "ESTUDO";
      el.badge.className = "px-sm py-xs bg-primary/15 text-primary text-label-caps font-label-caps rounded-md transition-colors";
      el.ring.classList.replace('text-secondary', 'text-primary');
    } else {
      el.title.textContent = "Descanso";
      el.badge.textContent = state.mode === 'short' ? "PAUSA CURTA" : "PAUSA LONGA";
      el.badge.className = "px-sm py-xs bg-secondary/15 text-secondary text-label-caps font-label-caps rounded-md transition-colors";
      el.ring.classList.replace('text-primary', 'text-secondary');
    }

    // Update ring
    const total = getTotalTimeForMode();
    const progress = state.timeLeft / total;
    const offset = 552.92 - (progress * 552.92);
    el.ring.style.strokeDashoffset = offset.toString();

    // Play button icon
    el.playBtn.innerHTML = state.isRunning 
      ? `<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">pause</span>`
      : `<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">play_arrow</span>`;
  };

  const nextPhase = () => {
    if (state.mode === 'focus') {
      if (state.currentCycle >= state.totalCycles) {
        state.mode = 'done';
        state.timeLeft = 0;
        state.isRunning = false;
        clearInterval(state.intervalId);
      } else {
        // Not last cycle, short break
        state.mode = 'short';
        state.timeLeft = state.shortMin * 60;
      }
    } else {
      // Coming from short/long break
      state.currentCycle++;
      state.mode = 'focus';
      state.timeLeft = state.focusMin * 60;
    }
    updateUI();
  };

  const tick = () => {
    if (state.timeLeft > 0) {
      state.timeLeft--;
      updateUI();
    } else {
      nextPhase();
    }
  };

  el.playBtn.addEventListener('click', () => {
    state.isRunning = !state.isRunning;
    if (state.isRunning) {
      state.intervalId = setInterval(tick, 1000);
    } else {
      clearInterval(state.intervalId);
    }
    updateUI();
  });

  el.resetBtn.addEventListener('click', () => {
    state.isRunning = false;
    clearInterval(state.intervalId);
    state.timeLeft = getTotalTimeForMode();
    updateUI();
  });

  el.skipBtn.addEventListener('click', () => {
    state.isRunning = false;
    clearInterval(state.intervalId);
    nextPhase();
  });

  el.completeBtn.addEventListener('click', async () => {
    try {
      await fetch(`${API_BASE_URL}/api/studies/pomodoro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          focusTime: state.focusMin,
          shortBreak: state.shortMin,
          longBreak: state.longMin,
          cycles: state.totalCycles
        })
      });
      // Optionally notify other components to refresh
      window.dispatchEvent(new Event('pomodoro-completed'));
    } catch (err) {
      console.error('Failed to save session', err);
    }
    // Reset full pomodoro
    state.mode = 'focus';
    state.currentCycle = 1;
    state.timeLeft = state.focusMin * 60;
    updateUI();
  });

  // Settings Modal
  el.cfgBtn.addEventListener('click', () => el.cfgModal.classList.remove('hidden'));
  el.cfgCancel.addEventListener('click', () => el.cfgModal.classList.add('hidden'));
  
  el.cfgSave.addEventListener('click', () => {
    state.focusMin = parseInt(el.iFocus.value) || 25;
    state.shortMin = parseInt(el.iShort.value) || 5;
    state.longMin = parseInt(el.iLong.value) || 15;
    state.totalCycles = parseInt(el.iCycles.value) || 4;
    
    state.isRunning = false;
    clearInterval(state.intervalId);
    state.mode = 'focus';
    state.currentCycle = 1;
    state.timeLeft = state.focusMin * 60;
    
    el.cfgModal.classList.add('hidden');
    updateUI();
  });

  updateUI();
};
