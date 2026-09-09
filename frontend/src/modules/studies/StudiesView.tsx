import React from 'react';
import { PomodoroCard } from './components/PomodoroCard';
import { YoutubePlayerCard } from './components/YoutubePlayerCard';
import { ContestCard } from './components/ContestCard';
import { MetricsCard } from './components/MetricsCard';
import { CollegeCard } from './components/CollegeCard';
import { KnowledgeBaseArea } from './components/KnowledgeBaseArea';

export const StudiesView: React.FC = () => {
  return (
    <div className="space-y-gutter">
      {/* View Header */}
      <div className="flex justify-between items-end mb-lg relative z-10">
        <div>
          <h1 className="font-display-lg text-display-lg text-on-surface mb-xs">Centro de Foco</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Otimize sua retenção de conhecimento.</p>
        </div>
      </div>
      
      {/* Top Grid: Bento Style */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter mb-gutter relative z-40">
        <div className="flex flex-col gap-gutter">
          <PomodoroCard />
          <YoutubePlayerCard />
        </div>
        <div className="flex flex-col gap-gutter">
          <ContestCard />
          <MetricsCard />
        </div>
        <div className="flex flex-col">
          <CollegeCard />
        </div>
      </div>
      
      {/* Knowledge Base Area */}
      <KnowledgeBaseArea />
    </div>
  );
};
