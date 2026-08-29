import { PomodoroCard } from './components/PomodoroCard';
import { MetricsCard } from './components/MetricsCard';
import { MindMapsCard } from './components/MindMapsCard';
import { KnowledgeBaseArea } from './components/KnowledgeBaseArea';

export const StudiesView = () => `
  <div class="flex justify-between items-end mb-lg relative z-10">
    <div>
      <h1 class="font-display-lg text-display-lg text-on-surface mb-xs">Centro de Foco</h1>
      <p class="font-body-md text-body-md text-on-surface-variant">Otimize sua retenção de conhecimento.</p>
    </div>
    <button class="bg-primary text-on-secondary px-lg py-sm rounded-lg font-bold font-label-caps text-label-caps tracking-wider hover:bg-primary-fixed transition-colors flex items-center gap-xs shadow-[0_0_15px_rgba(255,82,82,0.3)] hover:shadow-[0_0_25px_rgba(255,82,82,0.5)] relative z-20">
      <span class="material-symbols-outlined text-[18px]">add</span> NOVO CONTEÚDO
    </button>
  </div>
  
  <!-- Top Grid: Bento Style -->
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-gutter mb-gutter relative z-10">
    ${PomodoroCard()}
    ${MetricsCard()}
    ${MindMapsCard()}
  </div>
  
  <!-- Knowledge Base Area -->
  ${KnowledgeBaseArea()}
`;
