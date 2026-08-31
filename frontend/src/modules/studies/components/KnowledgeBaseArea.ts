export const KnowledgeBaseArea = () => `
<section class="glass-panel rounded-xl p-lg flex flex-col lg:flex-row gap-lg h-[600px] relative z-10">
  <!-- Sidebar: Cursos -->
  <div class="w-full lg:w-64 flex-shrink-0 flex flex-col border-b lg:border-b-0 lg:border-r border-outline-variant/10 pb-md lg:pb-0 lg:pr-md">
      <div class="flex items-center justify-between mb-md">
      <h3 class="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest sidebar-text">Módulos Ativos</h3>
      <div class="flex gap-1">
        <button class="text-on-surface-variant hover:text-primary transition-colors w-7 h-7 flex items-center justify-center bg-surface-container rounded" title="Novo Módulo">
          <span class="material-symbols-outlined text-[16px]">add</span>
        </button>
        <button class="text-on-surface-variant hover:text-primary transition-colors w-7 h-7 flex items-center justify-center">
          <span class="material-symbols-outlined text-[20px]">side_navigation</span>
        </button>
      </div>
    </div>
    <div class="flex-1 overflow-y-auto space-y-1 custom-scrollbar pr-xs">
      <div class="space-y-4">
        <div class="space-y-1">
          <button class="kb-module-btn w-full text-left p-sm rounded-lg hover:bg-surface-container-high text-on-surface flex items-center gap-sm transition-all group">
            <span class="material-symbols-outlined text-[18px] text-primary">folder</span>
            <span class="sidebar-text font-bold">Dev</span>
            <span class="kb-module-icon material-symbols-outlined text-[16px] ml-auto opacity-50 transition-transform">expand_more</span>
          </button>
          <div class="kb-module-content pl-8 space-y-1">
            <button class="w-full text-left p-sm rounded-lg hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface flex items-center gap-sm transition-all">
              <span class="material-symbols-outlined text-[18px]">description</span>
              <span class="sidebar-text">Java</span>
            </button>
            <button class="w-full text-left p-xs rounded-lg hover:bg-surface-container-high text-primary/70 hover:text-primary flex items-center gap-sm transition-all mt-2 border border-dashed border-primary/20">
              <span class="material-symbols-outlined text-[14px] ml-1">add</span>
              <span class="sidebar-text text-xs">Novo Conteúdo</span>
            </button>
          </div>
        </div>
        <div class="space-y-1">
          <button class="kb-module-btn w-full text-left p-sm rounded-lg hover:bg-surface-container-high text-on-surface flex items-center gap-sm transition-all group">
            <span class="material-symbols-outlined text-[18px] text-primary">folder</span>
            <span class="sidebar-text font-bold">Faculdade</span>
            <span class="kb-module-icon material-symbols-outlined text-[16px] ml-auto opacity-50 transition-transform">expand_more</span>
          </button>
          <div class="kb-module-content pl-8 space-y-1">
            <button class="w-full text-left p-sm rounded-lg hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface flex items-center gap-sm transition-all">
              <span class="material-symbols-outlined text-[18px]">description</span>
              <span class="sidebar-text">Sistemas Op.</span>
            </button>
            <button class="w-full text-left p-xs rounded-lg hover:bg-surface-container-high text-primary/70 hover:text-primary flex items-center gap-sm transition-all mt-2 border border-dashed border-primary/20">
              <span class="material-symbols-outlined text-[14px] ml-1">add</span>
              <span class="sidebar-text text-xs">Novo Conteúdo</span>
            </button>
          </div>
        </div>
        <div class="space-y-1">
          <button class="kb-module-btn w-full text-left p-sm rounded-lg hover:bg-surface-container-high text-on-surface flex items-center gap-sm transition-all group">
            <span class="material-symbols-outlined text-[18px] text-primary">folder</span>
            <span class="sidebar-text font-bold">Concurso</span>
            <span class="kb-module-icon material-symbols-outlined text-[16px] ml-auto opacity-50 transition-transform" style="transform: rotate(180deg)">expand_more</span>
          </button>
          <div class="kb-module-content hidden pl-8 space-y-1">
            <button class="w-full text-left p-xs rounded-lg hover:bg-surface-container-high text-primary/70 hover:text-primary flex items-center gap-sm transition-all mt-2 border border-dashed border-primary/20">
              <span class="material-symbols-outlined text-[14px] ml-1">add</span>
              <span class="sidebar-text text-xs">Novo Conteúdo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Content Area -->
  <div class="flex-1 flex flex-col h-full overflow-hidden">
    <!-- Controls Header -->
    <div class="flex flex-wrap justify-between items-center mb-md gap-sm bg-surface-container-highest p-sm rounded-lg border border-outline-variant/10">
      <div class="flex gap-sm">
        <button id="kb-toggle-notes" class="px-md py-xs rounded-md bg-surface border border-outline-variant/30 text-body-sm font-body-sm text-on-surface hover:border-primary hover:text-primary transition-colors flex items-center gap-xs">
          <span class="material-symbols-outlined text-[16px]">visibility_off</span>
          Anotações
        </button>
        <button id="kb-toggle-map" class="px-md py-xs rounded-md bg-surface border border-outline-variant/30 text-body-sm font-body-sm text-on-surface hover:border-primary hover:text-primary transition-colors flex items-center gap-xs">
          <span class="material-symbols-outlined text-[16px]">visibility_off</span>
          Mapa Mental
        </button>
      </div>
      <div class="flex items-center gap-sm">
        <span class="font-body-sm text-on-surface-variant mr-2">Tópico: Padrões de Projeto</span>
        <button class="w-8 h-8 rounded-md bg-surface border border-outline-variant/30 flex items-center justify-center text-on-surface hover:border-primary hover:text-primary transition-colors">
          <span class="material-symbols-outlined text-[20px]">arrow_back_ios_new</span>
        </button>
        <button class="w-8 h-8 rounded-md bg-surface border border-outline-variant/30 flex items-center justify-center text-on-surface hover:border-primary hover:text-primary transition-colors">
          <span class="material-symbols-outlined text-[20px]">arrow_forward_ios</span>
        </button>
      </div>
    </div>
    <!-- Side-by-Side View -->
    <div class="flex-1 flex flex-col md:flex-row gap-md overflow-hidden">
      <!-- Left: Written Notes -->
      <div id="kb-container-notes" class="flex-1 bg-surface-container rounded-lg border border-outline-variant/10 p-md overflow-y-auto custom-scrollbar relative">
        <div class="mb-md bg-surface-container-high border border-outline-variant/20 rounded-lg p-sm flex items-center justify-between group cursor-pointer hover:border-primary/50 transition-all">
          <button class="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
            <span class="material-symbols-outlined text-[20px]">chevron_left</span>
          </button>
          <div class="flex items-center gap-xs">
            <span class="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">Tópico:</span>
            <span class="font-body-md text-on-surface font-bold">Padrões de Projeto</span>
            <span class="material-symbols-outlined text-on-surface-variant text-[18px] group-hover:text-primary transition-colors">arrow_drop_down</span>
          </div>
          <button class="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
            <span class="material-symbols-outlined text-[20px]">chevron_right</span>
          </button>
        </div>
        <div class="sticky top-0 bg-surface-container pb-sm border-b border-outline-variant/10 mb-sm flex justify-between items-center z-10">
          <h4 class="font-headline-md text-[18px] text-on-surface flex items-center gap-sm">
            <span class="material-symbols-outlined text-primary text-[20px]">edit_note</span>
            Anotações Escritas
          </h4>
          <div class="flex items-center gap-sm">
            <button class="text-on-surface-variant hover:text-primary transition-colors">
              <span class="material-symbols-outlined text-[18px]">edit</span>
            </button>
          </div>
          <button class="text-on-surface-variant hover:text-primary transition-colors ml-2">
            <span class="material-symbols-outlined text-[18px]">fullscreen</span>
          </button>
        </div>
        <div class="prose prose-invert prose-sm max-w-none font-body-md text-on-surface-variant">
          <p class="mb-4">Os padrões de projeto (Design Patterns) são soluções reutilizáveis para problemas comuns no desenvolvimento de software. Eles não são código pronto, mas templates de como resolver uma situação estrutural.</p>
          <h5 class="text-on-surface font-bold mt-4 mb-2">Categoria: Criacionais</h5>
          <ul class="list-disc pl-5 space-y-2 mb-4">
            <li class=""><strong class="text-primary">Singleton:</strong> Garante que uma classe tenha apenas uma instância e fornece um ponto global de acesso a ela. Útil para gerenciar conexões de banco de dados.</li>
            <li class=""><strong class="text-primary">Factory Method:</strong> Define uma interface para criar um objeto, mas deixa as subclasses decidirem qual classe instanciar.</li>
          </ul>
          <h5 class="text-on-surface font-bold mt-4 mb-2">Categoria: Estruturais</h5>
          <ul class="list-disc pl-5 space-y-2 mb-4">
            <li class=""><strong class="text-tertiary">Adapter:</strong> Permite que interfaces incompatíveis trabalhem juntas. Atua como um "wrapper" em torno de uma classe existente.</li>
            <li class=""><strong class="text-tertiary">Decorator:</strong> Adiciona responsabilidades a um objeto dinamicamente sem alterar sua estrutura básica.</li>
          </ul>
          <div class="bg-surface-container-highest p-sm rounded border-l-2 border-primary mt-4">
            <p class="text-sm italic m-0 text-on-surface">Nota: Lembrar de revisar as implementações práticas em Java no repositório principal antes da prova.</p>
          </div>
        </div>
      </div>
      <!-- Right: Mind Map View -->
      <div id="kb-container-map" class="flex-1 bg-surface-container rounded-lg border border-outline-variant/10 relative overflow-hidden flex items-center justify-center group">
        <div class="absolute top-md left-md right-md flex justify-between items-center z-10">
          <h4 class="font-headline-md text-[18px] text-on-surface flex items-center gap-sm bg-surface-container-highest px-sm py-xs rounded">
            <span class="material-symbols-outlined text-primary text-[20px]">account_tree</span>
            Visão Estrutural
          </h4>
          <div class="flex gap-xs">
            <button class="w-8 h-8 rounded bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary border border-outline-variant/20"><span class="material-symbols-outlined text-[16px]">zoom_in</span></button>
            <button class="w-8 h-8 rounded bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary border border-outline-variant/20"><span class="material-symbols-outlined text-[16px]">zoom_out</span></button>
          </div>
        </div>
        <!-- Decorative Map Placeholder -->
        <div class="w-full h-full p-xl flex items-center justify-center relative">
          <!-- Central Node -->
          <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-primary-container border-2 border-primary px-md py-sm rounded-lg shadow-[0_0_15px_rgba(255,82,82,0.2)] text-center w-32">
            <span class="font-bold text-on-surface text-sm block">Design Patterns</span>
          </div>
          <!-- Branch Lines (SVG) -->
          <svg class="absolute inset-0 w-full h-full opacity-30" pointer-events="none">
            <!-- Creational Branch -->
            <path class="text-primary" d="M 50% 50% Q 25% 30% 20% 30%" fill="none" stroke="currentColor" stroke-width="2"></path>
            <circle class="text-primary" cx="20%" cy="30%" fill="currentColor" r="4"></circle>
            <!-- Structural Branch -->
            <path class="text-tertiary" d="M 50% 50% Q 75% 30% 80% 30%" fill="none" stroke="currentColor" stroke-width="2"></path>
            <circle class="text-tertiary" cx="80%" cy="30%" fill="currentColor" r="4"></circle>
            <!-- Behavioral Branch -->
            <path class="text-error" d="M 50% 50% Q 50% 75% 50% 80%" fill="none" stroke="currentColor" stroke-width="2"></path>
            <circle class="text-error" cx="50%" cy="80%" fill="currentColor" r="4"></circle>
          </svg>
          <!-- Sub Nodes -->
          <div class="absolute top-[30%] left-[20%] transform -translate-x-1/2 -translate-y-1/2 z-10 bg-surface-container border border-primary/50 px-sm py-xs rounded text-center w-24">
            <span class="text-xs text-on-surface-variant block">Criacionais</span>
          </div>
          <div class="absolute top-[30%] left-[80%] transform -translate-x-1/2 -translate-y-1/2 z-10 bg-surface-container border border-tertiary/50 px-sm py-xs rounded text-center w-24">
            <span class="text-xs text-on-surface-variant block">Estruturais</span>
          </div>
          <div class="absolute top-[80%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-10 bg-surface-container border border-error/50 px-sm py-xs rounded text-center w-24">
            <span class="text-xs text-on-surface-variant block">Comportamentais</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
`;

