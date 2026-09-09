import React, { useState } from 'react';
import { ytService, useYoutube, parseYoutubeUrl, type YoutubeMediaType, type SavedMedia } from '../YoutubeService';

export const YoutubePlayerCard: React.FC = () => {
  const yt = useYoutube();
  const [showConfig, setShowConfig] = useState(false);

  // Modal form
  const [inputUrl, setInputUrl] = useState('');
  const [inputName, setInputName] = useState('');
  const [inputType, setInputType] = useState<YoutubeMediaType>('playlist');

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

  const handleAddMedia = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseYoutubeUrl(inputUrl, inputType);
    if (!parsed) {
      alert('URL ou ID do YouTube inválido!');
      return;
    }

    const newMedia: SavedMedia = {
      id: parsed.id,
      name: inputName.trim() || (parsed.type === 'playlist' ? 'Nova Playlist' : 'Novo Vídeo'),
      type: parsed.type
    };

    const updated = [...yt.savedPlaylists, newMedia];
    ytService.savePlaylists(updated);
    setInputUrl('');
    setInputName('');
  };

  const handlePlayMedia = (item: SavedMedia) => {
    ytService.loadMedia(item.id, item.type);
  };

  const handleRemoveMedia = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = yt.savedPlaylists.filter(p => p.id !== id);
    ytService.savePlaylists(updated);
  };

  return (
    <section id="yt-card-root" className="glass-panel rounded-xl p-4 flex flex-col relative group glow-hover transition-all duration-300">
      <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
        <div className="absolute -right-12 -top-12 w-40 h-40 bg-secondary/5 rounded-full blur-2xl group-hover:bg-secondary/10 transition-colors pointer-events-none" />
      </div>

      {/* Header Info */}
      <div className="flex items-center justify-between relative z-10">
        <div className="flex gap-3 items-center overflow-hidden">
          <div 
            className="w-12 h-12 rounded-md bg-surface-container-highest bg-cover bg-center flex shrink-0 items-center justify-center shadow-lg transition-all duration-500"
            style={{ backgroundImage: yt.currentVideoData.cover || undefined }}
          >
            {!yt.currentVideoData.cover && (
              <span className="material-symbols-outlined text-on-surface-variant/50 text-[24px]">music_note</span>
            )}
          </div>
          <div className="overflow-hidden flex-1">
            <h3 className="font-headline-sm font-bold text-on-surface truncate text-sm leading-tight">
              {yt.currentVideoData.title}
            </h3>
            <p className="font-label-md text-on-surface-variant truncate text-[10px] uppercase mt-0.5">
              {yt.currentVideoData.artist}
            </p>
          </div>
        </div>
        <button 
          type="button"
          onClick={() => setShowConfig(prev => !prev)}
          className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full hover:bg-white/5 shrink-0 cursor-pointer" 
          title="Configurar Músicas e Playlists"
        >
          <span className="material-symbols-outlined text-[24px]">queue_music</span>
        </button>
      </div>

      {/* Progress Bar */}
      <div className="flex flex-col gap-xs mt-2 relative z-10">
        <div 
          className="h-1 bg-surface-container-highest rounded-full overflow-hidden cursor-pointer" 
          onClick={handleProgressClick}
        >
          <div 
            className="h-full bg-primary pointer-events-none transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-on-surface-variant font-label-md">
          <span>{formatTime(yt.currentTime)}</span>
          <span>{formatTime(yt.duration)}</span>
        </div>
      </div>

      {/* Controls & Volume */}
      <div className="flex items-center justify-between mt-2 relative z-10">
        <div className="w-20 hidden sm:block"></div> 

        <div className="flex items-center justify-center gap-4">
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
            className="w-10 h-10 bg-primary text-on-secondary rounded-full flex items-center justify-center hover:bg-primary-fixed shadow-[0_0_15px_rgba(255,82,82,0.3)] transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
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
        <div className="flex items-center gap-1.5 w-20 justify-end">
          <span className="material-symbols-outlined text-[16px] text-on-surface-variant shrink-0">
            {yt.volume === 0 ? 'volume_off' : 'volume_up'}
          </span>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={yt.volume} 
            onChange={(e) => ytService.setVolume(parseInt(e.target.value, 10))}
            className="w-12 h-1 bg-surface-container-highest rounded-full appearance-none outline-none cursor-pointer accent-primary" 
          />
        </div>
      </div>

      {/* Modal de Playlists */}
      {showConfig && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-80 z-50 glass-panel bg-surface-container/95 backdrop-blur-md rounded-xl p-4 flex flex-col shadow-2xl border border-outline-variant/50">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-headline-sm text-on-surface text-sm font-bold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-primary">featured_play_list</span>
              Minhas Playlists & Músicas
            </h3>
            <button 
              type="button"
              onClick={() => setShowConfig(false)}
              className="text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-white/5 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleAddMedia} className="flex flex-col gap-2 mb-3 bg-surface-container-highest/50 p-2.5 rounded-lg border border-outline-variant/20">
            <input 
              type="text" 
              placeholder="Nome (ex: Lofi Hip Hop)" 
              value={inputName} 
              onChange={(e) => setInputName(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant/30 rounded px-2 py-1 text-xs text-on-surface outline-none focus:border-primary" 
            />
            <input 
              type="text" 
              placeholder="Link ou ID do YouTube" 
              value={inputUrl} 
              onChange={(e) => setInputUrl(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant/30 rounded px-2 py-1 text-xs text-on-surface outline-none focus:border-primary" 
              required 
            />
            <div className="flex items-center justify-between text-xs text-on-surface-variant">
              <div className="flex gap-3">
                <label className="flex items-center gap-1 cursor-pointer">
                  <input 
                    type="radio" 
                    name="yt_type" 
                    checked={inputType === 'playlist'} 
                    onChange={() => setInputType('playlist')} 
                    className="accent-primary" 
                  />
                  Playlist
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input 
                    type="radio" 
                    name="yt_type" 
                    checked={inputType === 'video'} 
                    onChange={() => setInputType('video')} 
                    className="accent-primary" 
                  />
                  Vídeo Único
                </label>
              </div>
              <button 
                type="submit" 
                className="bg-primary text-on-secondary px-2.5 py-1 rounded text-xs font-bold hover:bg-primary-fixed transition-colors cursor-pointer"
              >
                Adicionar
              </button>
            </div>
          </form>

          {/* Saved Media List */}
          <div className="max-h-48 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
            {yt.savedPlaylists.length === 0 ? (
              <p className="text-[11px] text-on-surface-variant text-center py-2">Nenhuma mídia salva.</p>
            ) : (
              yt.savedPlaylists.map((item) => {
                const isActive = yt.activeId === item.id;
                return (
                  <div 
                    key={item.id}
                    onClick={() => handlePlayMedia(item)}
                    className={`flex items-center justify-between p-2 rounded-lg text-xs cursor-pointer transition-colors ${
                      isActive 
                        ? 'bg-primary/20 text-primary border border-primary/30 font-bold' 
                        : 'bg-surface-container/60 hover:bg-surface-container-highest text-on-surface'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate flex-1">
                      <span className="material-symbols-outlined text-[16px] shrink-0 text-on-surface-variant">
                        {item.type === 'playlist' ? 'playlist_play' : 'smart_display'}
                      </span>
                      <span className="truncate">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {isActive && (
                        <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-primary/20 text-primary">
                          Tocando
                        </span>
                      )}
                      <button 
                        type="button"
                        onClick={(e) => handleRemoveMedia(item.id, e)}
                        className="text-on-surface-variant hover:text-error p-1 transition-colors cursor-pointer" 
                        title="Excluir"
                      >
                        <span className="material-symbols-outlined text-[14px]">delete</span>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </section>
  );
};
