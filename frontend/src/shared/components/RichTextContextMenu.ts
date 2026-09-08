import { applyTextColor, applyHighlightColor, applyFontSize, saveSelection, restoreSelection, FONT_SIZES, detectCurrentFormatting } from '../utils/EditorUtils';

export const RichTextContextMenu = () => `
  <!-- Floating Context Menu for Editor (Vertical Layout) -->
  <div id="kb-rich-text-context-menu" class="hidden fixed z-50 bg-[#18181f] border border-white/10 rounded-xl shadow-2xl p-3 flex flex-col gap-2.5 min-w-[220px] max-w-[260px] backdrop-blur-md">
    
    <!-- Linha 1: Formato de Bloco (H1, H2, H3, P) -->
    <div class="flex flex-col gap-1">
      <span class="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Formato</span>
      <div class="grid grid-cols-4 gap-1">
        <button class="px-2 py-1 bg-surface-container-high hover:bg-surface-variant rounded text-on-surface font-bold text-xs flex items-center justify-center transition-colors cursor-pointer" onmousedown="event.preventDefault(); document.execCommand('formatBlock', false, 'H1'); document.dispatchEvent(new Event('selectionchange'));" title="Título 1">H1</button>
        <button class="px-2 py-1 bg-surface-container-high hover:bg-surface-variant rounded text-on-surface font-bold text-xs flex items-center justify-center transition-colors cursor-pointer" onmousedown="event.preventDefault(); document.execCommand('formatBlock', false, 'H2'); document.dispatchEvent(new Event('selectionchange'));" title="Título 2">H2</button>
        <button class="px-2 py-1 bg-surface-container-high hover:bg-surface-variant rounded text-on-surface font-bold text-xs flex items-center justify-center transition-colors cursor-pointer" onmousedown="event.preventDefault(); document.execCommand('formatBlock', false, 'H3'); document.dispatchEvent(new Event('selectionchange'));" title="Título 3">H3</button>
        <button class="px-2 py-1 bg-surface-container-high hover:bg-surface-variant rounded text-on-surface text-xs flex items-center justify-center transition-colors cursor-pointer" onmousedown="event.preventDefault(); document.execCommand('formatBlock', false, 'P'); document.dispatchEvent(new Event('selectionchange'));" title="Parágrafo Normal">P</button>
      </div>
    </div>

    <div class="w-full h-px bg-white/5"></div>

    <!-- Linha 2: Fonte (Família) -->
    <div class="flex flex-col gap-1">
      <span class="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Fonte</span>
      <select id="ctx-font-family" title="Fonte" class="bg-surface-container-low text-on-surface text-xs rounded-lg border border-white/10 px-2 py-1.5 w-full outline-none hover:border-white/20 transition-colors cursor-pointer">
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

    <div class="w-full h-px bg-white/5"></div>

    <!-- Linha 3: Tamanho da Fonte com Números -->
    <div class="flex flex-col gap-1">
      <span class="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Tamanho da Fonte</span>
      <div class="flex items-center gap-1.5">
        <button type="button" id="ctx-font-size-dec" class="w-7 h-7 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface flex items-center justify-center font-bold text-sm border border-white/5 transition-colors cursor-pointer" title="Diminuir tamanho">-</button>
        
        <div class="flex-1 relative">
          <select id="ctx-font-size-select" title="Tamanho da Fonte (px)" class="w-full bg-surface-container-low text-on-surface text-xs rounded-lg border border-white/10 px-2 py-1.5 outline-none hover:border-white/20 transition-colors cursor-pointer font-mono text-center">
            ${FONT_SIZES.map(s => `
              <option value="${s}" ${s === 16 ? 'selected' : ''}>${s} px</option>
            `).join('')}
          </select>
        </div>

        <button type="button" id="ctx-font-size-inc" class="w-7 h-7 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface flex items-center justify-center font-bold text-sm border border-white/5 transition-colors cursor-pointer" title="Aumentar tamanho">+</button>
      </div>
    </div>

    <div class="w-full h-px bg-white/5"></div>

    <!-- Linha 4: Estilos de Texto -->
    <div class="flex flex-col gap-1">
      <span class="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Estilo</span>
      <div class="grid grid-cols-4 gap-1">
        <button class="p-1.5 hover:bg-surface-variant bg-surface-container-high rounded-lg text-on-surface flex items-center justify-center border border-white/5 transition-colors cursor-pointer" onmousedown="event.preventDefault(); document.execCommand('bold')" title="Negrito">
          <span class="material-symbols-outlined text-[18px]">format_bold</span>
        </button>
        <button class="p-1.5 hover:bg-surface-variant bg-surface-container-high rounded-lg text-on-surface flex items-center justify-center border border-white/5 transition-colors cursor-pointer" onmousedown="event.preventDefault(); document.execCommand('italic')" title="Itálico">
          <span class="material-symbols-outlined text-[18px]">format_italic</span>
        </button>
        <button class="p-1.5 hover:bg-surface-variant bg-surface-container-high rounded-lg text-on-surface flex items-center justify-center border border-white/5 transition-colors cursor-pointer" onmousedown="event.preventDefault(); document.execCommand('underline')" title="Sublinhado">
          <span class="material-symbols-outlined text-[18px]">format_underlined</span>
        </button>
        <button class="p-1.5 hover:bg-surface-variant bg-surface-container-high rounded-lg text-on-surface flex items-center justify-center border border-white/5 transition-colors cursor-pointer" onmousedown="event.preventDefault(); document.execCommand('strikeThrough')" title="Riscado">
          <span class="material-symbols-outlined text-[18px]">strikethrough_s</span>
        </button>
      </div>
    </div>

    <div class="w-full h-px bg-white/5"></div>

    <!-- Linha 5: Cor da Letra -->
    <div class="flex items-center justify-between gap-2 p-1.5 rounded-lg bg-surface-container-high border border-white/5">
      <div class="flex items-center gap-1.5 text-xs text-on-surface">
        <span class="material-symbols-outlined text-[18px] text-on-surface-variant">format_color_text</span>
        <span>Cor da Letra</span>
      </div>
      <div class="relative w-6 h-6 rounded-md overflow-hidden border border-white/20 cursor-pointer" title="Escolher cor da letra">
        <input type="color" id="ctx-text-color" value="#ffffff" class="absolute -top-2 -left-2 w-10 h-10 cursor-pointer">
      </div>
    </div>

    <!-- Linha 6: Marca Texto -->
    <div class="flex items-center justify-between gap-2 p-1.5 rounded-lg bg-surface-container-high border border-white/5">
      <div class="flex items-center gap-1.5 text-xs text-on-surface">
        <span class="material-symbols-outlined text-[18px] text-on-surface-variant">format_ink_highlighter</span>
        <span>Marca Texto</span>
      </div>
      <div class="flex items-center gap-1.5">
        <button type="button" id="ctx-btn-remove-highlight" class="p-1 rounded hover:bg-white/10 text-error flex items-center justify-center transition-colors cursor-pointer" title="Sem marcação">
          <span class="material-symbols-outlined text-[16px]">format_color_reset</span>
        </button>
        <div class="relative w-6 h-6 rounded-md overflow-hidden border border-white/20 cursor-pointer" title="Escolher cor do marca-texto">
          <input type="color" id="ctx-highlight-color" value="#fef08a" class="absolute -top-2 -left-2 w-10 h-10 cursor-pointer">
        </div>
      </div>
    </div>

    <div class="w-full h-px bg-white/5"></div>

    <!-- Linha 7: Bloco de Código -->
    <button class="w-full py-1.5 px-2.5 hover:bg-primary/20 bg-primary/10 rounded-lg text-primary border border-primary/20 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer" onmousedown="event.preventDefault(); window.insertCodeBlock()" title="Inserir Bloco de Código">
      <span class="material-symbols-outlined text-[16px]">code</span>
      <span>Inserir Bloco de Código</span>
    </button>
  </div>
`;

