import { API_BASE_URL } from '../../../shared/config';
import { topicExcalidraw } from './TopicExcalidrawMindMap';
import type { TopicMindmapState } from './TopicExcalidrawMindMap';

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

/* Fullscreen Excalidraw Map */
#kb-container-map.is-fullscreen {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
  max-width: 100vw !important;
  max-height: 100vh !important;
  z-index: 9999999 !important;
  margin: 0 !important;
  padding: 16px !important;
  border-radius: 0 !important;
  border: none !important;
  background-color: #121214 !important;
  box-shadow: none !important;
}
</style>
<section class="glass-panel rounded-xl p-lg flex flex-col lg:flex-row gap-lg h-[600px] relative z-10">
  <!-- Sidebar: Cursos -->
  <div id="kb-sidebar" class="relative w-full lg:w-64 flex-shrink-0 flex flex-col border-b lg:border-b-0 lg:border-r border-outline-variant/10 pb-md lg:pb-0 lg:pr-md overflow-hidden">
      <div class="flex items-center justify-between mb-md">
      <h3 class="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest sidebar-text">Módulos</h3>
      <div class="flex items-center gap-xs">
        <button id="kb-add-module-btn" class="text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center bg-surface-container-highest rounded-md w-7 h-7 cursor-pointer sidebar-actions shadow-sm" title="Criar Módulo">
          <span class="material-symbols-outlined text-[16px]">add</span>
        </button>
        <button id="kb-toggle-sidebar" class="text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center bg-surface-container-highest rounded-md w-7 h-7 cursor-pointer shadow-sm" title="Recolher/Expandir Sidebar">
          <span class="material-symbols-outlined text-[16px]">dock_to_right</span>
        </button>
      </div>
    </div>
    <div id="kb-modules-list" class="flex-1 overflow-y-auto space-y-2 pr-xs custom-scrollbar">
      <!-- Injected by JS -->
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
  </div>

  <!-- Main Content Area -->
  <div class="flex-1 flex flex-col overflow-hidden">
    <!-- Header -->
    <div class="flex justify-between items-center mb-md border-b border-outline-variant/10 pb-sm">
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
      <!-- Right: Mind Map View (Excalidraw) -->
      <div id="kb-container-map" class="flex-1 bg-surface-container rounded-lg border border-outline-variant/10 relative overflow-hidden flex flex-col group min-h-[350px] transition-all duration-300">
        <div class="p-sm flex justify-between items-center z-10 bg-surface-container-highest border-b border-outline-variant/10">
          <h4 class="font-headline-md text-sm text-on-surface flex items-center gap-xs">
            <span class="material-symbols-outlined text-primary text-[18px]">draw</span>
            <span>Mapa Mental</span>
            <span id="kb-map-topic-badge" class="text-xs text-primary font-bold bg-primary/10 px-2 py-0.5 rounded border border-primary/20 truncate max-w-[180px]">Tópico</span>
          </h4>
          <div class="flex items-center gap-2">
            <span id="kb-map-status" class="text-[11px] text-on-surface-variant font-mono">Excalidraw</span>
            <button id="kb-btn-fullscreen-map" class="text-on-surface-variant hover:text-primary transition-colors p-1 rounded-lg hover:bg-surface-container-highest cursor-pointer flex items-center justify-center" title="Expandir Mapa Mental em Tela Cheia">
              <span class="material-symbols-outlined text-[18px]" id="kb-icon-fullscreen-map">fullscreen</span>
            </button>
          </div>
        </div>
        <!-- Dynamic Excalidraw Canvas Container -->
        <div id="kb-mindmap-canvas" class="w-full flex-1 relative overflow-hidden bg-[#121214] theme--dark">
        </div>
      </div>
    </div>
  </div></section>
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
  
  if (notesArea) {
    notesArea.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.shiftKey) {
        if (e.key === '1' || e.code === 'Digit1') {
          e.preventDefault();
          document.execCommand('formatBlock', false, 'H1');
        } else if (e.key === '2' || e.code === 'Digit2') {
          e.preventDefault();
          document.execCommand('formatBlock', false, 'H2');
        } else if (e.key === '3' || e.code === 'Digit3') {
          e.preventDefault();
          document.execCommand('formatBlock', false, 'H3');
        }
      }
    });
  }
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
  const mapTopicBadge = document.getElementById('kb-map-topic-badge');

  let contentMindmap: { topics: { [topicKey: string]: TopicMindmapState } } = { topics: {} };
  let mindmapSaveTimeout: any = null;

  const saveCurrentMindmapDebounced = () => {
    clearTimeout(mindmapSaveTimeout);
    mindmapSaveTimeout = setTimeout(async () => {
      if (!activeContentId || !activeModuleId) return;
      const mod = modulesData.find(m => m.id === activeModuleId);
      const content = mod?.contents.find((c: any) => c.id === activeContentId);
      if (!content) return;

      const serialized = JSON.stringify(contentMindmap);
      content.mindmap = serialized;

      try {
        await fetch(`${API_BASE_URL}/api/studies/modules/contents`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: content.id,
            moduleId: content.moduleId,
            title: content.title,
            notes: content.notes || fullNotesHtml,
            mindmap: serialized
          })
        });
      } catch (e) {
        console.error('Erro ao salvar mapa mental no backend', e);
      }
    }, 1000);
  };

  if (canvasMindmap) {
    topicExcalidraw.init(canvasMindmap, (topicKey, data) => {
      if (!contentMindmap.topics) contentMindmap.topics = {};
      contentMindmap.topics[topicKey] = data;
      saveCurrentMindmapDebounced();
    });
  }

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
        const currentDraw = topicExcalidraw.getCurrentTopicData();
        if (currentDraw) {
          const prevKey = isViewingAllTopics ? 'topic_all' : `topic_${activeTopicIndex}`;
          if (!contentMindmap.topics) contentMindmap.topics = {};
          contentMindmap.topics[prevKey] = currentDraw;
        }

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
        const currentDraw = topicExcalidraw.getCurrentTopicData();
        if (currentDraw) {
          const prevKey = isViewingAllTopics ? 'topic_all' : `topic_${activeTopicIndex}`;
          if (!contentMindmap.topics) contentMindmap.topics = {};
          contentMindmap.topics[prevKey] = currentDraw;
        }

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
    if (!activeContentId) {
      if (mapTopicBadge) mapTopicBadge.textContent = 'Sem tópico';
      return;
    }

    const topicKey = isViewingAllTopics ? 'topic_all' : `topic_${activeTopicIndex}`;
    const topicTitle = isViewingAllTopics 
      ? `Todos os Tópicos (${currentTopics.length})` 
      : (currentTopics[activeTopicIndex]?.title || (currentTopics.length > 0 ? `Tópico ${activeTopicIndex + 1}` : 'Conteúdo'));

    if (mapTopicBadge) {
      mapTopicBadge.textContent = topicTitle;
    }

    if (!contentMindmap.topics) {
      contentMindmap.topics = {};
    }

    const savedData = contentMindmap.topics[topicKey] || null;
    topicExcalidraw.loadTopic(topicKey, topicTitle, savedData);
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
    
    // Parse content.mindmap
    try {
      if (content.mindmap && content.mindmap.trim() !== '') {
        const parsed = JSON.parse(content.mindmap);
        if (parsed && typeof parsed === 'object') {
          contentMindmap = parsed.topics ? parsed : { topics: parsed };
        } else {
          contentMindmap = { topics: {} };
        }
      } else {
        contentMindmap = { topics: {} };
      }
    } catch (e) {
      contentMindmap = { topics: {} };
    }

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
    // Save current Excalidraw topic drawing before switching
    const currentDraw = topicExcalidraw.getCurrentTopicData();
    if (currentDraw) {
      const prevKey = isViewingAllTopics ? 'topic_all' : `topic_${activeTopicIndex}`;
      if (!contentMindmap.topics) contentMindmap.topics = {};
      contentMindmap.topics[prevKey] = currentDraw;
    }

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
    // Save current Excalidraw topic drawing before switching
    const currentDraw = topicExcalidraw.getCurrentTopicData();
    if (currentDraw) {
      const prevKey = isViewingAllTopics ? 'topic_all' : `topic_${activeTopicIndex}`;
      if (!contentMindmap.topics) contentMindmap.topics = {};
      contentMindmap.topics[prevKey] = currentDraw;
    }

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

    // Save current active Excalidraw drawing
    const currentDraw = topicExcalidraw.getCurrentTopicData();
    if (currentDraw) {
      const topicKey = isViewingAllTopics ? 'topic_all' : `topic_${activeTopicIndex}`;
      if (!contentMindmap.topics) contentMindmap.topics = {};
      contentMindmap.topics[topicKey] = currentDraw;
    }
    const serializedMindmap = JSON.stringify(contentMindmap);
    content.mindmap = serializedMindmap;

    try {
      btnSaveNotes.innerHTML = `<span class="material-symbols-outlined text-[18px]">sync</span>`;
      await fetch(`${API_BASE_URL}/api/studies/modules/contents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: content.id,
          moduleId: content.moduleId,
          title: content.title,
          notes: fullNotesHtml,
          mindmap: serializedMindmap
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
        if (typeof (window as any).navigateToEditor === 'function') {
          (window as any).navigateToEditor(content.id, content.moduleId, mod.name, content.title, fullNotesHtml || content.notes, content.mindmap);
        }
      }
    });
  }

  // Fullscreen for Excalidraw Map (Body Portal)
  const btnFullscreenMap = document.getElementById('kb-btn-fullscreen-map');
  const iconFullscreenMap = document.getElementById('kb-icon-fullscreen-map');
  const containerMap = document.getElementById('kb-container-map');
  let mapPlaceholder: HTMLElement | null = null;

  let isMapFullscreen = false;
  const toggleMapFullscreen = () => {
    if (!containerMap) return;
    isMapFullscreen = !isMapFullscreen;

    if (isMapFullscreen) {
      // Create DOM placeholder before moving to body
      if (!mapPlaceholder) {
        mapPlaceholder = document.createElement('div');
        mapPlaceholder.id = 'kb-map-placeholder';
        mapPlaceholder.style.display = 'none';
      }
      containerMap.parentNode?.insertBefore(mapPlaceholder, containerMap);

      // Append directly to body so no parent overflow or backdrop-filter traps it
      document.body.appendChild(containerMap);

      containerMap.classList.remove('relative', 'flex-1', 'min-h-[350px]', 'rounded-lg');
      containerMap.classList.add('is-fullscreen');
      document.body.style.overflow = 'hidden';

      if (iconFullscreenMap) iconFullscreenMap.textContent = 'fullscreen_exit';
      if (btnFullscreenMap) btnFullscreenMap.setAttribute('title', 'Sair da Tela Cheia (Esc)');
    } else {
      containerMap.classList.remove('is-fullscreen');
      containerMap.classList.add('relative', 'flex-1', 'min-h-[350px]', 'rounded-lg');
      document.body.style.overflow = '';

      // Restore back into the original place
      if (mapPlaceholder && mapPlaceholder.parentNode) {
        mapPlaceholder.parentNode.insertBefore(containerMap, mapPlaceholder);
        mapPlaceholder.remove();
        mapPlaceholder = null;
      }
      if (iconFullscreenMap) iconFullscreenMap.textContent = 'fullscreen';
      if (btnFullscreenMap) btnFullscreenMap.setAttribute('title', 'Expandir Mapa Mental em Tela Cheia');
    }

    setTimeout(() => {
      topicExcalidraw.refresh();
    }, 80);
  };

  if (btnFullscreenMap) {
    btnFullscreenMap.addEventListener('click', toggleMapFullscreen);
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMapFullscreen) {
      toggleMapFullscreen();
    }
  });
  const renderModules = async () => {
    const list = document.getElementById('kb-modules-list');
    if (!list) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/studies/modules`);
      modulesData = await res.json();
      const data = modulesData;
      
      if (data.length === 0) {
        list.innerHTML = `<p class="text-xs text-on-surface-variant text-center mt-4">Nenhum módulo criado.</p>`;
        return;
      }

      list.innerHTML = data.map((mod: any) => `
        <div class="space-y-1">
          <div class="kb-module-btn w-full text-left p-sm rounded-lg hover:bg-surface-container-high text-on-surface flex items-center gap-sm transition-all group cursor-pointer" data-id="${mod.id}">
            <span class="material-symbols-outlined text-[18px] text-primary pointer-events-none">${mod.icon || 'folder'}</span>
            <span class="sidebar-text font-bold flex-1 pointer-events-none">${mod.name}</span>
            <button class="kb-module-edit-btn material-symbols-outlined text-[16px] opacity-0 group-hover:opacity-100 transition-opacity hover:text-primary z-10" data-id="${mod.id}" data-name="${mod.name}" data-icon="${mod.icon || 'folder'}" title="Configurações do Módulo">settings</button>
            <span class="kb-module-icon material-symbols-outlined text-[16px] ml-auto opacity-50 transition-transform pointer-events-none">expand_more</span>
          </div>
          <div class="kb-module-content pl-8 space-y-1 hidden">
            ${mod.contents && mod.contents.length > 0 ? mod.contents.map((c: any) => `
              <div class="kb-content-item w-full text-left p-sm rounded-lg hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface flex items-center gap-sm transition-all group cursor-pointer" data-id="${c.id}" data-module="${mod.id}">
                <span class="material-symbols-outlined text-[18px] pointer-events-none">description</span>
                <span class="sidebar-text truncate flex-1 pointer-events-none">${c.title}</span>
                <button class="kb-content-edit-btn material-symbols-outlined text-[16px] opacity-0 group-hover:opacity-100 transition-opacity hover:text-primary z-10" data-id="${c.id}" data-module="${mod.id}" data-title="${c.title}" title="Configurações do Conteúdo">settings</button>
              </div>
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
        btn.addEventListener('click', (ev) => {
          // Prevent expanding if clicked on edit button
          if ((ev.target as HTMLElement).classList.contains('kb-module-edit-btn')) return;
          
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

      const editBtns = document.querySelectorAll('.kb-module-edit-btn');
      editBtns.forEach(btn => {
        btn.addEventListener('click', (ev) => {
          ev.stopPropagation();
          const id = btn.getAttribute('data-id');
          const name = btn.getAttribute('data-name') || '';
          const icon = btn.getAttribute('data-icon') || '';
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
        btn.addEventListener('click', (ev) => {
          if ((ev.target as HTMLElement).classList.contains('kb-content-edit-btn')) return;
          const id = btn.getAttribute('data-id');
          const modId = btn.getAttribute('data-module');
          if (id && modId) loadContentData(parseInt(id), parseInt(modId));
        });
      });

      const contentEditBtns = document.querySelectorAll('.kb-content-edit-btn');
      contentEditBtns.forEach(btn => {
        btn.addEventListener('click', (ev) => {
          ev.stopPropagation();
          const id = btn.getAttribute('data-id');
          const modId = btn.getAttribute('data-module');
          const title = btn.getAttribute('data-title') || '';
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
      await fetch(`${API_BASE_URL}/api/studies/modules`, {
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
      await fetch(`${API_BASE_URL}/api/studies/modules/${iId.value}`, {
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

  const openContentModal = (window as any).openContentModal;

  btnCloseC.addEventListener('click', () => {
    cModal.classList.add('hidden');
    cModal.classList.remove('flex');
  });

  btnSaveC.addEventListener('click', async () => {
    btnSaveC.disabled = true;
    btnSaveC.textContent = 'Salvando...';
    try {
      await fetch(`${API_BASE_URL}/api/studies/modules/contents`, {
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
      await fetch(`${API_BASE_URL}/api/studies/modules/contents/${iCId.value}`, {
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

  // Toggle Visibility of Notes and Mind Map (if present)
  const btnNotes = document.getElementById('kb-toggle-notes');
  const btnMap = document.getElementById('kb-toggle-map');
  const containerNotes = document.getElementById('kb-container-notes');

  let notesVisible = true;
  let mapVisible = true;

  const updateVisibility = () => {
    if (!containerNotes || !containerMap) return;
    if (btnNotes) {
      if (notesVisible) {
        containerNotes.classList.remove('hidden');
        btnNotes.classList.add('border-primary', 'text-primary');
        const sp = btnNotes.querySelector('span');
        if (sp) sp.textContent = 'visibility';
      } else {
        containerNotes.classList.add('hidden');
        btnNotes.classList.remove('border-primary', 'text-primary');
        const sp = btnNotes.querySelector('span');
        if (sp) sp.textContent = 'visibility_off';
      }
    }

    if (btnMap) {
      if (mapVisible) {
        containerMap.classList.remove('hidden');
        btnMap.classList.add('border-primary', 'text-primary');
        const sp = btnMap.querySelector('span');
        if (sp) sp.textContent = 'visibility';
      } else {
        containerMap.classList.add('hidden');
        btnMap.classList.remove('border-primary', 'text-primary');
        const sp = btnMap.querySelector('span');
        if (sp) sp.textContent = 'visibility_off';
      }
    }
  };

  if (btnNotes) {
    btnNotes.addEventListener('click', () => {
      if (notesVisible && !mapVisible) return;
      notesVisible = !notesVisible;
      updateVisibility();
    });
  }

  if (btnMap) {
    btnMap.addEventListener('click', () => {
      if (!notesVisible && mapVisible) return;
      mapVisible = !mapVisible;
      updateVisibility();
    });
  }
};
