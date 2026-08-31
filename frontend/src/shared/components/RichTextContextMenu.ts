export const RichTextContextMenu = () => `
  <!-- Floating Context Menu for Editor -->
  <div id="kb-rich-text-context-menu" class="hidden fixed z-50 bg-surface-container-highest border border-outline-variant/30 rounded-lg shadow-xl p-2 flex-col gap-2 min-w-[200px]">
    <div class="flex items-center justify-between gap-1 border-b border-outline-variant/20 pb-2 mb-2">
      <button class="px-2 py-1 hover:bg-surface-variant rounded text-on-surface font-bold text-lg" onmousedown="event.preventDefault(); document.execCommand('formatBlock', false, 'H1')">H1</button>
      <button class="px-2 py-1 hover:bg-surface-variant rounded text-on-surface font-bold text-md" onmousedown="event.preventDefault(); document.execCommand('formatBlock', false, 'H2')">H2</button>
      <button class="px-2 py-1 hover:bg-surface-variant rounded text-on-surface font-bold text-sm" onmousedown="event.preventDefault(); document.execCommand('formatBlock', false, 'H3')">H3</button>
      <button class="px-2 py-1 hover:bg-surface-variant rounded text-on-surface text-sm" onmousedown="event.preventDefault(); document.execCommand('formatBlock', false, 'P')">P</button>
    </div>
    <div class="flex items-center justify-between gap-1 border-b border-outline-variant/20 pb-2 mb-2">
      <select title="Fonte" class="bg-surface-container-low text-on-surface text-xs rounded border border-outline-variant/30 px-1 py-1 w-full outline-none">
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
      <select title="Tamanho" class="bg-surface-container-low text-on-surface text-xs rounded border border-outline-variant/30 px-1 py-1 w-16 outline-none">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3" selected>3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
      </select>
    </div>
    <div class="flex items-center justify-between gap-1">
      <button class="p-1 hover:bg-surface-variant rounded text-on-surface flex items-center justify-center" onmousedown="event.preventDefault(); document.execCommand('bold')" title="Negrito"><span class="material-symbols-outlined text-[18px]">format_bold</span></button>
      <button class="p-1 hover:bg-surface-variant rounded text-on-surface flex items-center justify-center" onmousedown="event.preventDefault(); document.execCommand('italic')" title="Itálico"><span class="material-symbols-outlined text-[18px]">format_italic</span></button>
      <button class="p-1 hover:bg-surface-variant rounded text-on-surface flex items-center justify-center" onmousedown="event.preventDefault(); document.execCommand('underline')" title="Sublinhado"><span class="material-symbols-outlined text-[18px]">format_underlined</span></button>
      <div class="relative w-6 h-6 rounded overflow-hidden border border-outline-variant/30 cursor-pointer" title="Cor da Letra">
        <input type="color" value="#d3e4fe" class="absolute -top-2 -left-2 w-10 h-10 cursor-pointer" onmousedown="event.preventDefault()" onchange="document.execCommand('foreColor', false, this.value)">
      </div>
      <div class="w-px h-4 bg-outline-variant/30 mx-1"></div>
      <button class="p-1 hover:bg-surface-variant rounded text-primary flex items-center justify-center" onmousedown="event.preventDefault(); window.insertCodeBlock()" title="Inserir Bloco de Código">
        <span class="material-symbols-outlined text-[18px]">code</span>
      </button>
    </div>
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
      const fontSelect = ctxMenuGlobal.querySelector('select[title="Fonte"]') as HTMLSelectElement;
      const sizeSelect = ctxMenuGlobal.querySelector('select[title="Tamanho"]') as HTMLSelectElement;
      
      if (fontSelect) {
        fontSelect.addEventListener('change', function() {
          document.execCommand('fontName', false, this.value);
        });
      }
      if (sizeSelect) {
        sizeSelect.addEventListener('change', function() {
          document.execCommand('fontSize', false, this.value);
        });
      }
    }
  };

  // Observe DOM additions since the context menu might be added later or replaced
  const observer = new MutationObserver(() => attachSelectEvents());
  observer.observe(document.body, { childList: true, subtree: true });
  attachSelectEvents();

  (window as any).__globalContextMenuAttached = true;
};
