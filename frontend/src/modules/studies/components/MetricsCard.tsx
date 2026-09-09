import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../../shared/config';

interface DetailedMetrics {
  totalSessions: number;
  avgFocusPerDay: number;
  avgBreakPerDay: number;
  todayFocusTime: number;
  weeksGoalMet: number;
}

export const MetricsCard: React.FC = () => {
  const [weeklyGoalHours, setWeeklyGoalHours] = useState(() => {
    return parseInt(localStorage.getItem('doit_weekly_goal_hours') || '0', 10);
  });

  const [mainMetrics, setMainMetrics] = useState<DetailedMetrics>({
    totalSessions: 0,
    avgFocusPerDay: 0,
    avgBreakPerDay: 0,
    todayFocusTime: 0,
    weeksGoalMet: 0
  });

  // Modal states
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [goalInput, setGoalInput] = useState(weeklyGoalHours.toString());

  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [historyFilter, setHistoryFilter] = useState<'week' | 'month' | 'year'>('week');
  const [historyMetrics, setHistoryMetrics] = useState<DetailedMetrics>({
    totalSessions: 0,
    avgFocusPerDay: 0,
    avgBreakPerDay: 0,
    todayFocusTime: 0,
    weeksGoalMet: 0
  });

  const formatMinToHours = (min: number) => {
    if (!min || isNaN(min)) return '0m';
    const h = Math.floor(min / 60);
    const m = min % 60;
    if (h > 0 && m > 0) return `${h}h ${m}m`;
    if (h > 0) return `${h}h`;
    return `${m}m`;
  };

  const fetchMainMetrics = async () => {
    try {
      const goal = parseInt(localStorage.getItem('doit_weekly_goal_hours') || '0', 10);
      const res = await fetch(`${API_BASE_URL}/api/studies/pomodoro/metrics/detailed?filter=week&weeklyGoalHours=${goal}`);
      if (res.ok) {
        const data = await res.json();
        setMainMetrics(data);
      }
    } catch (err) {
      console.warn('Metrics API offline', err);
    }
  };

  const fetchHistory = async (filter: 'week' | 'month' | 'year') => {
    try {
      const goal = parseInt(localStorage.getItem('doit_weekly_goal_hours') || '0', 10);
      const res = await fetch(`${API_BASE_URL}/api/studies/pomodoro/metrics/detailed?filter=${filter}&weeklyGoalHours=${goal}`);
      if (res.ok) {
        const data = await res.json();
        setHistoryMetrics(data);
      }
    } catch (err) {
      console.warn('History API offline', err);
    }
  };

  useEffect(() => {
    fetchMainMetrics();
    const handlePomodoroCompleted = () => {
      fetchMainMetrics();
      if (showHistoryModal) {
        fetchHistory(historyFilter);
      }
    };
    window.addEventListener('pomodoro-completed', handlePomodoroCompleted);
    return () => window.removeEventListener('pomodoro-completed', handlePomodoroCompleted);
  }, [showHistoryModal, historyFilter]);

  const handleSaveGoal = () => {
    const val = parseInt(goalInput, 10) || 0;
    localStorage.setItem('doit_weekly_goal_hours', val.toString());
    setWeeklyGoalHours(val);
    setShowGoalModal(false);
    fetchMainMetrics();
  };

  const handleOpenHistory = () => {
    setShowHistoryModal(true);
    fetchHistory(historyFilter);
  };

  const handleFilterChange = (filter: 'week' | 'month' | 'year') => {
    setHistoryFilter(filter);
    fetchHistory(filter);
  };

  // Calculations for daily goal
  const dailyGoalMin = weeklyGoalHours > 0 ? (weeklyGoalHours * 60) / 7 : 0;
  const studiedMin = mainMetrics.todayFocusTime;
  const leftMin = Math.max(0, dailyGoalMin - studiedMin);
  const percent = dailyGoalMin > 0 ? Math.min(100, (studiedMin / dailyGoalMin) * 100) : 0;
  const isGoalReached = dailyGoalMin > 0 && leftMin === 0;

  return (
    <section className="glass-panel rounded-xl p-lg col-span-1 lg:col-span-4 flex flex-col glow-hover transition-all duration-300 relative">
      <div className="flex justify-between items-start mb-4">
        <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-sm">
          <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>
            analytics
          </span>
          Desempenho <span className="text-[10px] bg-tertiary/20 text-tertiary px-2 py-0.5 rounded-full ml-2">Esta Semana</span>
        </h2>
        <div className="flex gap-2 relative">
          <button 
            type="button"
            onClick={() => {
              setGoalInput(weeklyGoalHours.toString());
              setShowGoalModal(prev => !prev);
            }}
            className="text-on-surface-variant hover:text-primary transition-colors p-1 rounded hover:bg-white/5 cursor-pointer" 
            title="Configurar Meta Semanal"
          >
            <span className="material-symbols-outlined text-[18px]">track_changes</span>
          </button>
          <button 
            type="button"
            onClick={handleOpenHistory}
            className="text-on-surface-variant hover:text-tertiary transition-colors p-1 rounded hover:bg-white/5 cursor-pointer" 
            title="Ver Histórico"
          >
            <span className="material-symbols-outlined text-[18px]">info</span>
          </button>

          {/* Goal Config Modal */}
          {showGoalModal && (
            <div className="absolute top-8 right-0 w-64 glass-panel bg-surface-container/95 border border-outline-variant/50 backdrop-blur-md rounded-xl p-4 shadow-2xl z-50">
              <h4 className="font-bold text-sm text-on-surface mb-2">Meta de Estudos (Semanal)</h4>
              <p className="text-xs text-on-surface-variant mb-3">Quantas horas você planeja estudar por semana?</p>
              <input 
                type="number" 
                value={goalInput} 
                onChange={(e) => setGoalInput(e.target.value)}
                className="w-full bg-surface-container-highest border border-outline-variant/50 rounded px-2 py-1.5 text-sm text-on-surface mb-3 outline-none focus:border-primary" 
                placeholder="Ex: 20" 
              />
              <div className="flex justify-end gap-2">
                <button 
                  type="button"
                  onClick={() => setShowGoalModal(false)}
                  className="px-3 py-1.5 rounded text-on-surface-variant hover:bg-white/5 text-xs cursor-pointer"
                >
                  Cancelar
                </button>
                <button 
                  type="button"
                  onClick={handleSaveGoal}
                  className="px-3 py-1.5 rounded bg-primary text-on-secondary hover:bg-primary-fixed text-xs font-bold cursor-pointer"
                >
                  Salvar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3 flex-1 justify-center">
        {/* Daily Goal Progress */}
        <div className="bg-surface-container/50 rounded-lg p-3 border border-outline-variant/10 flex flex-col gap-2">
          <div className="flex justify-between items-center mb-1">
            <span className="font-bold text-xs text-on-surface flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-primary">target</span> Meta de Hoje
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              weeklyGoalHours > 0
                ? isGoalReached
                  ? 'bg-tertiary/20 text-tertiary'
                  : 'bg-surface-container-highest text-on-surface-variant'
                : 'bg-surface-container-highest text-on-surface-variant'
            }`}>
              {weeklyGoalHours > 0 
                ? isGoalReached ? '✓ Meta Batida' : `${formatMinToHours(dailyGoalMin)} / dia`
                : '--'}
            </span>
          </div>
          
          <div className="w-full bg-surface-container-highest rounded-full h-2 overflow-hidden flex">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${isGoalReached ? 'bg-tertiary' : 'bg-primary'}`} 
              style={{ width: `${percent}%` }}
            />
          </div>
          
          <div className="flex justify-between text-[10px] text-on-surface-variant">
            <span>Estudado: <strong className="text-on-surface">{formatMinToHours(studiedMin)}</strong></span>
            <span>Faltam: <strong className={isGoalReached ? 'text-tertiary' : 'text-primary'}>
              {weeklyGoalHours > 0 ? (isGoalReached ? 'Concluído!' : formatMinToHours(leftMin)) : 'Meta não definida'}
            </strong></span>
          </div>
        </div>

        {/* Weekly Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-surface-container/50 rounded-lg p-3 border border-outline-variant/10 flex flex-col">
            <span className="block font-body-sm text-[10px] text-on-surface-variant mb-1">Sessões Realizadas</span>
            <span className="block font-headline-md text-xl font-bold text-tertiary">{mainMetrics.totalSessions}</span>
          </div>
          <div className="bg-surface-container/50 rounded-lg p-3 border border-outline-variant/10 flex flex-col">
            <span className="block font-body-sm text-[10px] text-on-surface-variant mb-1">Média de Estudo/Dia</span>
            <span className="block font-headline-md text-xl font-bold text-primary">
              {formatMinToHours(mainMetrics.avgFocusPerDay)}
            </span>
          </div>
        </div>
      </div>

      {/* History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm" 
            onClick={() => setShowHistoryModal(false)}
          />
          <div className="relative w-full max-w-md glass-panel bg-surface-container/95 border border-outline-variant/50 backdrop-blur-md rounded-2xl p-6 shadow-2xl z-10 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-headline-md text-lg font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary">history</span>
                Histórico de Foco
              </h3>
              <button 
                type="button"
                onClick={() => setShowHistoryModal(false)}
                className="text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-white/5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex bg-surface-container-highest rounded-lg p-1 mb-6">
              {(['week', 'month', 'year'] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => handleFilterChange(f)}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                    historyFilter === f 
                      ? 'bg-tertiary text-on-primary shadow-sm' 
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {f === 'week' ? 'Semana' : f === 'month' ? 'Mês' : 'Ano'}
                </button>
              ))}
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-container-highest/50 rounded-xl p-4 border border-outline-variant/10">
                <span className="block text-[11px] text-on-surface-variant uppercase tracking-wider mb-1">Total de Sessões</span>
                <span className="block text-2xl font-bold text-on-surface">{historyMetrics.totalSessions}</span>
              </div>
              <div className="bg-surface-container-highest/50 rounded-xl p-4 border border-outline-variant/10">
                <span className="block text-[11px] text-on-surface-variant uppercase tracking-wider mb-1">Média Foco/Dia</span>
                <span className="block text-2xl font-bold text-primary">{formatMinToHours(historyMetrics.avgFocusPerDay)}</span>
              </div>
              <div className="bg-surface-container-highest/50 rounded-xl p-4 border border-outline-variant/10">
                <span className="block text-[11px] text-on-surface-variant uppercase tracking-wider mb-1">Média Pausa/Dia</span>
                <span className="block text-2xl font-bold text-error">{formatMinToHours(historyMetrics.avgBreakPerDay)}</span>
              </div>
              <div className="bg-surface-container-highest/50 rounded-xl p-4 border border-outline-variant/10">
                <span className="block text-[11px] text-on-surface-variant uppercase tracking-wider mb-1">
                  {historyFilter === 'week' ? 'Status da Semana' : 'Semanas na Meta'}
                </span>
                <span className="block text-2xl font-bold text-tertiary">
                  {historyFilter === 'week' 
                    ? (weeklyGoalHours === 0 ? 'Sem Meta' : historyMetrics.weeksGoalMet > 0 ? 'Concluída ✓' : 'Pendente')
                    : historyMetrics.weeksGoalMet}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
