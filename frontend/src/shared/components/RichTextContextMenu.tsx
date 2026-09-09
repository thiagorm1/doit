import React, { useEffect, useState, useRef } from 'react';
import { 
  applyTextColor, 
  applyHighlightColor, 
  applyFontSize, 
  saveSelection, 
  restoreSelection, 
  FONT_SIZES, 
  detectCurrentFormatting 
} from '../utils/EditorUtils';

export const insertCodeBlock = () => {
  const selection = window.getSelection();
  const selectedText = selection ? selection.toString() : '';
  const content = selectedText.length > 0 ? selectedText.replace(/</g, "&lt;").replace(/>/g, "&gt;") : '';
  
  const codeHtml = `
    <div class="doit-code-block my-4 rounded-xl bg-[#1e1e1e] border border-white/10 font-mono text-sm shadow-lg overflow-hidden" style="page-break-inside: avoid;">
      <div class="flex justify-between items-center px-4 py-2 bg-[#2d2d30] border-b border-white/5" contenteditable="false">
        <select class="bg-transparent text-on-surface-variant text-xs outline-none cursor-pointer font-sans" onchange="this.parentElement.nextElementSibling.setAttribute('data-lang', this.value)">
          <option value="java">Java</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="sql">SQL</option>
          <option value="html">HTML/CSS</option>
          <option value="text">Texto Simples</option>
        </select>
        <div class="flex gap-2">
          <button class="text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center" onclick="navigator.clipboard.writeText(this.parentElement.parentElement.nextElementSibling.innerText); const t = this.innerHTML; this.innerHTML = '<span class=\\'material-symbols-outlined text-[14px]\\'>check</span>'; setTimeout(() => this.innerHTML = t, 2000);" title="Copiar código">
            <span class="material-symbols-outlined text-[14px]">content_copy</span>
          </button>
        </div>
      </div>
      <pre class="p-4 m-0 overflow-x-auto outline-none text-[#d4d4d4]" style="white-space: pre-wrap; min-height: 80px;" data-lang="java">${content}</pre>
    </div><p><br></p>
  `;
  document.execCommand('insertHTML', false, codeHtml.trim());
};

