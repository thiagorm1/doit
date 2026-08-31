export const KnowledgeBaseArea = () => `
<style>
#kb-sidebar {
  transition: width 0.3s ease;
}
#kb-sidebar.collapsed {
  width: 40px !important;
  padding-right: 0 !important;
}
#kb-sidebar.collapsed .sidebar-text,
#kb-sidebar.collapsed .kb-module-icon,
#kb-sidebar.collapsed .sidebar-actions {
  display: none !important;
}
#kb-sidebar.collapsed .kb-module-content {
  display: none !important; /* Always hide inner items when collapsed */
}
#kb-sidebar.collapsed .kb-module-btn {
  justify-content: center;
  padding-left: 0;
  padding-right: 0;
}
</style>
<section class="glass-panel rounded-xl p-lg flex flex-col lg:flex-row gap-lg h-[600px] relative z-10">
  <!-- Sidebar: Cursos -->
  <div id="kb-sidebar" class="w-full lg:w-64 flex-shrink-0 flex flex-col border-b lg:border-b-0 lg:border-r border-outline-variant/10 pb-md lg:pb-0 lg:pr-md overflow-hidden">
      <div class="flex items-center justify-between mb-md">
      <h3 class="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest sidebar-text">Módulos</h3>
      <div class="flex gap-1 sidebar-actions">
        <button id="kb-add-module-btn" class="text-on-surface-variant hover:text-primary transition-colors w-7 h-7 flex items-center justify-center bg-surface-container rounded" title="Novo Módulo">
          <span class="material-symbols-outlined text-[16px]">add</span>
        </button>
      </div>
      <button id="kb-toggle-sidebar" class="text-on-surface-variant hover:text-primary transition-colors w-7 h-7 flex items-center justify-center ml-auto">
        <span class="material-symbols-outlined text-[20px]">side_navigation</span>
      </button>
    </div>
    <div class="flex-1 overflow-y-auto space-y-1 custom-scrollbar pr-xs">
      <div class="space-y-4" id="kb-modules-list">
        <!-- Modulos will be injected here via JS -->
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
        <span class="font-body-sm text-on-surface-variant mr-2" id="kb-current-topic-header">Selecione um Conteúdo</span>
      </div>
    </div>
    <!-- Side-by-Side View -->
    <div class="flex-1 flex flex-col md:flex-row gap-md overflow-hidden">
      <!-- Left: Written Notes -->
      <div id="kb-container-notes" class="flex-1 bg-surface-container rounded-lg border border-outline-variant/10 p-md overflow-y-auto custom-scrollbar relative flex flex-col">
        <!-- Topic Navigation Bar (Pill Bar as in Image) -->
        <div class="relative mb-md">
          <div class="bg-surface-container-high/80 border border-outline-variant/20 hover:border-primary/40 rounded-xl px-3 py-2 flex items-center justify-between transition-all shadow-sm">
            <!-- Left Chevron Arrow -->
            <button id="kb-prev-topic" class="w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-highest transition-all disabled:opacity-20 disabled:pointer-events-none cursor-pointer" title="Tópico Anterior">
              <span class="material-symbols-outlined text-[24px]">chevron_left</span>
            </button>

            <!-- Center Clickable Trigger for Dropdown -->
            <button id="kb-topic-dropdown-trigger" class="flex items-center justify-center gap-2 px-4 py-2 rounded-lg hover:bg-surface-container-highest transition-all cursor-pointer group max-w-[80%] min-w-0" title="Clique para selecionar ou ver todos os tópicos">
              <span class="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest text-xs md:text-sm font-bold shrink-0">TÓPICO:</span>
              <span id="kb-current-topic-display" class="font-headline-md text-on-surface font-bold text-base md:text-lg lg:text-xl truncate group-hover:text-primary transition-colors tracking-tight">Nenhum selecionado</span>
              <span id="kb-topic-dropdown-chevron" class="material-symbols-outlined text-[24px] text-on-surface-variant group-hover:text-primary transition-transform shrink-0">arrow_drop_down</span>
            </button>

            <!-- Right Chevron Arrow -->
            <button id="kb-next-topic" class="w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-highest transition-all disabled:opacity-20 disabled:pointer-events-none cursor-pointer" title="Próximo Tópico">
              <span class="material-symbols-outlined text-[24px]">chevron_right</span>
            </button>
          </div>

          <!-- Custom Dropdown Menu -->
          <div id="kb-topic-dropdown-menu" class="hidden absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-80 max-w-[95vw] bg-surface-container-highest border border-outline-variant/30 rounded-xl shadow-2xl z-50 p-2 max-h-64 overflow-y-auto custom-scrollbar backdrop-blur-md">
            <!-- Dynamic list injected by JS -->
          </div>
        </div>

        <div class="sticky top-0 bg-surface-container pb-sm border-b border-outline-variant/10 mb-sm flex justify-between items-center z-10">
          <h4 class="font-headline-md text-[18px] text-on-surface flex items-center gap-sm">
            <span class="material-symbols-outlined text-primary text-[20px]">edit_note</span>
            <span id="kb-current-topic-title">Anotações Escritas</span>
          </h4>
          <div class="flex items-center gap-sm">
            <button id="kb-btn-save-notes" class="text-on-surface-variant hover:text-primary transition-colors hidden" title="Salvar Anotações">
              <span class="material-symbols-outlined text-[18px]">save</span>
            </button>
            <button id="kb-btn-fullscreen-notes" class="text-on-surface-variant hover:text-primary transition-colors ml-2" title="Tela Cheia (Folha Única)">
              <span class="material-symbols-outlined text-[18px]">fullscreen</span>
            </button>
          </div>
        </div>
        <div class="flex-1 flex flex-col">
           <div id="kb-current-topic-notes" contenteditable="true" spellcheck="false" class="rich-text-content flex-1 w-full bg-transparent border-none outline-none resize-none prose prose-invert prose-sm max-w-none font-body-md text-on-surface-variant custom-scrollbar overflow-y-auto"></div>
        </div>
      </div>
      <!-- Right: Mind Map View -->
      <div id="kb-container-map" class="flex-1 bg-surface-container rounded-lg border border-outline-variant/10 relative overflow-hidden flex flex-col group">
        <div class="p-sm flex justify-between items-center z-10 bg-surface-container-highest border-b border-outline-variant/10">
          <h4 class="font-headline-md text-sm text-on-surface flex items-center gap-xs">
            <span class="material-symbols-outlined text-primary text-[18px]">account_tree</span>
            Visão Estrutural (Tópicos H1)
          </h4>
          <span id="kb-map-topics-count" class="text-xs text-on-surface-variant font-mono">0 tópicos</span>
        </div>
        <!-- Dynamic Map Canvas -->
        <div id="kb-mindmap-canvas" class="w-full flex-1 p-md flex items-center justify-center relative overflow-hidden">
          <div class="text-center text-body-sm text-on-surface-variant">Selecione um conteúdo para ver sua estrutura</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Config Module -->
  <div id="kb-module-modal" class="hidden absolute inset-0 z-50 bg-surface/95 backdrop-blur-md flex-col p-lg rounded-xl">
    <div class="flex justify-between items-center mb-6">
      <h3 id="kb-module-modal-title" class="text-title-md font-bold text-on-surface">Novo Módulo</h3>
      <button id="kb-module-modal-close" class="text-on-surface-variant hover:text-error transition-colors flex items-center justify-center bg-surface-container-highest rounded-full w-8 h-8 cursor-pointer shadow-sm">
        <span class="material-symbols-outlined text-[18px]">close</span>
      </button>
    </div>
    
    <div class="flex-1 overflow-y-auto space-y-4">
      <input type="hidden" id="kb-module-id" />
      <div class="flex flex-col gap-1.5">
        <label class="text-on-surface-variant text-body-sm font-medium">Nome do Módulo</label>
        <input type="text" id="kb-module-name" placeholder="Ex: Backend" class="w-full bg-surface-container border border-outline-variant/50 rounded-lg p-2.5 text-on-surface text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" />
      </div>
      <div class="flex flex-col gap-1.5">
        <label class="text-on-surface-variant text-body-sm font-medium">Ícone (Material Symbols)</label>
        <input type="text" id="kb-module-icon" placeholder="Ex: folder, terminal, code" class="w-full bg-surface-container border border-outline-variant/50 rounded-lg p-2.5 text-on-surface text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" value="folder" />
      </div>
      <div class="flex gap-2 mt-4">
        <button id="kb-module-delete" class="hidden flex-1 py-2.5 rounded-lg bg-error/20 text-error font-bold hover:bg-error hover:text-on-error transition-colors shadow-sm">Excluir</button>
        <button id="kb-module-save" class="flex-1 py-2.5 rounded-lg bg-primary text-on-secondary font-bold hover:bg-primary-fixed transition-colors shadow-md">Salvar</button>
      </div>
    </div>
  </div>

  <!-- Modal Config Content -->
  <div id="kb-content-modal" class="hidden absolute inset-0 z-50 bg-surface/95 backdrop-blur-md flex-col p-lg rounded-xl">
    <div class="flex justify-between items-center mb-6">
      <h3 id="kb-content-modal-title" class="text-title-md font-bold text-on-surface">Novo Conteúdo</h3>
      <button id="kb-content-modal-close" class="text-on-surface-variant hover:text-error transition-colors flex items-center justify-center bg-surface-container-highest rounded-full w-8 h-8 cursor-pointer shadow-sm">
        <span class="material-symbols-outlined text-[18px]">close</span>
      </button>
    </div>
    
    <div class="flex-1 overflow-y-auto space-y-4">
      <input type="hidden" id="kb-content-id" />
      <input type="hidden" id="kb-content-module-id" />
      <div class="flex flex-col gap-1.5">
        <label class="text-on-surface-variant text-body-sm font-medium">Tópico</label>
        <input type="text" id="kb-content-title" placeholder="Ex: Padrões de Projeto" class="w-full bg-surface-container border border-outline-variant/50 rounded-lg p-2.5 text-on-surface text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" />
      </div>
      <div class="flex gap-2 mt-4">
        <button id="kb-content-delete" class="hidden flex-1 py-2.5 rounded-lg bg-error/20 text-error font-bold hover:bg-error hover:text-on-error transition-colors shadow-sm">Excluir</button>
        <button id="kb-content-save" class="flex-1 py-2.5 rounded-lg bg-primary text-on-secondary font-bold hover:bg-primary-fixed transition-colors shadow-md">Salvar</button>
      </div>
    </div>
  </div>
</section>
`;

