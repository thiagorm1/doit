export const PomodoroCard = () => `
<section class="glass-panel rounded-xl p-lg col-span-1 lg:col-span-4 flex flex-col justify-between relative overflow-hidden group glow-hover transition-all duration-300">
  <div class="absolute -right-12 -top-12 w-40 h-40 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors pointer-events-none"></div>
  <div class="flex justify-between items-start mb-md relative z-10">
    <h2 class="font-headline-md text-headline-md text-on-surface flex items-center gap-sm">
      <span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1;">timer</span>
      Foco Ativo
    </h2>
    <span class="px-sm py-xs bg-primary/15 text-primary text-label-caps font-label-caps rounded-md">ESTUDO</span>
  </div>
  <div class="flex-1 flex flex-col items-center justify-center py-md relative z-10">
    <div class="relative w-48 h-48 flex items-center justify-center mb-md">
      <svg class="absolute inset-0 w-full h-full transform -rotate-90">
        <circle class="text-surface-container-highest" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" stroke-width="4"></circle>
        <circle class="text-primary drop-shadow-[0_0_10px_rgba(255,82,82,0.5)] progress-ring__circle" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" stroke-dasharray="552.92" stroke-dashoffset="150" stroke-linecap="round" stroke-width="8"></circle>
      </svg>
      <div class="text-center">
        <span class="block font-display-lg text-[56px] leading-none font-bold text-on-surface tracking-tighter">25:00</span>
        <span class="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest mt-xs block">Sessão 3/4</span>
      </div>
    </div>
    <div class="flex gap-md w-full justify-center">
      <button class="w-12 h-12 rounded-full border border-outline-variant/50 flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:border-on-surface transition-all">
        <span class="material-symbols-outlined">restart_alt</span>
      </button>
      <button class="w-12 h-12 rounded-full bg-primary text-on-secondary flex items-center justify-center hover:bg-primary-fixed shadow-[0_0_15px_rgba(255,82,82,0.3)] transition-all">
        <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">play_arrow</span>
      </button>
      <button class="w-12 h-12 rounded-full border border-outline-variant/50 flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:border-on-surface transition-all">
        <span class="material-symbols-outlined">skip_next</span>
      </button>
    </div>
  </div>
</section>
`;