export const initKnowledgeBase = () => {
  // Toggle Module Contents (Accordion)
  const moduleBtns = document.querySelectorAll('.kb-module-btn');
  moduleBtns.forEach(btn => {
    btn.addEventListener('click', (ev) => {
      const content = btn.nextElementSibling as HTMLElement;
      const icon = btn.querySelector('.kb-module-icon') as HTMLElement;
      if (content && content.classList.contains('kb-module-content')) {
        if (content.classList.contains('hidden')) {
          content.classList.remove('hidden');
          icon.style.transform = 'rotate(180deg)';
        } else {
          content.classList.add('hidden');
          icon.style.transform = 'rotate(0deg)';
        }
      }
    });
  });

  // Toggle Visibility of Notes and Mind Map
  const btnNotes = document.getElementById('kb-toggle-notes')!;
  const btnMap = document.getElementById('kb-toggle-map')!;
  const containerNotes = document.getElementById('kb-container-notes')!;
  const containerMap = document.getElementById('kb-container-map')!;

  let notesVisible = true;
  let mapVisible = true;

  const updateVisibility = () => {
    if (notesVisible) {
      containerNotes.classList.remove('hidden');
      btnNotes.classList.add('border-primary', 'text-primary');
      btnNotes.querySelector('span')!.textContent = 'visibility';
    } else {
      containerNotes.classList.add('hidden');
      btnNotes.classList.remove('border-primary', 'text-primary');
      btnNotes.querySelector('span')!.textContent = 'visibility_off';
    }

    if (mapVisible) {
      containerMap.classList.remove('hidden');
      btnMap.classList.add('border-primary', 'text-primary');
      btnMap.querySelector('span')!.textContent = 'visibility';
    } else {
      containerMap.classList.add('hidden');
      btnMap.classList.remove('border-primary', 'text-primary');
      btnMap.querySelector('span')!.textContent = 'visibility_off';
    }

    // Adjust width if only one is visible
    if (notesVisible && !mapVisible) {
      containerNotes.classList.remove('flex-1');
      containerNotes.classList.add('w-full');
    } else if (!notesVisible && mapVisible) {
      containerMap.classList.remove('flex-1');
      containerMap.classList.add('w-full');
    } else {
      containerNotes.classList.add('flex-1');
      containerNotes.classList.remove('w-full');
      containerMap.classList.add('flex-1');
      containerMap.classList.remove('w-full');
    }
  };

  btnNotes.addEventListener('click', () => {
    if (notesVisible && !mapVisible) return; // Prevent hiding both
    notesVisible = !notesVisible;
    updateVisibility();
  });

  btnMap.addEventListener('click', () => {
    if (!notesVisible && mapVisible) return; // Prevent hiding both
    mapVisible = !mapVisible;
    updateVisibility();
  });

  // Initialize with both visible (highlighted buttons)
  updateVisibility();
};
