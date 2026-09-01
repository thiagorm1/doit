import { API_BASE_URL } from '../shared/config';
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
          const res = await fetch(`${API_BASE_URL}/api/studies/modules`);
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
      if (htmlContent && htmlContent.trim() !== '' && !htmlContent.includes('Escreva suas anotações aqui...')) {
        editorArea.innerHTML = htmlContent;
      } else {
        editorArea.innerHTML = `<h1>${title}</h1><p></p>`;
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
        await fetch(`${API_BASE_URL}/api/studies/modules/contents`, {
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

      // Keyboard shortcuts
      editorArea.addEventListener('keydown', (e) => {
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

    // Topic Outline / Listras navigation logic in Fullscreen
    const outlineList = document.getElementById('editor-outline-list');
    const outlineCount = document.getElementById('editor-outline-count');

    const updateOutline = () => {
      if (!editorArea || !outlineList) return;
      const headings = Array.from(editorArea.querySelectorAll('h1'));

      if (outlineCount) {
        outlineCount.textContent = headings.length.toString();
      }

      if (headings.length === 0) {
        outlineList.innerHTML = `<div class="px-2 py-1.5 text-xs text-on-surface-variant/60 italic">Nenhum tópico (H1)</div>`;
        return;
      }

      outlineList.innerHTML = headings.map((h, i) => {
        const anchorId = `editor-topic-h1-${i}`;
        h.setAttribute('id', anchorId);
        const headingText = h.textContent?.trim() || 'Sem título';
        return `
          <button class="editor-outline-item w-full text-left px-2.5 py-1.5 rounded-lg text-xs md:text-sm transition-all flex items-center justify-between gap-1 text-on-surface-variant hover:text-on-surface hover:bg-white/10 cursor-pointer" data-target="${anchorId}">
            <span class="truncate">${headingText}</span>
          </button>
        `;
      }).join('');

      outlineList.querySelectorAll('.editor-outline-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = btn.getAttribute('data-target');
          if (targetId) {
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
              const yOffset = -140; // offset for header + toolbar
              const y = targetEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
              window.scrollTo({ top: y, behavior: 'smooth' });
            }
          }
        });
      });

      highlightActiveHeading();
    };

    const highlightActiveHeading = () => {
      if (!editorArea || !outlineList) return;
      const headings = Array.from(editorArea.querySelectorAll('h1'));
      if (headings.length === 0) return;

      let activeIndex = 0;
      headings.forEach((h, i) => {
        const rect = h.getBoundingClientRect();
        if (rect.top <= 220) {
          activeIndex = i;
        }
      });

      const buttons = outlineList.querySelectorAll('.editor-outline-item');
      buttons.forEach((btn, i) => {
        if (i === activeIndex) {
          btn.classList.add('text-primary', 'font-bold', 'bg-white/5');
          btn.classList.remove('text-on-surface-variant');
        } else {
          btn.classList.remove('text-primary', 'font-bold', 'bg-white/5');
          btn.classList.add('text-on-surface-variant');
        }
      });
    };

    window.addEventListener('scroll', highlightActiveHeading, { passive: true });
    
    if (editorArea) {
      editorArea.addEventListener('input', updateOutline);
    }

    // Initial outline generation
    updateOutline();
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
