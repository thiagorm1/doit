export const ContentEditorView = () => `
<div class="flex flex-col w-full min-h-[calc(100vh-120px)] animate-fade-in relative z-20 bg-background">
  <!-- Editor Header / Controls -->
  <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 w-full max-w-6xl mx-auto px-4 mt-6">
    <div class="flex items-center gap-3">
      <button id="editor-close-btn" class="flex items-center justify-center p-2 rounded-full bg-surface-container-high hover:bg-surface-variant transition-colors border border-white/5 text-on-surface-variant hover:text-on-surface">
        <span class="material-symbols-outlined text-[20px]" data-icon="close">close</span>
      </button>
      <div>
        <h1 class="font-headline-md text-headline-md text-on-surface" id="editor-topic-title">Anotações Escritas</h1>
        <p class="font-body-sm text-body-sm text-on-surface-variant">Salvamento automático habilitado</p>
      </div>
    </div>
    <div class="flex items-center gap-3">
      <span class="font-body-sm text-body-sm text-on-surface-variant mr-2" id="editor-last-saved">Última edição agora</span>
      <button id="editor-save-btn" class="bg-secondary text-on-secondary font-body-sm text-body-sm px-4 py-2 rounded-md hover:bg-secondary-fixed transition-colors font-medium">
        Salvar
      </button>
    </div>
  </div>

  <!-- Toolbar -->
  <div class="bg-surface-container-highest border border-white/5 rounded-t-lg p-2 flex flex-wrap items-center gap-2 max-w-6xl mx-auto w-full px-4 sticky top-[64px] z-30 shadow-md">
    <button class="px-2.5 py-1.5 rounded bg-primary/15 hover:bg-primary/25 text-primary border border-primary/30 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer" title="Criar Novo Tópico (H1)" onmousedown="event.preventDefault(); document.execCommand('formatBlock', false, 'H1'); document.getElementById('editor-rich-textarea').focus();">
      <span class="material-symbols-outlined text-[16px]">title</span> + Novo Tópico (H1)
    </button>
    <select class="bg-surface-container-low text-on-surface text-sm rounded border border-white/5 px-3 py-1.5 outline-none cursor-pointer hover:border-white/10 transition-colors" onchange="document.execCommand('formatBlock', false, this.value); document.getElementById('editor-rich-textarea').focus();">
      <option value="P">Texto Normal</option>
      <option value="H1">Título 1 (H1 - Tópico)</option>
      <option value="H2">Título 2 (H2)</option>
      <option value="H3">Título 3 (H3)</option>
    </select>
    <select class="bg-surface-container-low text-on-surface text-sm rounded border border-white/5 px-3 py-1.5 outline-none cursor-pointer hover:border-white/10 transition-colors" onchange="document.execCommand('fontName', false, this.value); document.getElementById('editor-rich-textarea').focus();">
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
    
    <div class="w-px h-6 bg-white/10 mx-1"></div>
    
    <button class="p-1.5 rounded hover:bg-surface-variant text-on-surface-variant hover:text-on-surface transition-colors" title="Negrito" onmousedown="event.preventDefault(); document.execCommand('bold')">
      <span class="material-symbols-outlined text-[20px]" data-icon="format_bold">format_bold</span>
    </button>
    <button class="p-1.5 rounded hover:bg-surface-variant text-on-surface-variant hover:text-on-surface transition-colors" title="Itálico" onmousedown="event.preventDefault(); document.execCommand('italic')">
      <span class="material-symbols-outlined text-[20px]" data-icon="format_italic">format_italic</span>
    </button>
    <button class="p-1.5 rounded hover:bg-surface-variant text-on-surface-variant hover:text-on-surface transition-colors" title="Sublinhado" onmousedown="event.preventDefault(); document.execCommand('underline')">
      <span class="material-symbols-outlined text-[20px]" data-icon="format_underlined">format_underlined</span>
    </button>
    <button class="p-1.5 rounded hover:bg-surface-variant text-on-surface-variant hover:text-on-surface transition-colors" title="Riscado" onmousedown="event.preventDefault(); document.execCommand('strikeThrough')">
      <span class="material-symbols-outlined text-[20px]">strikethrough_s</span>
    </button>
    
    <div class="w-px h-6 bg-white/10 mx-1"></div>
    
    <div class="flex items-center gap-1" title="Cor da Letra">
      <span class="material-symbols-outlined text-[18px] text-on-surface-variant">format_color_text</span>
      <div class="relative w-5 h-5 rounded overflow-hidden border border-outline-variant/30 cursor-pointer">
        <input type="color" value="#d3e4fe" class="absolute -top-2 -left-2 w-10 h-10 cursor-pointer" onchange="document.execCommand('foreColor', false, this.value); document.getElementById('editor-rich-textarea').focus();">
      </div>
    </div>
    
    <div class="flex items-center gap-1 ml-2" title="Marca Texto">
      <span class="material-symbols-outlined text-[18px] text-on-surface-variant">format_ink_highlighter</span>
      <div class="relative w-5 h-5 rounded overflow-hidden border border-outline-variant/30 cursor-pointer">
        <input type="color" value="#eab308" class="absolute -top-2 -left-2 w-10 h-10 cursor-pointer" onchange="document.execCommand('backColor', false, this.value); document.getElementById('editor-rich-textarea').focus();">
      </div>
    </div>

    <div class="w-px h-6 bg-white/10 mx-1"></div>
    
    <button class="p-1.5 rounded hover:bg-surface-variant text-on-surface-variant hover:text-on-surface transition-colors" onmousedown="event.preventDefault(); document.execCommand('justifyLeft')">
      <span class="material-symbols-outlined text-[20px]" data-icon="format_align_left">format_align_left</span>
    </button>
    <button class="p-1.5 rounded hover:bg-surface-variant text-on-surface-variant hover:text-on-surface transition-colors" onmousedown="event.preventDefault(); document.execCommand('justifyCenter')">
      <span class="material-symbols-outlined text-[20px]" data-icon="format_align_center">format_align_center</span>
    </button>
    <button class="p-1.5 rounded hover:bg-surface-variant text-on-surface-variant hover:text-on-surface transition-colors" onmousedown="event.preventDefault(); document.execCommand('justifyRight')">
      <span class="material-symbols-outlined text-[20px]" data-icon="format_align_right">format_align_right</span>
    </button>
    
    <div class="w-px h-6 bg-white/10 mx-1"></div>
    
    <button class="p-1.5 rounded hover:bg-surface-variant text-on-surface-variant hover:text-on-surface transition-colors" onmousedown="event.preventDefault(); document.execCommand('insertUnorderedList')">
      <span class="material-symbols-outlined text-[20px]" data-icon="format_list_bulleted">format_list_bulleted</span>
    </button>
    <button class="p-1.5 rounded hover:bg-surface-variant text-on-surface-variant hover:text-on-surface transition-colors" onmousedown="event.preventDefault(); document.execCommand('insertOrderedList')">
      <span class="material-symbols-outlined text-[20px]" data-icon="format_list_numbered">format_list_numbered</span>
    </button>
  </div>

  <!-- Document Canvas -->
  <div class="bg-surface-variant editor-canvas rounded-b-lg border-x border-b border-white/5 flex-grow w-full max-w-6xl mx-auto p-8 md:p-16 relative shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] mb-12">
    <!-- Focus Glow Effect -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[200px] bg-secondary/5 blur-[80px] pointer-events-none"></div>
    <!-- Editable Content Area -->
    <div id="editor-rich-textarea" contenteditable="true" spellcheck="false" class="rich-text-content w-full h-full min-h-[500px] outline-none text-on-surface-variant font-body-md leading-relaxed prose prose-invert prose-sm max-w-none">
    </div>
  </div>

  <!-- Floating Topic Outline (Listras com menu expansível no hover) -->
  <div id="editor-floating-outline-container" class="fixed right-4 md:right-8 top-32 z-40 group flex flex-col items-end">
    <!-- Minimalist Stripes / Listras (Visível por padrão) -->
    <div class="flex flex-col gap-1.5 items-end p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-all duration-200" title="Tópicos do Documento">
      <span class="w-6 h-[2.5px] bg-on-surface-variant/70 rounded-full transition-all group-hover:bg-primary"></span>
      <span class="w-4 h-[2.5px] bg-on-surface-variant/70 rounded-full transition-all group-hover:bg-primary"></span>
      <span class="w-6 h-[2.5px] bg-on-surface-variant/70 rounded-full transition-all group-hover:bg-primary"></span>
      <span class="w-5 h-[2.5px] bg-on-surface-variant/70 rounded-full transition-all group-hover:bg-primary"></span>
    </div>

    <!-- Floating Dropdown Menu (Surge ao aproximar o mouse) -->
    <div id="editor-outline-panel" class="opacity-0 translate-x-3 scale-95 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-300 ease-out absolute right-0 top-0 bg-[#16161a]/95 backdrop-blur-md border border-white/10 rounded-xl p-2.5 shadow-2xl min-w-[200px] max-w-[280px] max-h-[70vh] overflow-y-auto custom-scrollbar">
      <div class="px-2 py-1 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest border-b border-white/5 mb-1.5 flex items-center justify-between">
        <span>Tópicos</span>
        <span id="editor-outline-count" class="text-primary font-mono text-[11px]">0</span>
      </div>
      <div id="editor-outline-list" class="space-y-0.5">
        <!-- Itens injetados dinamicamente via JS -->
      </div>
    </div>
  </div>

  <!-- Floating Pomodoro (Optional based on design) -->
  <div class="fixed bottom-8 right-8 z-50 w-64 bg-surface-container-high border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col hidden" id="editor-floating-pomodoro">
    <div class="flex items-center justify-between px-4 py-2 bg-white/5 cursor-move">
      <div class="flex items-center gap-2">
        <span class="material-symbols-outlined text-on-surface-variant text-[18px]">drag_handle</span>
        <span class="font-label-caps text-label-caps text-on-surface-variant">POMODORO</span>
      </div>
      <div class="flex items-center gap-1">
        <div class="w-2 h-2 rounded-full bg-tertiary"></div>
        <span class="text-[10px] font-medium text-tertiary uppercase tracking-wider">Focus</span>
      </div>
    </div>
    <div class="p-6 flex flex-col items-center gap-4 relative">
      <div class="absolute inset-0 bg-secondary/5 blur-2xl pointer-events-none"></div>
      <div class="font-headline-md text-[40px] font-bold text-on-surface leading-none relative z-10">25:00</div>
      <div class="flex items-center gap-4 relative z-10">
        <button class="p-2 rounded-full bg-secondary text-on-secondary hover:bg-secondary-fixed transition-colors active:scale-95">
          <span class="material-symbols-outlined text-[24px]" data-icon="play_arrow">play_arrow</span>
        </button>
        <button class="p-2 rounded-full hover:bg-white/5 text-on-surface-variant hover:text-on-surface transition-colors">
          <span class="material-symbols-outlined text-[20px]" data-icon="replay">replay</span>
        </button>
      </div>
    </div>
  </div>
</div>
`;