(window as any).insertCodeBlock = () => {
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

export const initRichTextContextMenu = () => {
  if ((window as any).__globalContextMenuAttached) return;

  document.addEventListener('contextmenu', (e: MouseEvent) => {
    // Check if target is inside ANY of our editable areas
    const notesArea = document.getElementById('kb-current-topic-notes');
    const fullscreenArea = document.getElementById('editor-rich-textarea');
    
    const isTarget = (notesArea && (notesArea.contains(e.target as Node) || e.target === notesArea)) ||
                     (fullscreenArea && (fullscreenArea.contains(e.target as Node) || e.target === fullscreenArea));
    
    if (isTarget) {
      e.preventDefault();
      e.stopPropagation();
      saveSelection();
      detectCurrentFormatting();
      
      const ctxMenu = document.getElementById('kb-rich-text-context-menu');
      if (!ctxMenu) return;
      
      let x = e.clientX;
      let y = e.clientY;
      
      ctxMenu.classList.remove('hidden');
      ctxMenu.classList.add('flex');
      
      setTimeout(() => {
        const menuRect = ctxMenu.getBoundingClientRect();
        if (x + menuRect.width > window.innerWidth) x = window.innerWidth - menuRect.width - 10;
        if (y + menuRect.height > window.innerHeight) y = window.innerHeight - menuRect.height - 10;
        
        ctxMenu.style.top = `${y}px`;
        ctxMenu.style.left = `${x}px`;
      }, 0);
    }
  }, { capture: true });

  document.addEventListener('mousedown', (e) => {
    const ctxMenu = document.getElementById('kb-rich-text-context-menu');
    if (ctxMenu && e.button === 0 && !ctxMenu.contains(e.target as Node)) {
      ctxMenu.classList.add('hidden');
      ctxMenu.classList.remove('flex');
    }
  });

  const attachSelectEvents = () => {
    const ctxMenuGlobal = document.getElementById('kb-rich-text-context-menu');
    if (ctxMenuGlobal) {
      const fontSelect = ctxMenuGlobal.querySelector('#ctx-font-family') as HTMLSelectElement | null;
      const sizeSelect = ctxMenuGlobal.querySelector('#ctx-font-size-select') as HTMLSelectElement | null;
      const sizeDecBtn = ctxMenuGlobal.querySelector('#ctx-font-size-dec');
      const sizeIncBtn = ctxMenuGlobal.querySelector('#ctx-font-size-inc');
      
      if (fontSelect && !(fontSelect as any).__attached) {
        (fontSelect as any).__attached = true;
        fontSelect.addEventListener('change', function() {
          restoreSelection();
          document.execCommand('fontName', false, this.value);
          saveSelection();
        });
      }

      if (sizeSelect && !(sizeSelect as any).__attached) {
        (sizeSelect as any).__attached = true;
        sizeSelect.addEventListener('change', function() {
          applyFontSize(this.value);
        });
      }

      if (sizeDecBtn && sizeSelect && !(sizeDecBtn as any).__attached) {
        (sizeDecBtn as any).__attached = true;
        sizeDecBtn.addEventListener('click', (e) => {
          e.preventDefault();
          saveSelection();
          const current = parseInt(sizeSelect.value, 10) || 16;
          const prevSizes = FONT_SIZES.filter(s => s < current);
          const newSize = prevSizes.length > 0 ? prevSizes[prevSizes.length - 1] : FONT_SIZES[0];
          sizeSelect.value = newSize.toString();
          applyFontSize(newSize);
        });
      }

      if (sizeIncBtn && sizeSelect && !(sizeIncBtn as any).__attached) {
        (sizeIncBtn as any).__attached = true;
        sizeIncBtn.addEventListener('click', (e) => {
          e.preventDefault();
          saveSelection();
          const current = parseInt(sizeSelect.value, 10) || 16;
          const nextSizes = FONT_SIZES.filter(s => s > current);
          const newSize = nextSizes.length > 0 ? nextSizes[0] : FONT_SIZES[FONT_SIZES.length - 1];
          sizeSelect.value = newSize.toString();
          applyFontSize(newSize);
        });
      }

      const removeHighlightBtn = ctxMenuGlobal.querySelector('#ctx-btn-remove-highlight');
      if (removeHighlightBtn && !(removeHighlightBtn as any).__attached) {
        (removeHighlightBtn as any).__attached = true;
        removeHighlightBtn.addEventListener('click', (e) => {
          e.preventDefault();
          applyHighlightColor('transparent');
        });
      }

      const textColorInput = ctxMenuGlobal.querySelector('#ctx-text-color') as HTMLInputElement | null;
      const highlightColorInput = ctxMenuGlobal.querySelector('#ctx-highlight-color') as HTMLInputElement | null;

      if (textColorInput && !(textColorInput as any).__attached) {
        (textColorInput as any).__attached = true;
        textColorInput.addEventListener('pointerdown', () => saveSelection());
        textColorInput.addEventListener('mousedown', () => saveSelection());
        const handleColor = () => applyTextColor(textColorInput.value);
        textColorInput.addEventListener('input', handleColor);
        textColorInput.addEventListener('change', handleColor);
      }

      if (highlightColorInput && !(highlightColorInput as any).__attached) {
        (highlightColorInput as any).__attached = true;
        highlightColorInput.addEventListener('pointerdown', () => saveSelection());
        highlightColorInput.addEventListener('mousedown', () => saveSelection());
        const handleHighlight = () => applyHighlightColor(highlightColorInput.value);
        highlightColorInput.addEventListener('input', handleHighlight);
        highlightColorInput.addEventListener('change', handleHighlight);
      }
    }
  };

  // Observe DOM additions since the context menu might be added later or replaced
  const observer = new MutationObserver(() => attachSelectEvents());
  observer.observe(document.body, { childList: true, subtree: true });
  attachSelectEvents();

  (window as any).__globalContextMenuAttached = true;
};
