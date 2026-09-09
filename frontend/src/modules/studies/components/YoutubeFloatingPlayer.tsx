import React, { useState } from 'react';
import { ytService, useYoutube } from '../YoutubeService';

export const YoutubeFloatingPlayer: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const yt = useYoutube();

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = yt.duration > 0 ? (yt.currentTime / yt.duration) * 100 : 0;

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    ytService.seek(ratio);
  };

  return (
    <div id="yt-floating-container" className="fixed bottom-4 left-4 z-[90] flex flex-col items-start transition-all duration-300">
      {/* Expanded Widget */}
      {isExpanded && (
        <div className="glass-panel rounded-xl p-3 flex flex-col relative w-72 shadow-2xl mb-2 border border-outline-variant/30 origin-bottom-left transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 overflow-hidden">
              <div 
                className="w-8 h-8 rounded bg-surface-container-highest bg-cover bg-center flex shrink-0 items-center justify-center"
                style={{ backgroundImage: yt.currentVideoData.cover || undefined }}
              >
                {!yt.currentVideoData.cover && (
                  <span className="material-symbols-outlined text-on-surface-variant/50 text-[16px]">music_note</span>
                )}
              </div>
              <div className="overflow-hidden flex-1">
                <h3 className="font-headline-sm font-bold text-on-surface truncate text-xs leading-tight">
                  {yt.currentVideoData.title}
                </h3>
                <p className="font-label-md text-on-surface-variant truncate text-[9px] uppercase mt-0.5">
                  {yt.currentVideoData.artist}
                </p>
              </div>
            </div>
            <button 
              type="button"
              onClick={() => setIsExpanded(false)}
              className="text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-white/5 transition-colors cursor-pointer" 
              title="Minimizar"
            >
              <span className="material-symbols-outlined text-[16px]">close_fullscreen</span>
            </button>
          </div>

          {/* Controls & Volume */}
          <div className="flex items-center justify-between my-1 px-1 gap-2">
            <div className="flex items-center gap-1.5">
              <button 
                type="button"
                onClick={() => ytService.prevVideo()}
                className="text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-white/5 transition-colors cursor-pointer" 
                title="Anterior / Reiniciar"
              >
                <span className="material-symbols-outlined text-[18px]">skip_previous</span>
              </button>
              <button 
                type="button"
                onClick={() => ytService.togglePlay()}
                className="w-8 h-8 bg-primary text-on-secondary rounded-full flex items-center justify-center hover:bg-primary-fixed shadow-[0_0_10px_rgba(255,82,82,0.3)] transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {yt.isPlaying ? 'pause' : 'play_arrow'}
                </span>
              </button>
              <button 
                type="button"
                onClick={() => ytService.nextVideo()}
                className="text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-white/5 transition-colors cursor-pointer" 
                title="Próxima / Reiniciar"
              >
                <span className="material-symbols-outlined text-[18px]">skip_next</span>
              </button>
            </div>

            {/* Volume */}
            <div className="flex items-center gap-1.5 bg-surface-container-highest/60 px-2 py-1 rounded-full border border-white/5">
              <button 
                type="button"
                onClick={() => ytService.setVolume(yt.volume > 0 ? 0 : 100)}
                className="text-on-surface-variant hover:text-on-surface flex items-center justify-center cursor-pointer transition-colors" 
                title="Mutar / Desmutar"
              >
                <span className="material-symbols-outlined text-[15px]">
                  {yt.volume === 0 ? 'volume_off' : 'volume_up'}
                </span>
              </button>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={yt.volume} 
                onChange={(e) => ytService.setVolume(parseInt(e.target.value, 10))}
                className="w-14 h-1 bg-surface-container-low rounded-full appearance-none outline-none cursor-pointer accent-primary" 
                title="Volume" 
              />
            </div>
          </div>

          {/* Progress */}
          <div className="flex flex-col gap-1 mt-1">
            <div 
              className="h-1 bg-surface-container-highest rounded-full overflow-hidden cursor-pointer" 
              onClick={handleProgressClick}
            >
              <div 
                className="h-full bg-primary pointer-events-none transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-[9px] text-on-surface-variant">
              <span>{formatTime(yt.currentTime)}</span>
              <span>{formatTime(yt.duration)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Collapsed Bubble */}
      <button 
        type="button"
        onClick={() => setIsExpanded(prev => !prev)}
        className="w-12 h-12 rounded-full bg-surface-container-highest border border-outline-variant/50 shadow-lg flex items-center justify-center hover:bg-surface-container transition-colors group relative cursor-pointer" 
        title="Player de Música"
      >
        <div className={`absolute inset-0 rounded-full border-2 border-primary transition-all duration-1000 ${
          yt.isPlaying ? 'opacity-100 scale-100 animate-pulse' : 'opacity-0 scale-110'
        }`} />
        <span className="material-symbols-outlined text-primary text-[24px] group-hover:scale-110 transition-transform">
          music_note
        </span>
      </button>
    </div>
  );
};
