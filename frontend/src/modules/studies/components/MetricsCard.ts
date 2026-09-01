import { API_BASE_URL } from '../../../shared/config';

export const MetricsCard = () => `
<section class="glass-panel rounded-xl p-lg col-span-1 lg:col-span-4 flex flex-col glow-hover transition-all duration-300 relative">
  <div class="flex justify-between items-start mb-4">
    <h2 class="font-headline-md text-headline-md text-on-surface flex items-center gap-sm">
      <span class="material-symbols-outlined text-tertiary" style="font-variation-settings: 'FILL' 1;">analytics</span>
      Desempenho <span class="text-[10px] bg-tertiary/20 text-tertiary px-2 py-0.5 rounded-full ml-2">Esta Semana</span>
    </h2>
    <div class="flex gap-2 relative">
      <button id="metrics-btn-goal" class="text-on-surface-variant hover:text-primary transition-colors p-1 rounded hover:bg-white/5" title="Configurar Meta Semanal">
        <span class="material-symbols-outlined text-[18px]">track_changes</span>
      </button>
      <button id="metrics-btn-info" class="text-on-surface-variant hover:text-tertiary transition-colors p-1 rounded hover:bg-white/5" title="Ver Histórico">
        <span class="material-symbols-outlined text-[18px]">info</span>
      </button>

      <!-- Goal Config Modal -->
      <div id="metrics-goal-modal" class="hidden absolute top-8 right-8 w-64 glass-panel bg-surface-container/95 border border-outline-variant/50 backdrop-blur-md rounded-xl p-4 shadow-2xl z-50">
        <h4 class="font-bold text-sm text-on-surface mb-2">Meta de Estudos (Semanal)</h4>
        <p class="text-xs text-on-surface-variant mb-3">Quantas horas você planeja estudar por semana?</p>
        <input type="number" id="metrics-goal-input" class="w-full bg-surface-container-highest border border-outline-variant/50 rounded px-2 py-1.5 text-sm text-on-surface mb-3" placeholder="Ex: 20" />
        <div class="flex justify-end gap-2">
          <button id="metrics-goal-cancel" class="px-3 py-1.5 rounded text-on-surface-variant hover:bg-white/5 text-xs">Cancelar</button>
          <button id="metrics-goal-save" class="px-3 py-1.5 rounded bg-primary text-on-secondary hover:bg-primary-fixed text-xs font-bold">Salvar</button>
        </div>
      </div>
    </div>
  </div>

  <div class="flex flex-col gap-3 flex-1 justify-center">
    <!-- Daily Goal Progress -->
    <div class="bg-surface-container/50 rounded-lg p-3 border border-outline-variant/10 flex flex-col gap-2">
      <div class="flex justify-between items-center mb-1">
        <span class="font-bold text-xs text-on-surface flex items-center gap-1">
          <span class="material-symbols-outlined text-[14px] text-primary">target</span> Meta de Hoje
        </span>
        <span id="metrics-daily-status" class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant">--</span>
      </div>
      
      <div class="w-full bg-surface-container-highest rounded-full h-2 overflow-hidden flex">
        <div id="metrics-daily-progress" class="bg-primary h-full rounded-full transition-all duration-500" style="width: 0%"></div>
      </div>
      
      <div class="flex justify-between text-[10px] text-on-surface-variant">
        <span>Estudado: <strong id="metrics-daily-studied" class="text-on-surface">0h</strong></span>
        <span>Faltam: <strong id="metrics-daily-left" class="text-primary">--</strong></span>
      </div>
    </div>

    <!-- Weekly Stats -->
    <div class="grid grid-cols-2 gap-3">
      <div class="bg-surface-container/50 rounded-lg p-3 border border-outline-variant/10 flex flex-col">
        <span class="block font-body-sm text-[10px] text-on-surface-variant mb-1">Sessões Realizadas</span>
        <span id="metrics-sessions" class="block font-headline-md text-xl font-bold text-tertiary">0</span>
      </div>
      <div class="bg-surface-container/50 rounded-lg p-3 border border-outline-variant/10 flex flex-col">
        <span class="block font-body-sm text-[10px] text-on-surface-variant mb-1">Média de Estudo/Dia</span>
        <span id="metrics-focus" class="block font-headline-md text-xl font-bold text-primary">0m</span>
      </div>
    </div>
  </div>
</section>

<!-- Info / History Modal (Appended to body via absolute positioning or just fixed overlay) -->
<div id="metrics-history-modal" class="hidden fixed inset-0 z-[100] flex items-center justify-center p-4">
  <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" id="metrics-history-backdrop"></div>
  <div class="glass-panel bg-surface-container/95 border border-outline-variant/20 rounded-2xl p-6 w-full max-w-md relative z-10 shadow-2xl flex flex-col transform transition-all">
    <div class="flex justify-between items-center mb-6">
      <h3 class="font-headline-sm text-lg font-bold text-on-surface flex items-center gap-2">
        <span class="material-symbols-outlined text-tertiary">history</span>
        Histórico de Desempenho
      </h3>
      <button id="metrics-history-close" class="text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-white/10">
        <span class="material-symbols-outlined text-[20px]">close</span>
      </button>
    </div>
    
    <!-- Tabs -->
    <div class="flex bg-surface-container-highest rounded-lg p-1 mb-6">
      <button class="metrics-tab flex-1 py-1.5 text-xs font-bold rounded-md bg-tertiary text-on-primary shadow-sm" data-filter="week">Semana</button>
      <button class="metrics-tab flex-1 py-1.5 text-xs font-bold rounded-md text-on-surface-variant hover:text-on-surface transition-colors" data-filter="month">Mês</button>
      <button class="metrics-tab flex-1 py-1.5 text-xs font-bold rounded-md text-on-surface-variant hover:text-on-surface transition-colors" data-filter="year">Ano</button>
    </div>

    <!-- Stats grid -->
    <div class="grid grid-cols-2 gap-4">
      <div class="bg-surface-container-highest/50 rounded-xl p-4 border border-outline-variant/10">
        <span class="block text-[11px] text-on-surface-variant uppercase tracking-wider mb-1">Total de Sessões</span>
        <span id="hist-total-sessions" class="block text-2xl font-bold text-on-surface">0</span>
      </div>
      <div class="bg-surface-container-highest/50 rounded-xl p-4 border border-outline-variant/10">
        <span class="block text-[11px] text-on-surface-variant uppercase tracking-wider mb-1">Média Foco/Dia</span>
        <span id="hist-avg-focus" class="block text-2xl font-bold text-primary">0m</span>
      </div>
      <div class="bg-surface-container-highest/50 rounded-xl p-4 border border-outline-variant/10">
        <span class="block text-[11px] text-on-surface-variant uppercase tracking-wider mb-1">Média Pausa/Dia</span>
        <span id="hist-avg-break" class="block text-2xl font-bold text-error">0m</span>
      </div>
      <div class="bg-surface-container-highest/50 rounded-xl p-4 border border-outline-variant/10">
        <span class="block text-[11px] text-on-surface-variant uppercase tracking-wider mb-1" id="hist-goal-label">Semanas na Meta</span>
        <span id="hist-goal-met" class="block text-2xl font-bold text-tertiary">0</span>
      </div>
    </div>
  </div>
</div>
`;

