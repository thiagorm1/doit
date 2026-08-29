export const MindMapsCard = () => `
<section class="glass-panel rounded-xl p-lg col-span-1 lg:col-span-4 flex flex-col glow-hover transition-all duration-300 relative overflow-hidden">
  <div class="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent pointer-events-none"></div>
  <div class="flex justify-between items-start mb-md relative z-10">
    <h2 class="font-headline-md text-headline-md text-on-surface flex items-center gap-sm">
      <span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1;">school</span>
      Faculdade
    </h2>
  </div>
  <div class="flex-1 overflow-y-auto pr-sm relative z-10 space-y-4 mt-sm custom-scrollbar">
    <!-- Card de Semestre -->
    <div class="bg-surface-container/50 rounded-lg p-md border border-outline-variant/10">
      <div class="flex justify-between items-center mb-xs">
        <span class="text-label-caps font-label-caps text-on-surface-variant uppercase tracking-widest">Semestre Atual</span>
        <span class="text-primary font-bold">5º</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-label-caps font-label-caps text-on-surface-variant uppercase tracking-widest">Conclusão</span>
        <span class="text-on-surface">8º</span>
      </div>
    </div>
    <!-- Card de Matérias Matriculadas -->
    <div class="space-y-2">
      <h3 class="text-label-caps font-label-caps text-on-surface-variant uppercase tracking-widest px-xs">Matérias Matriculadas</h3>
      <div class="bg-surface-container/50 rounded-lg p-sm border border-outline-variant/10 space-y-2">
        <div class="flex justify-between items-center">
          <span class="text-body-sm text-on-surface">Cálculo III</span>
          <span class="text-[10px] text-on-surface-variant">19:00 - 20:40</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-body-sm text-on-surface">Sistemas Operacionais</span>
          <span class="text-[10px] text-on-surface-variant">20:50 - 22:30</span>
        </div>
      </div>
    </div>
    <!-- Card de Provas -->
    <div class="space-y-2">
      <div class="flex justify-between items-center px-xs">
        <h3 class="text-label-caps font-label-caps text-on-surface-variant uppercase tracking-widest">Próximas Provas</h3>
        <span class="text-[10px] text-tertiary">4 Realizadas</span>
      </div>
      <div class="bg-surface-container/50 rounded-lg p-sm border border-outline-variant/10 space-y-2">
        <div class="flex justify-between items-center">
          <span class="text-body-sm text-on-surface">Arq. de Software</span>
          <span class="text-[10px] text-primary">15/10</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-body-sm text-on-surface">Banco de Dados II</span>
          <span class="text-[10px] text-primary">22/10</span>
        </div>
      </div>
    </div>
  </div>
</section>
`;
