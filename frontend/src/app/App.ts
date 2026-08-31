import { MainLayout } from '../shared/layouts/MainLayout';
import { StudiesView, initStudiesView } from '../modules/studies/StudiesView';
import { ContentEditorView } from '../modules/studies/ContentEditorView';
import { initRichTextContextMenu } from '../shared/components/RichTextContextMenu';
import { initImageResizer } from '../shared/utils/ImageResizer';

export const App = () => {
  return `<div id="app-root"></div>`;
};

export const initApp = () => {
  const root = document.getElementById('app-root');
  if (!root) return;
  
  initRichTextContextMenu();
  initImageResizer();

  const renderCurrentRoute = async () => {
    const path = window.location.pathname;
    const parts = path.split('/').filter(Boolean);
    
    // Rota: /estudos/{module}/{content}
    if (parts.length >= 3 && parts[0] === 'estudos') {
      const modName = decodeURIComponent(parts[1]);
      const contentName = decodeURIComponent(parts[2]);
      
      if (history.state && history.state.contentId) {
        renderEditor(history.state.contentId, history.state.moduleId, history.state.title, history.state.notes);
      } else {
        // Direct link load: Fetch modules from API to resolve names to IDs
        try {
          const res = await fetch('http://localhost:8080/api/studies/modules');
          const modules = await res.json();
          const mod = modules.find((m: any) => m.name.toLowerCase().replace(/\\s+/g, '-') === modName);
          if (mod) {
            const content = mod.contents.find((c: any) => c.title.toLowerCase().replace(/\\s+/g, '-') === contentName);
            if (content) {
              renderEditor(content.id, mod.id, content.title, content.notes);
              return;
            }
          }
        } catch(e) {
          console.warn("API Error during direct load:", e);
        }
        navigateToStudies();
      }
    } else {
      renderStudies();
    }
  };

  const renderStudies = () => {
    root.innerHTML = MainLayout(StudiesView());
    initStudiesView();
  };

  const renderEditor = (contentId: number, moduleId: number, title: string, htmlContent: string) => {
    root.innerHTML = MainLayout(ContentEditorView());
    
    const titleEl = document.getElementById('editor-topic-title');
    if (titleEl) titleEl.textContent = title;
    
    const editorArea = document.getElementById('editor-rich-textarea');
    if (editorArea) {
      if (htmlContent && htmlContent.trim() !== '') {
        editorArea.innerHTML = htmlContent;
      } else {
        editorArea.innerHTML = `<h1>${title}</h1><p>Comece a digitar...</p>`;
      }
    }
  
    const closeBtn = document.getElementById('editor-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', () => {
      navigateToStudies();
    });
  
    const saveBtn = document.getElementById('editor-save-btn');
    const lastSaved = document.getElementById('editor-last-saved');
    
    const performSave = async () => {
      if (!editorArea) return;
      if (saveBtn) saveBtn.textContent = 'Salvando...';
      try {
        await fetch('http://localhost:8080/api/studies/modules/contents', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: contentId,
            moduleId: moduleId,
            title: title,
            notes: editorArea.innerHTML,
            mindmap: ''
          })
        });
        if (lastSaved) {
          const now = new Date();
          const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          lastSaved.textContent = `Salvo às ${time}`;
        }
      } catch (e) {
        console.error('Erro ao salvar no editor completo', e);
      }
      if (saveBtn) saveBtn.textContent = 'Salvar';
    };

    if (saveBtn) {
      saveBtn.addEventListener('click', performSave);
    }
    
    // Auto-save logic
    if (editorArea) {
      let autoSaveTimeout: any;
      editorArea.addEventListener('input', () => {
        if (lastSaved) lastSaved.textContent = 'Salvando...';
        clearTimeout(autoSaveTimeout);
        autoSaveTimeout = setTimeout(performSave, 1500);
      });
    }
  };

  const navigateToStudies = () => {
    history.pushState(null, '', '/');
    renderStudies();
  };

  // Exposed globally for KnowledgeBaseArea
  (window as any).navigateToEditor = (contentId: number, moduleId: number, moduleName: string, title: string, htmlContent: string) => {
    const cleanMod = encodeURIComponent(moduleName.toLowerCase().replace(/\\s+/g, '-'));
    const cleanTitle = encodeURIComponent(title.toLowerCase().replace(/\\s+/g, '-'));
    history.pushState({ contentId, moduleId, title, notes: htmlContent }, '', `/estudos/${cleanMod}/${cleanTitle}`);
    renderEditor(contentId, moduleId, title, htmlContent);
  };

  window.addEventListener('popstate', renderCurrentRoute);

  // Initial load
  renderCurrentRoute();
};