export interface TopicSection {
  title: string;
  html: string;
}

export function parseTopicsFromHtml(html: string, fallbackTitle: string = 'Tópico 1'): TopicSection[] {
  if (!html || html.trim() === '') {
    return [{ title: fallbackTitle, html: '' }];
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const nodes = Array.from(doc.body.childNodes);

  const sections: TopicSection[] = [];
  let currentTitle = '';
  let currentNodes: Node[] = [];
  let foundFirstH1 = false;

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (node.nodeType === Node.ELEMENT_NODE && (node as Element).tagName.toLowerCase() === 'h1') {
      if (foundFirstH1 || currentNodes.length > 0) {
        const tempDiv = document.createElement('div');
        currentNodes.forEach(n => tempDiv.appendChild(n.cloneNode(true)));
        sections.push({
          title: currentTitle || fallbackTitle,
          html: tempDiv.innerHTML
        });
        currentNodes = [];
      }
      foundFirstH1 = true;
      currentTitle = (node as Element).textContent?.trim() || `Tópico ${sections.length + 1}`;
      currentNodes.push(node);
    } else {
      currentNodes.push(node);
    }
  }

  if (currentNodes.length > 0) {
    const tempDiv = document.createElement('div');
    currentNodes.forEach(n => tempDiv.appendChild(n.cloneNode(true)));
    sections.push({
      title: currentTitle || (foundFirstH1 ? `Tópico ${sections.length + 1}` : fallbackTitle),
      html: tempDiv.innerHTML
    });
  }

  return sections.length > 0 ? sections : [{ title: fallbackTitle, html: '' }];
}

