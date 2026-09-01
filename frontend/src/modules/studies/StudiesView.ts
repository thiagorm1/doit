import { PomodoroCard, initPomodoro } from './components/PomodoroCard';
import { YoutubePlayerCard, initYoutubePlayer } from './components/YoutubePlayerCard';
import { MetricsCard, initMetricsCard } from './components/MetricsCard';
import { CollegeCard, initCollegeCard } from './components/CollegeCard';
import { ContestCard, initContestCard } from './components/ContestCard';
import { KnowledgeBaseArea, initKnowledgeBase } from './components/KnowledgeBaseArea';

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
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-gutter mb-gutter relative z-40">
    <div class="flex flex-col gap-gutter">
      ${PomodoroCard()}
      ${YoutubePlayerCard()}
    </div>
    <div class="flex flex-col gap-gutter">
      ${ContestCard()}
      ${MetricsCard()}
    </div>
    <div class="flex flex-col">
      ${CollegeCard()}
    </div>
  </div>
  
  <!-- Knowledge Base Area -->
  ${KnowledgeBaseArea()}
`;

export const initStudiesView = () => {
  initPomodoro();
  initYoutubePlayer();
  initMetricsCard();
  initCollegeCard();
  initContestCard();
  initKnowledgeBase();
};
