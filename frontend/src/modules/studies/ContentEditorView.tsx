import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { API_BASE_URL } from '../../shared/config';
import { 
  TEXT_COLORS, 
  HIGHLIGHT_COLORS, 
  FONT_SIZES,
  applyTextColor,
  applyHighlightColor,
  applyFontSize,
  saveSelection,
  restoreSelection
} from '../../shared/utils/EditorUtils';

interface LocationState {
  contentId: string;
  moduleId: string;
  moduleName: string;
  title: string;
  notes: string;
  mindmap?: string;
}

export const ContentEditorView: React.FC = () => {
  const { moduleSlug, contentSlug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;

  const [contentId, setContentId] = useState<string>(state?.contentId || '');
  const [moduleId, setModuleId] = useState<string>(state?.moduleId || '');
  const [topicTitle, setTopicTitle] = useState<string>(state?.title || 'Anotações');
  const [lastSavedText, setLastSavedText] = useState('Todas as alterações salvas');
  const [fontSize, setFontSize] = useState('16');
  const [fontFamily, setFontFamily] = useState('Plus Jakarta Sans');

  // Popover menus
  const [showTextColorMenu, setShowTextColorMenu] = useState(false);
  const [showHighlightMenu, setShowHighlightMenu] = useState(false);
  const [activeTextColor, setActiveTextColor] = useState('#FFFFFF');
  const [activeHighlightColor, setActiveHighlightColor] = useState('#FEF08A');

  // Outline (H1 topics)
  const [outlineItems, setOutlineItems] = useState<{ id: string; text: string }[]>([]);

  const editorRef = useRef<HTMLDivElement>(null);
  const saveTimeoutRef = useRef<any>(null);

  // Initial load
  useEffect(() => {
    const initContent = async () => {
      if (state && state.contentId) {
        setContentId(state.contentId);
        setModuleId(state.moduleId);
        setTopicTitle(state.title);
        if (editorRef.current) {
          editorRef.current.innerHTML = state.notes || '';
          updateOutline();
        }
      } else if (moduleSlug && contentSlug) {
        // Direct link load: Resolve slugs from API
        try {
          const res = await fetch(`${API_BASE_URL}/api/studies/modules`);
          if (res.ok) {
            const modules = await res.json();
            const mod = modules.find((m: any) => 
              m.name.toLowerCase().replace(/\s+/g, '-') === decodeURIComponent(moduleSlug)
            );
            if (mod) {
              const content = mod.contents?.find((c: any) => 
                c.title.toLowerCase().replace(/\s+/g, '-') === decodeURIComponent(contentSlug)
              );
              if (content) {
                setContentId(content.id);
                setModuleId(mod.id);
                setTopicTitle(content.title);
                if (editorRef.current) {
                  editorRef.current.innerHTML = content.notes || '';
                  updateOutline();
                }
                return;
              }
            }
          }
        } catch (e) {
          console.warn('Erro ao carregar conteúdo direto', e);
        }
        navigate('/estudos');
      }
    };

    initContent();
  }, [moduleSlug, contentSlug, state, navigate]);

  const updateOutline = () => {
    if (!editorRef.current) return;
    const h1s = editorRef.current.querySelectorAll('h1');
    const items: { id: string; text: string }[] = [];
    h1s.forEach((h1, index) => {
      const id = h1.id || `outline-h1-${index}`;
      h1.id = id;
      items.push({ id, text: h1.textContent?.trim() || `Tópico ${index + 1}` });
    });
    setOutlineItems(items);
  };

  const saveContentToBackend = async (html: string) => {
    if (!contentId || !moduleId) return;
    setLastSavedText('Salvando...');

    try {
      await fetch(`${API_BASE_URL}/api/studies/modules/contents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: contentId,
          moduleId,
          title: topicTitle,
          notes: html,
          mindmap: state?.mindmap
        })
      });
      const now = new Date();
      const timeStr = `${now.getHours()}:${now.getMinutes() < 10 ? '0' : ''}${now.getMinutes()}`;
      setLastSavedText(`Última edição às ${timeStr}`);
    } catch (e) {
      setLastSavedText('Erro ao salvar');
    }
  };

  const handleInput = () => {
    updateOutline();
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = setTimeout(() => {
        saveContentToBackend(html);
      }, 1500);
    }
  };

  const handleManualSave = () => {
    if (editorRef.current) {
      clearTimeout(saveTimeoutRef.current);
      saveContentToBackend(editorRef.current.innerHTML);
    }
  };

  const handleCreateNewTopic = () => {
    document.execCommand('formatBlock', false, 'H1');
    editorRef.current?.focus();
    handleInput();
  };

  const scrollToTopic = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-120px)] animate-fade-in relative z-20 bg-background">
      {/* Editor Header / Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 w-full max-w-6xl mx-auto px-4 mt-6">
        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={() => navigate('/estudos')}
            className="flex items-center justify-center p-2 rounded-full bg-surface-container-high hover:bg-surface-variant transition-colors border border-white/5 text-on-surface-variant hover:text-on-surface cursor-pointer"
            title="Voltar para Estudos"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
          <div>
            <h1 className="font-headline-md text-headline-md text-on-surface">{topicTitle}</h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Salvamento automático habilitado</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-body-sm text-body-sm text-on-surface-variant mr-2">{lastSavedText}</span>
          <button 
            type="button"
            onClick={handleManualSave}
            className="bg-secondary text-on-secondary font-body-sm text-body-sm px-4 py-2 rounded-md hover:bg-secondary-fixed transition-colors font-medium cursor-pointer"
          >
            Salvar
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-surface-container-highest border border-white/5 rounded-t-lg p-2 flex flex-wrap items-center gap-2 max-w-6xl mx-auto w-full px-4 sticky top-[64px] z-30 shadow-md">
        <button 
          type="button"
          onClick={handleCreateNewTopic}
          className="px-2.5 py-1.5 rounded bg-primary/15 hover:bg-primary/25 text-primary border border-primary/30 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer" 
          title="Criar Novo Tópico (H1)"
        >
          <span className="material-symbols-outlined text-[16px]">title</span> + Novo Tópico (H1)
        </button>

        <select 
          onChange={(e) => {
            document.execCommand('formatBlock', false, e.target.value);
            editorRef.current?.focus();
            handleInput();
          }}
          className="bg-surface-container-low text-on-surface text-sm rounded border border-white/5 px-3 py-1.5 outline-none cursor-pointer hover:border-white/10 transition-colors"
        >
          <option value="P">Texto Normal</option>
          <option value="H1">Título 1 (H1)</option>
          <option value="H2">Título 2 (H2)</option>
          <option value="H3">Título 3 (H3)</option>
        </select>

        <select 
          value={fontFamily}
          onChange={(e) => {
            setFontFamily(e.target.value);
            document.execCommand('fontName', false, e.target.value);
            editorRef.current?.focus();
          }}
          className="bg-surface-container-low text-on-surface text-sm rounded border border-white/5 px-3 py-1.5 outline-none cursor-pointer hover:border-white/10 transition-colors"
        >
          <option value="Plus Jakarta Sans">Fonte Principal</option>
          <option value="Hanken Grotesk">Fonte Título</option>
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
          <option value="Verdana">Verdana</option>
          <option value="Georgia">Georgia</option>
          <option value="Tahoma">Tahoma</option>
          <option value="Trebuchet MS">Trebuchet MS</option>
          <option value="monospace">Monoespaçada</option>
        </select>
        
        {/* Tamanho da Fonte */}
        <div className="flex items-center bg-surface-container-low border border-white/5 rounded px-1 py-0.5">
          <button 
            type="button" 
            onClick={(e) => {
              e.preventDefault();
              saveSelection();
              const current = parseInt(fontSize, 10) || 16;
              const prevSizes = FONT_SIZES.filter(s => s < current);
              const newSize = prevSizes.length > 0 ? prevSizes[prevSizes.length - 1] : FONT_SIZES[0];
              setFontSize(newSize.toString());
              applyFontSize(newSize);
            }}
            className="w-6 h-6 rounded hover:bg-white/10 text-on-surface-variant hover:text-on-surface flex items-center justify-center font-bold text-xs transition-colors cursor-pointer" 
            title="Diminuir tamanho"
          >
            -
          </button>
          <select 
            value={fontSize}
            onChange={(e) => {
              setFontSize(e.target.value);
              applyFontSize(e.target.value);
            }}
            className="bg-transparent text-on-surface text-xs font-mono outline-none cursor-pointer text-center px-1"
          >
            {FONT_SIZES.map(s => (
              <option key={s} value={s}>{s} px</option>
            ))}
          </select>
          <button 
            type="button" 
            onClick={(e) => {
              e.preventDefault();
              saveSelection();
              const current = parseInt(fontSize, 10) || 16;
              const nextSizes = FONT_SIZES.filter(s => s > current);
              const newSize = nextSizes.length > 0 ? nextSizes[0] : FONT_SIZES[FONT_SIZES.length - 1];
              setFontSize(newSize.toString());
              applyFontSize(newSize);
            }}
            className="w-6 h-6 rounded hover:bg-white/10 text-on-surface-variant hover:text-on-surface flex items-center justify-center font-bold text-xs transition-colors cursor-pointer" 
            title="Aumentar tamanho"
          >
            +
          </button>
        </div>
        
        <div className="w-px h-6 bg-white/10 mx-1" />
        
        <button 
          type="button"
          className="p-1.5 rounded hover:bg-surface-variant text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer" 
          title="Negrito" 
          onMouseDown={(e) => { e.preventDefault(); document.execCommand('bold'); }}
        >
          <span className="material-symbols-outlined text-[20px]">format_bold</span>
        </button>
        <button 
          type="button"
          className="p-1.5 rounded hover:bg-surface-variant text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer" 
          title="Itálico" 
          onMouseDown={(e) => { e.preventDefault(); document.execCommand('italic'); }}
        >
          <span className="material-symbols-outlined text-[20px]">format_italic</span>
        </button>
        <button 
          type="button"
          className="p-1.5 rounded hover:bg-surface-variant text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer" 
          title="Sublinhado" 
          onMouseDown={(e) => { e.preventDefault(); document.execCommand('underline'); }}
        >
          <span className="material-symbols-outlined text-[20px]">format_underlined</span>
        </button>
        <button 
          type="button"
          className="p-1.5 rounded hover:bg-surface-variant text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer" 
          title="Riscado" 
          onMouseDown={(e) => { e.preventDefault(); document.execCommand('strikeThrough'); }}
        >
          <span className="material-symbols-outlined text-[20px]">strikethrough_s</span>
        </button>
        
        <div className="w-px h-6 bg-white/10 mx-1" />
        
        {/* Cor da Letra Popover */}
        <div className="relative inline-block text-left">
          <button 
            type="button" 
            onClick={() => setShowTextColorMenu(prev => !prev)}
            className="px-1.5 py-1 rounded hover:bg-surface-variant text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-1 cursor-pointer" 
            title="Cor da Letra"
          >
            <span className="material-symbols-outlined text-[18px]">format_color_text</span>
            <span className="w-3.5 h-1 rounded-sm inline-block -mt-0.5 border border-white/20" style={{ backgroundColor: activeTextColor }} />
            <span className="material-symbols-outlined text-[14px]">arrow_drop_down</span>
          </button>

          {showTextColorMenu && (
            <div className="absolute top-full left-0 mt-1 z-50 bg-[#1e1e24] border border-white/10 rounded-xl p-3 shadow-2xl min-w-[210px] backdrop-blur-md">
              <div className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">Cor da Letra</div>
              <div className="grid grid-cols-5 gap-1.5 mb-3">
                {TEXT_COLORS.map(c => (
                  <button 
                    key={c.value}
                    type="button" 
                    onClick={() => {
                      setActiveTextColor(c.value);
                      applyTextColor(c.value);
                      setShowTextColorMenu(false);
                    }}
                    className={`w-7 h-7 rounded-lg border ${c.border} hover:scale-110 active:scale-95 transition-transform flex items-center justify-center cursor-pointer shadow-sm`} 
                    style={{ backgroundColor: c.value }} 
                    title={c.label} 
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Marca Texto Popover */}
        <div className="relative inline-block text-left ml-1">
          <button 
            type="button" 
            onClick={() => setShowHighlightMenu(prev => !prev)}
            className="px-1.5 py-1 rounded hover:bg-surface-variant text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-1 cursor-pointer" 
            title="Marca Texto"
          >
            <span className="material-symbols-outlined text-[18px]">format_ink_highlighter</span>
            <span className="w-3.5 h-1 rounded-sm inline-block -mt-0.5 border border-white/20" style={{ backgroundColor: activeHighlightColor }} />
            <span className="material-symbols-outlined text-[14px]">arrow_drop_down</span>
          </button>

          {showHighlightMenu && (
            <div className="absolute top-full left-0 mt-1 z-50 bg-[#1e1e24] border border-white/10 rounded-xl p-3 shadow-2xl min-w-[210px] backdrop-blur-md">
              <div className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">Marca Texto</div>
              <button 
                type="button" 
                onClick={() => {
                  applyHighlightColor('transparent');
                  setShowHighlightMenu(false);
                }}
                className="w-full mb-2.5 py-1 px-2 rounded-lg bg-surface-container-high hover:bg-surface-variant text-xs text-on-surface flex items-center justify-center gap-1.5 border border-white/5 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px] text-error">format_color_reset</span>
                <span>Sem Marcação</span>
              </button>
              <div className="grid grid-cols-5 gap-1.5 mb-3">
                {HIGHLIGHT_COLORS.map(c => (
                  <button 
                    key={c.value}
                    type="button" 
                    onClick={() => {
                      setActiveHighlightColor(c.value);
                      applyHighlightColor(c.value);
                      setShowHighlightMenu(false);
                    }}
                    className="w-7 h-7 rounded-lg border border-white/10 hover:scale-110 active:scale-95 transition-transform flex items-center justify-center cursor-pointer shadow-sm" 
                    style={{ backgroundColor: c.value }} 
                    title={c.label} 
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="w-px h-6 bg-white/10 mx-1" />
        
        <button 
          type="button"
          className="p-1.5 rounded hover:bg-surface-variant text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer" 
          onMouseDown={(e) => { e.preventDefault(); document.execCommand('justifyLeft'); }}
        >
          <span className="material-symbols-outlined text-[20px]">format_align_left</span>
        </button>
        <button 
          type="button"
          className="p-1.5 rounded hover:bg-surface-variant text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer" 
          onMouseDown={(e) => { e.preventDefault(); document.execCommand('justifyCenter'); }}
        >
          <span className="material-symbols-outlined text-[20px]">format_align_center</span>
        </button>
        <button 
          type="button"
          className="p-1.5 rounded hover:bg-surface-variant text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer" 
          onMouseDown={(e) => { e.preventDefault(); document.execCommand('justifyRight'); }}
        >
          <span className="material-symbols-outlined text-[20px]">format_align_right</span>
        </button>
        
        <div className="w-px h-6 bg-white/10 mx-1" />
        
        <button 
          type="button"
          className="p-1.5 rounded hover:bg-surface-variant text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer" 
          onMouseDown={(e) => { e.preventDefault(); document.execCommand('insertUnorderedList'); }}
        >
          <span className="material-symbols-outlined text-[20px]">format_list_bulleted</span>
        </button>
        <button 
          type="button"
          className="p-1.5 rounded hover:bg-surface-variant text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer" 
          onMouseDown={(e) => { e.preventDefault(); document.execCommand('insertOrderedList'); }}
        >
          <span className="material-symbols-outlined text-[20px]">format_list_numbered</span>
        </button>
      </div>

      {/* Document Canvas */}
      <div className="bg-surface-variant editor-canvas rounded-b-lg border-x border-b border-white/5 flex-grow w-full max-w-6xl mx-auto p-8 md:p-16 relative shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] mb-12">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[200px] bg-secondary/5 blur-[80px] pointer-events-none" />
        <div 
          ref={editorRef}
          id="editor-rich-textarea" 
          contentEditable 
          suppressContentEditableWarning
          spellCheck="false" 
          onInput={handleInput}
          className="rich-text-content w-full h-full min-h-[500px] outline-none text-on-surface-variant font-body-md leading-relaxed prose prose-invert prose-sm max-w-none"
        />
      </div>

      {/* Floating Topic Outline */}
      {outlineItems.length > 0 && (
        <div className="fixed right-4 md:right-8 top-32 z-40 group flex flex-col items-end">
          <div className="flex flex-col gap-1.5 items-end p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-all duration-200" title="Tópicos do Documento">
            <span className="w-6 h-[2.5px] bg-on-surface-variant/70 rounded-full transition-all group-hover:bg-primary" />
            <span className="w-4 h-[2.5px] bg-on-surface-variant/70 rounded-full transition-all group-hover:bg-primary" />
            <span className="w-6 h-[2.5px] bg-on-surface-variant/70 rounded-full transition-all group-hover:bg-primary" />
            <span className="w-5 h-[2.5px] bg-on-surface-variant/70 rounded-full transition-all group-hover:bg-primary" />
          </div>

          <div className="opacity-0 translate-x-3 scale-95 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-300 ease-out absolute right-0 top-0 bg-[#16161a]/95 backdrop-blur-md border border-white/10 rounded-xl p-2.5 shadow-2xl min-w-[200px] max-w-[280px] max-h-[70vh] overflow-y-auto custom-scrollbar">
            <div className="px-2 py-1 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest border-b border-white/5 mb-1.5 flex items-center justify-between">
              <span>Tópicos</span>
              <span className="text-[9px] font-normal text-on-surface-variant/60">H1</span>
            </div>
            <div className="space-y-1">
              {outlineItems.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToTopic(item.id)}
                  className="w-full text-left px-2 py-1 rounded text-xs text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-colors truncate block cursor-pointer"
                >
                  {idx + 1}. {item.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
