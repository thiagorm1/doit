export const MetricsCard = () => `
<section class="glass-panel rounded-xl p-lg col-span-1 lg:col-span-4 flex flex-col glow-hover transition-all duration-300">
  <div class="flex justify-between items-start mb-lg">
    <h2 class="font-headline-md text-headline-md text-on-surface flex items-center gap-sm">
      <span class="material-symbols-outlined text-tertiary" style="font-variation-settings: 'FILL' 1;">analytics</span>
      Desempenho
    </h2>
  </div>
  <div class="flex flex-col gap-md flex-1 justify-center">
    <div class="bg-surface-container/50 rounded-lg p-md border border-outline-variant/10 flex justify-between items-center">
      <div class="flex items-center gap-sm">
        <div class="w-10 h-10 rounded-full bg-tertiary/15 flex items-center justify-center text-tertiary">
          <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">task_alt</span>
        </div>
        <div>
          <span class="block font-body-sm text-body-sm text-on-surface-variant">Sessões Realizadas</span>
          <span class="block font-headline-md text-headline-md font-bold text-on-surface">42</span>
        </div>
      </div>
      <div class="flex flex-col items-end">
        <span class="text-tertiary text-label-caps font-label-caps flex items-center gap-1"><span class="material-symbols-outlined text-[14px]">arrow_upward</span> 12%</span>
        <span class="text-on-surface-variant text-[10px]">vs. última semana</span>
      </div>
    </div>
    <div class="bg-surface-container/50 rounded-lg p-md border border-outline-variant/10 flex justify-between items-center">
      <div class="flex items-center gap-sm">
        <div class="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-primary">
          <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">schedule</span>
        </div>
        <div>
          <span class="block font-body-sm text-body-sm text-on-surface-variant">Média de Estudo</span>
          <span class="block font-headline-md text-headline-md font-bold text-on-surface">4h 15m</span>
        </div>
      </div>
      <span class="text-on-surface-variant text-label-caps font-label-caps">/ DIA</span>
    </div>
    <div class="bg-surface-container/50 rounded-lg p-md border border-outline-variant/10 flex justify-between items-center">
      <div class="flex items-center gap-sm">
        <div class="w-10 h-10 rounded-full bg-error/15 flex items-center justify-center text-error">
          <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">bed</span>
        </div>
        <div>
          <span class="block font-body-sm text-body-sm text-on-surface-variant">Média de Descanso</span>
          <span class="block font-headline-md text-headline-md font-bold text-on-surface">45m</span>
        </div>
      </div>
      <span class="text-on-surface-variant text-label-caps font-label-caps">/ DIA</span>
    </div>
  </div>
</section>
`;
