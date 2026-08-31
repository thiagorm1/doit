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
        <div class="mb-md bg-surface-container-high border border-outline-variant/20 rounded-lg p-sm flex items-center justify-between group cursor-pointer hover:border-primary/50 transition-all">
          <button class="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
            <span class="material-symbols-outlined text-[20px]">chevron_left</span>
          </button>
          <div class="flex items-center gap-xs">
            <span class="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">Tópico:</span>
            <span class="font-body-md text-on-surface font-bold" id="kb-current-topic-title">Nenhum selecionado</span>
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
            <button id="kb-btn-save-notes" class="text-on-surface-variant hover:text-primary transition-colors hidden" title="Salvar Anotações">
              <span class="material-symbols-outlined text-[18px]">save</span>
            </button>
          </div>
          <button id="kb-btn-fullscreen-notes" class="text-on-surface-variant hover:text-primary transition-colors ml-2" title="Tela Cheia">
            <span class="material-symbols-outlined text-[18px]">fullscreen</span>
          </button>
        </div>
        <div class="flex-1 flex flex-col">
           <div id="kb-current-topic-notes" contenteditable="true" spellcheck="false" class="rich-text-content flex-1 w-full bg-transparent border-none outline-none resize-none prose prose-invert prose-sm max-w-none font-body-md text-on-surface-variant custom-scrollbar overflow-y-auto" placeholder="Escreva suas anotações aqui..."></div>
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

  const headerLabel = document.getElementById('kb-current-topic-header')!;
  const titleLabel = document.getElementById('kb-current-topic-title')!;
  const notesArea = document.getElementById('kb-current-topic-notes') as HTMLDivElement;
  const btnSaveNotes = document.getElementById('kb-btn-save-notes')!;

  const loadContentData = (contentId: number, moduleId: number) => {
    activeContentId = contentId;
    activeModuleId = moduleId;
    const mod = modulesData.find(m => m.id === moduleId);
    if (!mod) return;
    const content = mod.contents.find((c: any) => c.id === contentId);
    if (!content) return;

    headerLabel.textContent = `Tópico: ${content.title}`;
    titleLabel.textContent = content.title;
    notesArea.innerHTML = content.notes || '<p class="text-on-surface-variant/50">Escreva suas anotações aqui...</p>';
    btnSaveNotes.classList.add('hidden'); // hide until edited

    // Highlight selected item in sidebar
    document.querySelectorAll('.kb-content-item').forEach(el => {
      el.classList.remove('bg-surface-container-highest', 'border', 'border-primary/30');
      if (parseInt(el.getAttribute('data-id') || '0') === contentId) {
        el.classList.add('bg-surface-container-highest', 'border', 'border-primary/30');
      }
    });
  };

  notesArea.addEventListener('input', () => {
    if (activeContentId) {
      btnSaveNotes.classList.remove('hidden');
    }
  });

  btnSaveNotes.addEventListener('click', async () => {
    if (!activeContentId || !activeModuleId) return;
    const mod = modulesData.find(m => m.id === activeModuleId);
    const content = mod?.contents.find((c: any) => c.id === activeContentId);
    if (!content) return;

    try {
      btnSaveNotes.innerHTML = `<span class="material-symbols-outlined text-[18px]">sync</span>`;
      await fetch('http://localhost:8080/api/studies/modules/contents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: content.id,
          moduleId: content.moduleId,
          title: content.title,
          notes: notesArea.innerHTML,
          mindmap: content.mindmap
        })
      });
      content.notes = notesArea.innerHTML;
      btnSaveNotes.classList.add('hidden');
      btnSaveNotes.innerHTML = `<span class="material-symbols-outlined text-[18px]">save</span>`;
    } catch (e) {
      alert("Erro ao salvar anotações");
      btnSaveNotes.innerHTML = `<span class="material-symbols-outlined text-[18px]">save</span>`;
    }
  });

  const btnFullscreen = document.getElementById('kb-btn-fullscreen-notes');
  if (btnFullscreen) {
    btnFullscreen.addEventListener('click', () => {
      if (!activeContentId || !activeModuleId) {
        alert('Selecione um tópico primeiro!');
        return;
      }
      const mod = modulesData.find(m => m.id === activeModuleId);
      const content = mod?.contents.find((c: any) => c.id === activeContentId);
      if (content && mod && typeof (window as any).navigateToEditor === 'function') {
        (window as any).navigateToEditor(content.id, content.moduleId, mod.name, content.title, content.notes);
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