export const RichTextContextMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [fontSize, setFontSize] = useState('16');
  const [fontFamily, setFontFamily] = useState('Plus Jakarta Sans');
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (window as any).insertCodeBlock = insertCodeBlock;

    const handleContextMenu = (e: MouseEvent) => {
      const notesArea = document.getElementById('kb-current-topic-notes');
      const fullscreenArea = document.getElementById('editor-rich-textarea');
      
      const isTarget = (notesArea && (notesArea.contains(e.target as Node) || e.target === notesArea)) ||
                       (fullscreenArea && (fullscreenArea.contains(e.target as Node) || e.target === fullscreenArea)) ||
                       (e.target as HTMLElement).closest?.('.rich-text-content');
      
      if (isTarget) {
        e.preventDefault();
        e.stopPropagation();
        saveSelection();
        detectCurrentFormatting();

        let x = e.clientX;
        let y = e.clientY;
        const menuWidth = 240;
        const menuHeight = 350;

        if (x + menuWidth > window.innerWidth) x = window.innerWidth - menuWidth - 10;
        if (y + menuHeight > window.innerHeight) y = window.innerHeight - menuHeight - 10;

        setPos({ x, y });
        setIsOpen(true);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('contextmenu', handleContextMenu, { capture: true });
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu, { capture: true });
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      id="kb-rich-text-context-menu"
      style={{ top: `${pos.y}px`, left: `${pos.x}px` }}
      className="fixed z-[100] bg-[#18181f] border border-white/10 rounded-xl shadow-2xl p-3 flex flex-col gap-2.5 min-w-[220px] max-w-[260px] backdrop-blur-md"
    >
      {/* Linha 1: Formato de Bloco (H1, H2, H3, P) */}
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Formato</span>
        <div className="grid grid-cols-4 gap-1">
          <button 
            type="button"
            className="px-2 py-1 bg-surface-container-high hover:bg-surface-variant rounded text-on-surface font-bold text-xs flex items-center justify-center transition-colors cursor-pointer" 
            onMouseDown={(e) => {
              e.preventDefault();
              document.execCommand('formatBlock', false, 'H1');
              document.dispatchEvent(new Event('selectionchange'));
            }} 
            title="Título 1"
          >
            H1
          </button>
          <button 
            type="button"
            className="px-2 py-1 bg-surface-container-high hover:bg-surface-variant rounded text-on-surface font-bold text-xs flex items-center justify-center transition-colors cursor-pointer" 
            onMouseDown={(e) => {
              e.preventDefault();
              document.execCommand('formatBlock', false, 'H2');
              document.dispatchEvent(new Event('selectionchange'));
            }} 
            title="Título 2"
          >
            H2
          </button>
          <button 
            type="button"
            className="px-2 py-1 bg-surface-container-high hover:bg-surface-variant rounded text-on-surface font-bold text-xs flex items-center justify-center transition-colors cursor-pointer" 
            onMouseDown={(e) => {
              e.preventDefault();
              document.execCommand('formatBlock', false, 'H3');
              document.dispatchEvent(new Event('selectionchange'));
            }} 
            title="Título 3"
          >
            H3
          </button>
          <button 
            type="button"
            className="px-2 py-1 bg-surface-container-high hover:bg-surface-variant rounded text-on-surface text-xs flex items-center justify-center transition-colors cursor-pointer" 
            onMouseDown={(e) => {
              e.preventDefault();
              document.execCommand('formatBlock', false, 'P');
              document.dispatchEvent(new Event('selectionchange'));
            }} 
            title="Parágrafo Normal"
          >
            P
          </button>
        </div>
      </div>

      <div className="w-full h-px bg-white/5"></div>

      {/* Linha 2: Fonte */}
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Fonte</span>
        <select 
          value={fontFamily}
          onChange={(e) => {
            setFontFamily(e.target.value);
            restoreSelection();
            document.execCommand('fontName', false, e.target.value);
            saveSelection();
          }}
          title="Fonte" 
          className="bg-surface-container-low text-on-surface text-xs rounded-lg border border-white/10 px-2 py-1.5 w-full outline-none hover:border-white/20 transition-colors cursor-pointer"
        >
          <option value="Plus Jakarta Sans">Fonte Principal (Jakarta)</option>
          <option value="Hanken Grotesk">Fonte Título (Hanken)</option>
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
          <option value="Verdana">Verdana</option>
          <option value="Georgia">Georgia</option>
          <option value="Tahoma">Tahoma</option>
          <option value="Trebuchet MS">Trebuchet MS</option>
          <option value="monospace">Monoespaçada</option>
        </select>
      </div>

      <div className="w-full h-px bg-white/5"></div>

      {/* Linha 3: Tamanho da Fonte */}
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Tamanho da Fonte</span>
        <div className="flex items-center gap-1.5">
          <button 
            type="button" 
            className="w-7 h-7 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface flex items-center justify-center font-bold text-sm border border-white/5 transition-colors cursor-pointer" 
            title="Diminuir tamanho"
            onClick={(e) => {
              e.preventDefault();
              saveSelection();
              const current = parseInt(fontSize, 10) || 16;
              const prevSizes = FONT_SIZES.filter(s => s < current);
              const newSize = prevSizes.length > 0 ? prevSizes[prevSizes.length - 1] : FONT_SIZES[0];
              setFontSize(newSize.toString());
              applyFontSize(newSize);
            }}
          >
            -
          </button>
          
          <div className="flex-1 relative">
            <select 
              value={fontSize}
              onChange={(e) => {
                setFontSize(e.target.value);
                applyFontSize(e.target.value);
              }}
              title="Tamanho da Fonte (px)" 
              className="w-full bg-surface-container-low text-on-surface text-xs rounded-lg border border-white/10 px-2 py-1.5 outline-none hover:border-white/20 transition-colors cursor-pointer font-mono text-center"
            >
              {FONT_SIZES.map(s => (
                <option key={s} value={s}>{s} px</option>
              ))}
            </select>
          </div>

          <button 
            type="button" 
            className="w-7 h-7 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface flex items-center justify-center font-bold text-sm border border-white/5 transition-colors cursor-pointer" 
            title="Aumentar tamanho"
            onClick={(e) => {
              e.preventDefault();
              saveSelection();
              const current = parseInt(fontSize, 10) || 16;
              const nextSizes = FONT_SIZES.filter(s => s > current);
              const newSize = nextSizes.length > 0 ? nextSizes[0] : FONT_SIZES[FONT_SIZES.length - 1];
              setFontSize(newSize.toString());
              applyFontSize(newSize);
            }}
          >
            +
          </button>
        </div>
      </div>

      <div className="w-full h-px bg-white/5"></div>

      {/* Linha 4: Estilos de Texto */}
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Estilo</span>
        <div className="grid grid-cols-4 gap-1">
          <button 
            type="button"
            className="p-1.5 hover:bg-surface-variant bg-surface-container-high rounded-lg text-on-surface flex items-center justify-center border border-white/5 transition-colors cursor-pointer" 
            onMouseDown={(e) => { e.preventDefault(); document.execCommand('bold'); }} 
            title="Negrito"
          >
            <span className="material-symbols-outlined text-[18px]">format_bold</span>
          </button>
          <button 
            type="button"
            className="p-1.5 hover:bg-surface-variant bg-surface-container-high rounded-lg text-on-surface flex items-center justify-center border border-white/5 transition-colors cursor-pointer" 
            onMouseDown={(e) => { e.preventDefault(); document.execCommand('italic'); }} 
            title="Itálico"
          >
            <span className="material-symbols-outlined text-[18px]">format_italic</span>
          </button>
          <button 
            type="button"
            className="p-1.5 hover:bg-surface-variant bg-surface-container-high rounded-lg text-on-surface flex items-center justify-center border border-white/5 transition-colors cursor-pointer" 
            onMouseDown={(e) => { e.preventDefault(); document.execCommand('underline'); }} 
            title="Sublinhado"
          >
            <span className="material-symbols-outlined text-[18px]">format_underlined</span>
          </button>
          <button 
            type="button"
            className="p-1.5 hover:bg-surface-variant bg-surface-container-high rounded-lg text-on-surface flex items-center justify-center border border-white/5 transition-colors cursor-pointer" 
            onMouseDown={(e) => { e.preventDefault(); document.execCommand('strikeThrough'); }} 
            title="Riscado"
          >
            <span className="material-symbols-outlined text-[18px]">strikethrough_s</span>
          </button>
        </div>
      </div>

      <div className="w-full h-px bg-white/5"></div>

      {/* Linha 5: Cor da Letra */}
      <div className="flex items-center justify-between gap-2 p-1.5 rounded-lg bg-surface-container-high border border-white/5">
        <div className="flex items-center gap-1.5 text-xs text-on-surface">
          <span className="material-symbols-outlined text-[18px] text-on-surface-variant">format_color_text</span>
          <span>Cor da Letra</span>
        </div>
        <div className="relative w-6 h-6 rounded-md overflow-hidden border border-white/20 cursor-pointer" title="Escolher cor da letra">
          <input 
            type="color" 
            defaultValue="#ffffff" 
            className="absolute -top-2 -left-2 w-10 h-10 cursor-pointer"
            onPointerDown={() => saveSelection()}
            onMouseDown={() => saveSelection()}
            onInput={(e) => applyTextColor((e.target as HTMLInputElement).value)}
            onChange={(e) => applyTextColor((e.target as HTMLInputElement).value)}
          />
        </div>
      </div>

      {/* Linha 6: Marca Texto */}
      <div className="flex items-center justify-between gap-2 p-1.5 rounded-lg bg-surface-container-high border border-white/5">
        <div className="flex items-center gap-1.5 text-xs text-on-surface">
          <span className="material-symbols-outlined text-[18px] text-on-surface-variant">format_ink_highlighter</span>
          <span>Marca Texto</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button 
            type="button" 
            className="p-1 rounded hover:bg-white/10 text-error flex items-center justify-center transition-colors cursor-pointer" 
            title="Sem marcação"
            onClick={(e) => {
              e.preventDefault();
              applyHighlightColor('transparent');
            }}
          >
            <span className="material-symbols-outlined text-[16px]">format_color_reset</span>
          </button>
          <div className="relative w-6 h-6 rounded-md overflow-hidden border border-white/20 cursor-pointer" title="Escolher cor do marca-texto">
            <input 
              type="color" 
              defaultValue="#fef08a" 
              className="absolute -top-2 -left-2 w-10 h-10 cursor-pointer"
              onPointerDown={() => saveSelection()}
              onMouseDown={() => saveSelection()}
              onInput={(e) => applyHighlightColor((e.target as HTMLInputElement).value)}
              onChange={(e) => applyHighlightColor((e.target as HTMLInputElement).value)}
            />
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-white/5"></div>

      {/* Linha 7: Bloco de Código */}
      <button 
        type="button"
        className="w-full py-1.5 px-2.5 hover:bg-primary/20 bg-primary/10 rounded-lg text-primary border border-primary/20 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer" 
        onMouseDown={(e) => {
          e.preventDefault();
          insertCodeBlock();
        }} 
        title="Inserir Bloco de Código"
      >
        <span className="material-symbols-outlined text-[16px]">code</span>
        <span>Inserir Bloco de Código</span>
      </button>
    </div>
  );
};
