import React, { useState } from 'react';
import { pomodoroGlobal, usePomodoro } from '../PomodoroService';

export const PomodoroCard: React.FC = () => {
  const pomo = usePomodoro();
  const [showConfig, setShowConfig] = useState(false);

  // Local config form state
  const [cfgFocus, setCfgFocus] = useState(pomo.focusMin);
  const [cfgShort, setCfgShort] = useState(pomo.shortMin);
  const [cfgLong, setCfgLong] = useState(pomo.longMin);
  const [cfgCycles, setCfgCycles] = useState(pomo.totalCycles);
  const [cfgLongEnabled, setCfgLongEnabled] = useState(pomo.longBreakEnabled);

  const openConfig = () => {
    setCfgFocus(pomo.focusMin);
    setCfgShort(pomo.shortMin);
    setCfgLong(pomo.longMin);
    setCfgCycles(pomo.totalCycles);
    setCfgLongEnabled(pomo.longBreakEnabled);
    setShowConfig(true);
  };

  const handleSaveConfig = () => {
    pomodoroGlobal.setConfig(cfgFocus, cfgShort, cfgLong, cfgCycles, cfgLongEnabled);
    setShowConfig(false);
  };

  const totalTime = pomodoroGlobal.getTotalTimeForMode();
  const circumference = 552.92;
  const progressRatio = totalTime > 0 ? pomo.timeLeft / totalTime : 0;
  const strokeDashoffset = circumference * (1 - progressRatio);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const getModeInfo = () => {
    switch (pomo.mode) {
      case 'short':
        return { title: 'Pausa Curta', badge: 'DESCANSO', badgeColor: 'bg-tertiary/15 text-tertiary' };
      case 'long':
        return { title: 'Pausa Longa', badge: 'DESCANSO LONGO', badgeColor: 'bg-tertiary/15 text-tertiary' };
      case 'done':
        return { title: 'Ciclos Concluídos!', badge: 'PARABÉNS', badgeColor: 'bg-primary/15 text-primary' };
      case 'focus':
      default:
        return { title: 'Foco Ativo', badge: 'ESTUDO', badgeColor: 'bg-primary/15 text-primary' };
    }
  };

  const { title, badge, badgeColor } = getModeInfo();

  return (
    <section className="glass-panel rounded-xl p-lg col-span-1 lg:col-span-4 flex flex-col justify-between relative overflow-hidden group glow-hover transition-all duration-300">
      <div className="absolute -right-12 -top-12 w-40 h-40 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors pointer-events-none" />

      {/* Config Modal Overlay */}
      {showConfig && (
        <div className="absolute inset-0 bg-surface-container/95 z-50 p-6 flex flex-col justify-center rounded-xl backdrop-blur-sm border border-outline-variant/30">
          <h3 className="font-headline-md text-on-surface mb-4">Configurações</h3>
          <div className="space-y-3 font-body-sm">
            <div className="flex justify-between items-center">
              <label className="text-on-surface-variant">Tempo de Foco (min)</label>
              <input 
                type="number" 
                value={cfgFocus} 
                onChange={(e) => setCfgFocus(parseInt(e.target.value, 10) || 1)}
                className="w-16 bg-surface-container-highest border border-outline-variant/50 rounded text-center text-on-surface" 
              />
            </div>
            <div className="flex justify-between items-center">
              <label className="text-on-surface-variant">Descanso Curto (min)</label>
              <input 
                type="number" 
                value={cfgShort} 
                onChange={(e) => setCfgShort(parseInt(e.target.value, 10) || 1)}
                className="w-16 bg-surface-container-highest border border-outline-variant/50 rounded text-center text-on-surface" 
              />
            </div>
            <div className="flex justify-between items-center">
              <label className="text-on-surface-variant flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={cfgLongEnabled} 
                  onChange={(e) => setCfgLongEnabled(e.target.checked)}
                  className="accent-primary" 
                />
                <span>Pausa Longa (min)</span>
              </label>
              <input 
                type="number" 
                value={cfgLong} 
                onChange={(e) => setCfgLong(parseInt(e.target.value, 10) || 1)}
                className="w-16 bg-surface-container-highest border border-outline-variant/50 rounded text-center text-on-surface" 
              />
            </div>
            <div className="flex justify-between items-center">
              <label className="text-on-surface-variant">Sessões (Focos)</label>
              <input 
                type="number" 
                value={cfgCycles} 
                onChange={(e) => setCfgCycles(parseInt(e.target.value, 10) || 1)}
                className="w-16 bg-surface-container-highest border border-outline-variant/50 rounded text-center text-on-surface" 
              />
            </div>
          </div>
          <div className="flex gap-2 mt-6">
            <button 
              type="button"
              onClick={() => setShowConfig(false)}
              className="flex-1 py-2 rounded border border-outline-variant/50 text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button 
              type="button"
              onClick={handleSaveConfig}
              className="flex-1 py-2 rounded bg-primary text-on-secondary font-bold hover:bg-primary-fixed transition-colors cursor-pointer"
            >
              Salvar
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-start mb-md relative z-10">
        <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-sm">
          <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>timer</span>
          <span>{title}</span>
        </h2>
        <div className="flex gap-2 items-center">
          <button 
            type="button"
            onClick={openConfig}
            className="text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center bg-surface-container-highest rounded-md w-7 h-7 cursor-pointer"
            title="Configurações do Pomodoro"
          >
            <span className="material-symbols-outlined text-[16px]">settings</span>
          </button>
          <span className={`px-sm py-xs text-label-caps font-label-caps rounded-md transition-colors ${badgeColor}`}>
            {badge}
          </span>
        </div>
      </div>

      {/* Circle & Timer */}
      <div className="flex-1 flex flex-col items-center justify-center py-md relative z-10">
        <div className="relative w-48 h-48 flex items-center justify-center mb-md">
          <svg className="absolute inset-0 w-full h-full">
            <circle 
              className="text-surface-container-highest" 
              cx="96" 
              cy="96" 
              fill="transparent" 
              r="88" 
              stroke="currentColor" 
              strokeWidth="4" 
            />
            <circle 
              className="text-primary drop-shadow-[0_0_10px_rgba(255,82,82,0.5)] progress-ring__circle transition-all duration-1000 ease-linear" 
              cx="96" 
              cy="96" 
              fill="transparent" 
              r="88" 
              stroke="currentColor" 
              strokeDasharray={circumference} 
              strokeDashoffset={strokeDashoffset} 
              strokeLinecap="round" 
              strokeWidth="8" 
            />
          </svg>
          <div className="text-center">
            <span className="block font-display-lg text-[56px] leading-none font-bold text-on-surface tracking-tighter">
              {formatTime(pomo.timeLeft)}
            </span>
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mt-xs block">
              Sessão {pomo.currentCycle}/{pomo.totalCycles}
            </span>
          </div>
        </div>
        
        {/* Controls */}
        <div className="flex gap-md w-full justify-center">
          <button 
            type="button"
            onClick={() => pomodoroGlobal.resetCurrent()}
            className="p-sm bg-surface-container-highest rounded-lg text-on-surface hover:text-primary hover:bg-surface-variant transition-colors flex items-center justify-center cursor-pointer" 
            title="Reiniciar Tempo Atual"
          >
            <span className="material-symbols-outlined text-[20px]">restart_alt</span>
          </button>
          <button 
            type="button"
            onClick={() => pomodoroGlobal.togglePlay()}
            className="px-xl py-sm bg-primary text-on-secondary rounded-lg font-bold font-label-caps text-label-caps hover:bg-primary-fixed transition-colors flex items-center gap-xs shadow-[0_0_15px_rgba(255,82,82,0.3)] hover:shadow-[0_0_20px_rgba(255,82,82,0.5)] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">
              {pomo.isRunning ? 'pause' : 'play_arrow'}
            </span>
            <span>{pomo.isRunning ? 'PAUSAR' : 'INICIAR'}</span>
          </button>
          <button 
            type="button"
            onClick={() => pomodoroGlobal.skip()}
            className="p-sm bg-surface-container-highest rounded-lg text-on-surface hover:text-primary hover:bg-surface-variant transition-colors flex items-center justify-center cursor-pointer" 
            title="Avançar para Próxima Etapa"
          >
            <span className="material-symbols-outlined text-[20px]">skip_next</span>
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex justify-between items-center text-body-sm text-on-surface-variant border-t border-outline-variant/10 pt-md mt-auto relative z-10">
        <span>Foco: {pomo.focusMin}m | Curta: {pomo.shortMin}m {pomo.longBreakEnabled ? `| Longa: ${pomo.longMin}m` : ''}</span>
        <span className="text-primary font-bold">{pomo.totalCycles} Sessões</span>
      </div>
    </section>
  );
};