export const initKnowledgeBase = () => {
  // Toggle Sidebar
  const sidebar = document.getElementById('kb-sidebar');
  const btnSidebar = document.getElementById('kb-toggle-sidebar');
  
  if (sidebar && btnSidebar) {
    btnSidebar.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      // Change icon based on state
      const icon = btnSidebar.querySelector('span')!;
      if (sidebar.classList.contains('collapsed')) {
        icon.classList.add('text-primary');
      } else {
        icon.classList.remove('text-primary');
      }
    });
  }

  let modulesData: any[] = [];
  let activeContentId: number | null = null;
  let activeModuleId: number | null = null;

  // Topic & Editor State
  let currentTopics: TopicSection[] = [];
  let activeTopicIndex: number = 0;
  let isViewingAllTopics: boolean = false;
  let fullNotesHtml: string = '';

  const headerLabel = document.getElementById('kb-current-topic-header')!;
  const titleLabel = document.getElementById('kb-current-topic-title')!;
  const notesArea = document.getElementById('kb-current-topic-notes') as HTMLDivElement;
  const btnSaveNotes = document.getElementById('kb-btn-save-notes')!;
  const btnFullscreen = document.getElementById('kb-btn-fullscreen-notes')!;

  // Topic Navigation Controls (Matching UI Screenshot)
  const btnPrevTopic = document.getElementById('kb-prev-topic') as HTMLButtonElement;
  const btnNextTopic = document.getElementById('kb-next-topic') as HTMLButtonElement;
  const topicDropdownTrigger = document.getElementById('kb-topic-dropdown-trigger') as HTMLButtonElement;
  const topicDisplay = document.getElementById('kb-current-topic-display')!;
  const topicChevron = document.getElementById('kb-topic-dropdown-chevron')!;
  const topicDropdownMenu = document.getElementById('kb-topic-dropdown-menu')!;
  const canvasMindmap = document.getElementById('kb-mindmap-canvas');
  const mapTopicsCount = document.getElementById('kb-map-topics-count');

  const closeDropdown = () => {
    if (!topicDropdownMenu) return;
    topicDropdownMenu.classList.add('hidden');
    if (topicChevron) topicChevron.style.transform = 'rotate(0deg)';
  };

  const toggleDropdown = (e?: MouseEvent) => {
    if (e) e.stopPropagation();
    if (!topicDropdownMenu) return;
    const isHidden = topicDropdownMenu.classList.contains('hidden');
    if (isHidden) {
      topicDropdownMenu.classList.remove('hidden');
      if (topicChevron) topicChevron.style.transform = 'rotate(180deg)';
    } else {
      closeDropdown();
    }
  };

  if (topicDropdownTrigger) {
    topicDropdownTrigger.addEventListener('click', toggleDropdown);
  }

  document.addEventListener('click', (e: MouseEvent) => {
    if (topicDropdownTrigger && topicDropdownMenu) {
      if (!topicDropdownTrigger.contains(e.target as Node) && !topicDropdownMenu.contains(e.target as Node)) {
        closeDropdown();
      }
    }
  });

  const renderDropdownMenu = () => {
    if (!topicDropdownMenu) return;

    if (currentTopics.length === 0) {
      topicDropdownMenu.innerHTML = `<div class="p-3 text-xs text-on-surface-variant text-center">Nenhum tópico disponível</div>`;
      return;
    }

    const itemsHtml = currentTopics.map((t, idx) => {
      const isSelected = (!isViewingAllTopics && activeTopicIndex === idx);
      return `
        <button class="kb-dropdown-item w-full text-left px-3 py-2 rounded-lg text-xs md:text-sm flex items-center justify-between gap-2 transition-all cursor-pointer ${
          isSelected 
            ? 'bg-primary/20 text-primary font-bold border border-primary/30 shadow-sm' 
            : 'text-on-surface hover:bg-surface-container-high hover:text-primary'
        }" data-topic-index="${idx}">
          <span class="truncate">${idx + 1}. ${t.title || `Tópico ${idx + 1}`}</span>
          ${isSelected ? '<span class="material-symbols-outlined text-[16px] text-primary shrink-0">check</span>' : ''}
        </button>
      `;
    }).join('');

    topicDropdownMenu.innerHTML = `
      <div class="px-2 py-1 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Tópicos (H1)</div>
      <div class="space-y-1">
        ${itemsHtml}
      </div>
      <div class="my-1.5 border-t border-outline-variant/20"></div>
      <button id="kb-dropdown-item-all" class="w-full text-left px-3 py-2 rounded-lg text-xs md:text-sm flex items-center justify-between gap-2 transition-all cursor-pointer ${
        isViewingAllTopics 
          ? 'bg-primary/20 text-primary font-bold border border-primary/30 shadow-sm' 
          : 'text-on-surface hover:bg-surface-container-high hover:text-primary'
      }">
        <span class="flex items-center gap-2 truncate">
          <span class="material-symbols-outlined text-[16px] text-primary shrink-0">view_agenda</span>
          <span class="truncate">Ver Todos os Tópicos (${currentTopics.length})</span>
        </span>
        ${isViewingAllTopics ? '<span class="material-symbols-outlined text-[16px] text-primary shrink-0">check</span>' : ''}
      </button>
    `;

    // Dropdown items click listeners
    topicDropdownMenu.querySelectorAll('.kb-dropdown-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.getAttribute('data-topic-index') || '0');
        if (currentTopics[activeTopicIndex] && !isViewingAllTopics) {
          currentTopics[activeTopicIndex].html = notesArea.innerHTML;
        } else if (isViewingAllTopics) {
          fullNotesHtml = notesArea.innerHTML;
        }
        activeTopicIndex = idx;
        isViewingAllTopics = false;
        closeDropdown();
        renderCurrentTopicView();
      });
    });

    const btnAll = document.getElementById('kb-dropdown-item-all');
    if (btnAll) {
      btnAll.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentTopics[activeTopicIndex] && !isViewingAllTopics) {
          currentTopics[activeTopicIndex].html = notesArea.innerHTML;
          fullNotesHtml = currentTopics.map(t => t.html).join('');
        }
        isViewingAllTopics = true;
        closeDropdown();
        renderCurrentTopicView();
      });
    }
  };

  const renderMindMap = () => {
    if (!canvasMindmap) return;

    if (currentTopics.length === 0 || !activeContentId) {
      canvasMindmap.innerHTML = `<div class="text-center text-body-sm text-on-surface-variant">Selecione um conteúdo para ver sua estrutura</div>`;
      if (mapTopicsCount) mapTopicsCount.textContent = '0 tópicos';
      return;
    }

    if (mapTopicsCount) mapTopicsCount.textContent = `${currentTopics.length} tópico(s)`;

    const mod = modulesData.find(m => m.id === activeModuleId);
    const content = mod?.contents.find((c: any) => c.id === activeContentId);
    const mainTitle = content ? content.title : 'Conteúdo';

    const total = currentTopics.length;
    const radius = total <= 3 ? 32 : (total <= 6 ? 38 : 40);

    let nodesHtml = '';
    let svgPaths = '';

    currentTopics.forEach((t, i) => {
      const angle = (2 * Math.PI / total) * i - (Math.PI / 2);
      const x = 50 + radius * Math.cos(angle);
      const y = 50 + radius * Math.sin(angle);

      const isSelected = (!isViewingAllTopics && activeTopicIndex === i);
      const colorClass = isSelected 
        ? 'bg-primary text-on-secondary font-bold shadow-[0_0_12px_rgba(255,82,82,0.5)] scale-105 border-primary' 
        : 'bg-surface-container-high border-outline-variant/40 text-on-surface hover:border-primary/60 hover:text-primary';

      svgPaths += `<line x1="50%" y1="50%" x2="${x}%" y2="${y}%" stroke="${isSelected ? '#ff5252' : 'rgba(255,255,255,0.15)'}" stroke-width="${isSelected ? '2.5' : '1.5'}" stroke-dasharray="${isSelected ? 'none' : '3 3'}" />`;

      nodesHtml += `
        <button class="kb-map-topic-node absolute transform -translate-x-1/2 -translate-y-1/2 z-20 px-3 py-1.5 rounded-lg border text-xs max-w-[140px] truncate transition-all cursor-pointer ${colorClass}" style="left: ${x}%; top: ${y}%;" data-topic-index="${i}" title="${t.title}">
          ${i + 1}. ${t.title}
        </button>
      `;
    });

    canvasMindmap.innerHTML = `
      <svg class="absolute inset-0 w-full h-full pointer-events-none">
        ${svgPaths}
      </svg>
      <!-- Central Node -->
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-surface-container-highest border-2 border-primary/80 px-4 py-2 rounded-xl shadow-[0_0_20px_rgba(255,82,82,0.25)] text-center max-w-[160px] truncate">
        <span class="font-bold text-on-surface text-sm block truncate">${mainTitle}</span>
        <span class="text-[10px] text-primary font-mono">${total} tópico(s) H1</span>
      </div>
      ${nodesHtml}
    `;

    canvasMindmap.querySelectorAll('.kb-map-topic-node').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-topic-index') || '0');
        if (currentTopics[activeTopicIndex] && !isViewingAllTopics) {
          currentTopics[activeTopicIndex].html = notesArea.innerHTML;
        }
        activeTopicIndex = idx;
        isViewingAllTopics = false;
        renderCurrentTopicView();
      });
    });
  };

  const renderCurrentTopicView = () => {
    if (currentTopics.length === 0) {
      notesArea.innerHTML = '';
      titleLabel.textContent = 'Nenhum tópico';
      if (topicDisplay) topicDisplay.textContent = 'Nenhum selecionado';
      btnPrevTopic.disabled = true;
      btnNextTopic.disabled = true;
      renderDropdownMenu();
      renderMindMap();
      return;
    }

    if (isViewingAllTopics) {
      notesArea.innerHTML = fullNotesHtml;
      titleLabel.textContent = `Todos os Tópicos (${currentTopics.length})`;
      if (topicDisplay) topicDisplay.textContent = `Todos os Tópicos (${currentTopics.length})`;
      btnPrevTopic.disabled = true;
      btnNextTopic.disabled = true;
    } else {
      if (activeTopicIndex < 0) activeTopicIndex = 0;
      if (activeTopicIndex >= currentTopics.length) activeTopicIndex = currentTopics.length - 1;

      const topic = currentTopics[activeTopicIndex];
      notesArea.innerHTML = topic.html;
      const topicName = topic.title || `Tópico ${activeTopicIndex + 1}`;
      titleLabel.textContent = topicName;
      if (topicDisplay) topicDisplay.textContent = topicName;
      
      btnPrevTopic.disabled = (activeTopicIndex <= 0);
      btnNextTopic.disabled = (activeTopicIndex >= currentTopics.length - 1);
    }

    renderDropdownMenu();
    renderMindMap();
  };

  const loadContentData = (contentId: number, moduleId: number) => {
    activeContentId = contentId;
    activeModuleId = moduleId;
    const mod = modulesData.find(m => m.id === moduleId);
    if (!mod) return;
    const content = mod.contents.find((c: any) => c.id === contentId);
    if (!content) return;

    headerLabel.textContent = `Conteúdo: ${content.title}`;
    fullNotesHtml = (content.notes && !content.notes.includes('Escreva suas anotações aqui...')) ? content.notes : '';
    
    currentTopics = parseTopicsFromHtml(fullNotesHtml, content.title);
    activeTopicIndex = 0;
    isViewingAllTopics = false;

    renderCurrentTopicView();
    btnSaveNotes.classList.add('hidden');

    // Highlight selected item in sidebar
    document.querySelectorAll('.kb-content-item').forEach(el => {
      el.classList.remove('bg-surface-container-highest', 'border', 'border-primary/30');
      if (parseInt(el.getAttribute('data-id') || '0') === contentId) {
        el.classList.add('bg-surface-container-highest', 'border', 'border-primary/30');
      }
    });
  };

  // Prev / Next Button Listeners
  btnPrevTopic.addEventListener('click', () => {
    if (isViewingAllTopics) {
      isViewingAllTopics = false;
      activeTopicIndex = 0;
    } else if (activeTopicIndex > 0) {
      if (currentTopics[activeTopicIndex]) {
        currentTopics[activeTopicIndex].html = notesArea.innerHTML;
      }
      activeTopicIndex--;
    }
    renderCurrentTopicView();
  });

  btnNextTopic.addEventListener('click', () => {
    if (isViewingAllTopics) {
      isViewingAllTopics = false;
      activeTopicIndex = 0;
    } else if (activeTopicIndex < currentTopics.length - 1) {
      if (currentTopics[activeTopicIndex]) {
        currentTopics[activeTopicIndex].html = notesArea.innerHTML;
      }
      activeTopicIndex++;
    }
    renderCurrentTopicView();
  });

  notesArea.addEventListener('input', () => {
    if (activeContentId) {
      btnSaveNotes.classList.remove('hidden');
    }
  });

  const saveCurrentNotes = async () => {
    if (!activeContentId || !activeModuleId) return;
    const mod = modulesData.find(m => m.id === activeModuleId);
    const content = mod?.contents.find((c: any) => c.id === activeContentId);
    if (!content) return;

    if (isViewingAllTopics) {
      fullNotesHtml = notesArea.innerHTML;
    } else {
      if (currentTopics.length > 0 && activeTopicIndex >= 0 && activeTopicIndex < currentTopics.length) {
        currentTopics[activeTopicIndex].html = notesArea.innerHTML;
        fullNotesHtml = currentTopics.map(t => t.html).join('');
      } else {
        fullNotesHtml = notesArea.innerHTML;
      }
    }

    try {
      btnSaveNotes.innerHTML = `<span class="material-symbols-outlined text-[18px]">sync</span>`;
      await fetch('http://localhost:8080/api/studies/modules/contents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: content.id,
          moduleId: content.moduleId,
          title: content.title,
          notes: fullNotesHtml,
          mindmap: content.mindmap
        })
      });
      content.notes = fullNotesHtml;

      // Re-parse topics in case new H1s were introduced
      currentTopics = parseTopicsFromHtml(fullNotesHtml, content.title);
      renderCurrentTopicView();

      btnSaveNotes.classList.add('hidden');
      btnSaveNotes.innerHTML = `<span class="material-symbols-outlined text-[18px]">save</span>`;
    } catch (e) {
      alert("Erro ao salvar anotações");
      btnSaveNotes.innerHTML = `<span class="material-symbols-outlined text-[18px]">save</span>`;
    }
  };

  btnSaveNotes.addEventListener('click', saveCurrentNotes);

  if (btnFullscreen) {
    btnFullscreen.addEventListener('click', () => {
      if (!activeContentId || !activeModuleId) {
        alert('Selecione um conteúdo primeiro!');
        return;
      }
      const mod = modulesData.find(m => m.id === activeModuleId);
      const content = mod?.contents.find((c: any) => c.id === activeContentId);
      if (content && mod && typeof (window as any).navigateToEditor === 'function') {
        if (!isViewingAllTopics && currentTopics[activeTopicIndex]) {
          currentTopics[activeTopicIndex].html = notesArea.innerHTML;
          fullNotesHtml = currentTopics.map(t => t.html).join('');
          content.notes = fullNotesHtml;
        } else if (isViewingAllTopics) {
          fullNotesHtml = notesArea.innerHTML;
          content.notes = fullNotesHtml;
        }
        (window as any).navigateToEditor(content.id, content.moduleId, mod.name, content.title, fullNotesHtml || content.notes);
      }
    });
  }




  // Fetch and Render Modules
  const renderModules = async () => {
    const list = document.getElementById('kb-modules-list');
    if (!list) return;

    try {
      const res = await fetch('http://localhost:8080/api/studies/modules');
      modulesData = await res.json();
      const data = modulesData;
      
      if (data.length === 0) {
        list.innerHTML = `<p class="text-xs text-on-surface-variant text-center mt-4">Nenhum módulo criado.</p>`;
        return;
      }

      list.innerHTML = data.map((mod: any) => `
        <div class="space-y-1">
          <button class="kb-module-btn w-full text-left p-sm rounded-lg hover:bg-surface-container-high text-on-surface flex items-center gap-sm transition-all group" data-id="${mod.id}">
            <span class="material-symbols-outlined text-[18px] text-primary">${mod.icon || 'folder'}</span>
            <span class="sidebar-text font-bold">${mod.name}</span>
            <span class="kb-module-icon material-symbols-outlined text-[16px] ml-auto opacity-50 transition-transform">expand_more</span>
          </button>
          <div class="kb-module-content pl-8 space-y-1 hidden">
            ${mod.contents && mod.contents.length > 0 ? mod.contents.map((c: any) => `
              <button class="kb-content-item w-full text-left p-sm rounded-lg hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface flex items-center gap-sm transition-all" data-id="${c.id}" data-module="${mod.id}">
                <span class="material-symbols-outlined text-[18px]">description</span>
                <span class="sidebar-text truncate">${c.title}</span>
              </button>
            `).join('') : ''}
            <button class="kb-add-content-btn w-full text-left p-xs rounded-lg hover:bg-surface-container-high text-primary/70 hover:text-primary flex items-center gap-sm transition-all mt-2 border border-dashed border-primary/20" data-module="${mod.id}">
              <span class="material-symbols-outlined text-[14px] ml-1">add</span>
              <span class="sidebar-text text-xs">Novo Conteúdo</span>
            </button>
          </div>
        </div>
      `).join('');

      // Re-attach Accordion Listeners
      const moduleBtns = document.querySelectorAll('.kb-module-btn');
      moduleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
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
        
        // Add context menu to edit module
        btn.addEventListener('contextmenu', (ev) => {
          ev.preventDefault();
          const id = btn.getAttribute('data-id');
          const name = btn.querySelector('.sidebar-text')?.textContent || '';
          const icon = btn.querySelector('.text-primary')?.textContent || '';
          openModal(id, name, icon);
        });
      });

      // Add listeners for Content Create
      const addContentBtns = document.querySelectorAll('.kb-add-content-btn');
      addContentBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const modId = btn.getAttribute('data-module');
          if (modId) openContentModal(null, modId, '');
        });
      });

      // Add listeners for Content Edit / Select
      const contentItems = document.querySelectorAll('.kb-content-item');
      contentItems.forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          const modId = btn.getAttribute('data-module');
          if (id && modId) loadContentData(parseInt(id), parseInt(modId));
        });

        btn.addEventListener('contextmenu', (ev) => {
          ev.preventDefault();
          const id = btn.getAttribute('data-id');
          const modId = btn.getAttribute('data-module');
          const title = btn.querySelector('.sidebar-text')?.textContent || '';
          if (id && modId) openContentModal(id, modId, title);
        });
      });
      
      // If there's an active content, keep it highlighted
      if (activeContentId && activeModuleId) {
        loadContentData(activeContentId, activeModuleId);
      }
    } catch(e) {
      console.warn("API de Módulos indisponível", e);
      list.innerHTML = `<p class="text-xs text-error text-center mt-4">Erro ao carregar módulos.</p>`;
    }
  };

  const modal = document.getElementById('kb-module-modal')!;
  const btnClose = document.getElementById('kb-module-modal-close')!;
  const btnSave = document.getElementById('kb-module-save') as HTMLButtonElement;
  const btnDelete = document.getElementById('kb-module-delete') as HTMLButtonElement;
  const btnAdd = document.getElementById('kb-add-module-btn')!;
  
  const iId = document.getElementById('kb-module-id') as HTMLInputElement;
  const iName = document.getElementById('kb-module-name') as HTMLInputElement;
  const iIcon = document.getElementById('kb-module-icon') as HTMLInputElement;
  const title = document.getElementById('kb-module-modal-title')!;

  const openModal = (id?: string | null, name?: string, icon?: string) => {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    if (id) {
      title.textContent = 'Editar Módulo';
      iId.value = id;
      iName.value = name || '';
      iIcon.value = icon || 'folder';
      btnDelete.classList.remove('hidden');
    } else {
      title.textContent = 'Novo Módulo';
      iId.value = '';
      iName.value = '';
      iIcon.value = 'folder';
      btnDelete.classList.add('hidden');
    }
  };

  btnAdd.addEventListener('click', () => openModal());
  btnClose.addEventListener('click', () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  });

  btnSave.addEventListener('click', async () => {
    btnSave.disabled = true;
    btnSave.textContent = 'Salvando...';
    try {
      await fetch('http://localhost:8080/api/studies/modules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: iId.value ? parseInt(iId.value) : null,
          name: iName.value,
          icon: iIcon.value
        })
      });
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      await renderModules();
    } catch(e) {
      alert('Erro ao salvar módulo');
    }
    btnSave.disabled = false;
    btnSave.textContent = 'Salvar';
  });

  btnDelete.addEventListener('click', async () => {
    if(!iId.value) return;
    if(!confirm('Tem certeza que deseja excluir este módulo?')) return;
    
    btnDelete.disabled = true;
    btnDelete.textContent = 'Excluindo...';
    try {
      await fetch(`http://localhost:8080/api/studies/modules/${iId.value}`, {
        method: 'DELETE'
      });
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      await renderModules();
    } catch(e) {
      alert('Erro ao excluir módulo');
    }
    btnDelete.disabled = false;
    btnDelete.textContent = 'Excluir';
  });

  renderModules();

  // -------------------------------------------------------------
  // Content Modal Logic
  // -------------------------------------------------------------
  const cModal = document.getElementById('kb-content-modal')!;
  const btnCloseC = document.getElementById('kb-content-modal-close')!;
  const btnSaveC = document.getElementById('kb-content-save') as HTMLButtonElement;
  const btnDeleteC = document.getElementById('kb-content-delete') as HTMLButtonElement;
  
  const iCId = document.getElementById('kb-content-id') as HTMLInputElement;
  const iCModId = document.getElementById('kb-content-module-id') as HTMLInputElement;
  const iCTitle = document.getElementById('kb-content-title') as HTMLInputElement;
  const cTitle = document.getElementById('kb-content-modal-title')!;

  // @ts-ignore
  window.openContentModal = (id?: string | null, modId?: string, titleStr?: string) => {
    cModal.classList.remove('hidden');
    cModal.classList.add('flex');
    iCModId.value = modId || '';
    if (id) {
      cTitle.textContent = 'Editar Conteúdo';
      iCId.value = id;
      iCTitle.value = titleStr || '';
      btnDeleteC.classList.remove('hidden');
    } else {
      cTitle.textContent = 'Novo Conteúdo';
      iCId.value = '';
      iCTitle.value = '';
      btnDeleteC.classList.add('hidden');
    }
  };

  const openContentModal = window.openContentModal;

  btnCloseC.addEventListener('click', () => {
    cModal.classList.add('hidden');
    cModal.classList.remove('flex');
  });

  btnSaveC.addEventListener('click', async () => {
    btnSaveC.disabled = true;
    btnSaveC.textContent = 'Salvando...';
    try {
      await fetch('http://localhost:8080/api/studies/modules/contents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: iCId.value ? parseInt(iCId.value) : null,
          moduleId: parseInt(iCModId.value),
          title: iCTitle.value,
          notes: '',
          mindmap: ''
        })
      });
      cModal.classList.add('hidden');
      cModal.classList.remove('flex');
      await renderModules();
    } catch(e) {
      alert('Erro ao salvar conteúdo');
    }
    btnSaveC.disabled = false;
    btnSaveC.textContent = 'Salvar';
  });

  btnDeleteC.addEventListener('click', async () => {
    if(!iCId.value) return;
    if(!confirm('Tem certeza que deseja excluir este conteúdo?')) return;
    
    btnDeleteC.disabled = true;
    btnDeleteC.textContent = 'Excluindo...';
    try {
      await fetch(`http://localhost:8080/api/studies/modules/contents/${iCId.value}`, {
        method: 'DELETE'
      });
      cModal.classList.add('hidden');
      cModal.classList.remove('flex');
      await renderModules();
    } catch(e) {
      alert('Erro ao excluir conteúdo');
    }
    btnDeleteC.disabled = false;
    btnDeleteC.textContent = 'Excluir';
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