export const initMetricsCard = async () => {
  const elSessions = document.getElementById('metrics-sessions');
  const elFocus = document.getElementById('metrics-focus');
  const dailyStudied = document.getElementById('metrics-daily-studied');
  const dailyLeft = document.getElementById('metrics-daily-left');
  const dailyProgress = document.getElementById('metrics-daily-progress');
  const dailyStatus = document.getElementById('metrics-daily-status');
  
  const btnGoal = document.getElementById('metrics-btn-goal');
  const goalModal = document.getElementById('metrics-goal-modal');
  const goalInput = document.getElementById('metrics-goal-input') as HTMLInputElement;
  const goalSave = document.getElementById('metrics-goal-save');
  const goalCancel = document.getElementById('metrics-goal-cancel');

  const btnInfo = document.getElementById('metrics-btn-info');
  const histModal = document.getElementById('metrics-history-modal');
  const histClose = document.getElementById('metrics-history-close');
  const histBackdrop = document.getElementById('metrics-history-backdrop');
  const tabs = document.querySelectorAll('.metrics-tab');

  if (!elSessions || !elFocus || !dailyStudied || !dailyLeft || !dailyProgress || !dailyStatus) return;

  // --- Utility ---
  const formatMinToHours = (min: number) => {
    if (!min || isNaN(min)) return '0m';
    const h = Math.floor(min / 60);
    const m = min % 60;
    if (h > 0 && m > 0) return `${h}h ${m}m`;
    if (h > 0) return `${h}h`;
    return `${m}m`;
  };

  // --- Goal Config ---
  const getWeeklyGoal = () => parseInt(localStorage.getItem('doit_weekly_goal_hours') || '0');
  
  if (btnGoal && goalModal) {
    btnGoal.addEventListener('click', () => {
      goalInput.value = getWeeklyGoal().toString();
      goalModal.classList.toggle('hidden');
    });
    goalCancel?.addEventListener('click', () => goalModal.classList.add('hidden'));
    goalSave?.addEventListener('click', () => {
      const val = parseInt(goalInput.value) || 0;
      localStorage.setItem('doit_weekly_goal_hours', val.toString());
      goalModal.classList.add('hidden');
      fetchMainCardMetrics();
    });
  }

  // --- Main Card Fetch (Week) ---
  const fetchMainCardMetrics = async () => {
    try {
      const goal = getWeeklyGoal();
      const res = await fetch(`${API_BASE_URL}/api/studies/pomodoro/metrics/detailed?filter=week&weeklyGoalHours=${goal}`);
      if (!res.ok) throw new Error('API falhou');
      const data = await res.json();
      
      elSessions.textContent = data.totalSessions.toString();
      elFocus.textContent = formatMinToHours(data.avgFocusPerDay);
      
      if (goal > 0) {
        const dailyGoalMin = (goal * 60) / 7;
        const studiedMin = data.todayFocusTime;
        const leftMin = Math.max(0, dailyGoalMin - studiedMin);
        const percent = Math.min(100, (studiedMin / dailyGoalMin) * 100);
        
        dailyStudied!.textContent = formatMinToHours(studiedMin);
        
        if (leftMin === 0) {
          dailyLeft!.textContent = 'Concluído!';
          dailyLeft!.classList.remove('text-primary');
          dailyLeft!.classList.add('text-tertiary');
          dailyStatus!.textContent = '✓ Meta Batida';
          dailyStatus!.classList.add('bg-tertiary/20', 'text-tertiary');
          dailyStatus!.classList.remove('bg-surface-container-highest', 'text-on-surface-variant');
        } else {
          dailyLeft!.textContent = formatMinToHours(leftMin);
          dailyLeft!.classList.add('text-primary');
          dailyLeft!.classList.remove('text-tertiary');
          dailyStatus!.textContent = `${formatMinToHours(dailyGoalMin)} / dia`;
          dailyStatus!.classList.remove('bg-tertiary/20', 'text-tertiary');
          dailyStatus!.classList.add('bg-surface-container-highest', 'text-on-surface-variant');
        }
        
        dailyProgress!.style.width = `${percent}%`;
        if (percent >= 100) {
          dailyProgress!.classList.remove('bg-primary');
          dailyProgress!.classList.add('bg-tertiary');
        } else {
          dailyProgress!.classList.add('bg-primary');
          dailyProgress!.classList.remove('bg-tertiary');
        }
      } else {
        dailyStudied!.textContent = formatMinToHours(data.todayFocusTime);
        dailyLeft!.textContent = 'Meta não definida';
        dailyLeft!.classList.remove('text-primary', 'text-tertiary');
        dailyProgress!.style.width = '0%';
        dailyStatus!.textContent = '--';
      }

    } catch (err) {
      console.warn('Backend indisponível.', err);
    }
  };

  // --- History Modal Fetch ---
  let currentFilter = 'week';
  
  const fetchHistoryMetrics = async (filter: string) => {
    try {
      const goal = getWeeklyGoal();
      const res = await fetch(`${API_BASE_URL}/api/studies/pomodoro/metrics/detailed?filter=${filter}&weeklyGoalHours=${goal}`);
      if (!res.ok) throw new Error('API falhou');
      const data = await res.json();
      
      document.getElementById('hist-total-sessions')!.textContent = data.totalSessions.toString();
      document.getElementById('hist-avg-focus')!.textContent = formatMinToHours(data.avgFocusPerDay);
      document.getElementById('hist-avg-break')!.textContent = formatMinToHours(data.avgBreakPerDay);
      
      const lblGoal = document.getElementById('hist-goal-label')!;
      const valGoal = document.getElementById('hist-goal-met')!;
      
      if (filter === 'week') {
        lblGoal.textContent = 'Status da Semana';
        if (goal === 0) valGoal.textContent = 'Sem Meta';
        else valGoal.textContent = data.weeksGoalMet > 0 ? 'Concluída ✓' : 'Pendente';
      } else {
        lblGoal.textContent = 'Semanas na Meta';
        valGoal.textContent = data.weeksGoalMet.toString();
      }

    } catch (err) {
      console.warn('Backend indisponível.', err);
    }
  };

  if (btnInfo && histModal) {
    const openModal = () => {
      histModal.classList.remove('hidden');
      fetchHistoryMetrics(currentFilter);
    };
    const closeModal = () => histModal.classList.add('hidden');
    
    btnInfo.addEventListener('click', openModal);
    histClose?.addEventListener('click', closeModal);
    histBackdrop?.addEventListener('click', closeModal);
    
    tabs.forEach(t => t.addEventListener('click', (e) => {
      const btn = e.target as HTMLButtonElement;
      tabs.forEach(tab => {
        tab.classList.remove('bg-tertiary', 'text-on-primary', 'shadow-sm');
        tab.classList.add('text-on-surface-variant');
      });
      btn.classList.add('bg-tertiary', 'text-on-primary', 'shadow-sm');
      btn.classList.remove('text-on-surface-variant');
      
      currentFilter = btn.getAttribute('data-filter') || 'week';
      fetchHistoryMetrics(currentFilter);
    }));
  }

  // --- Init ---
  await fetchMainCardMetrics();
  
  // Create an explicit event listener for pomodoro completions
  window.addEventListener('pomodoro-completed', fetchMainCardMetrics);
  window.addEventListener('pomodoro-completed', () => {
    if (histModal && !histModal.classList.contains('hidden')) {
      fetchHistoryMetrics(currentFilter);
    }
  });
};
