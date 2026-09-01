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

  <!-- Floating Pomodoro -->
  <div class="fixed bottom-8 right-8 z-50 min-w-[16rem] min-h-[14rem] glass-panel border border-primary/20 rounded-xl shadow-[0_0_20px_rgba(255,82,82,0.15)] overflow-hidden flex flex-col resize" style="width: 16rem; height: 14rem;" id="editor-floating-pomodoro">
    
    <!-- Config Modal Overlay -->
    <div id="float-pomodoro-config-modal" class="hidden absolute inset-0 bg-surface-container/95 z-50 p-4 flex flex-col backdrop-blur-sm overflow-y-auto custom-scrollbar">
      <div class="flex flex-col min-h-full justify-center">
        <h3 class="font-headline-sm text-on-surface mb-3 text-sm font-bold">Configurações</h3>
        <div class="space-y-2.5 font-body-sm text-xs flex-1">
          <div class="flex justify-between items-center gap-2">
            <label class="text-on-surface-variant flex-1 truncate">Foco (min)</label>
            <input type="number" id="f-cfg-focus" class="w-16 bg-surface-container-highest border border-outline-variant/50 rounded text-center text-on-surface py-0.5" value="25" />
          </div>
          <div class="flex justify-between items-center gap-2">
            <label class="text-on-surface-variant flex-1 truncate">Curto (min)</label>
            <input type="number" id="f-cfg-short" class="w-16 bg-surface-container-highest border border-outline-variant/50 rounded text-center text-on-surface py-0.5" value="5" />
          </div>
          <div class="flex justify-between items-center gap-2">
            <label class="text-on-surface-variant flex-1 truncate flex items-center gap-1 cursor-pointer">
              <input type="checkbox" id="f-cfg-long-enabled" class="accent-primary w-3 h-3" />
              <span>Longo (min)</span>
            </label>
            <input type="number" id="f-cfg-long" class="w-16 bg-surface-container-highest border border-outline-variant/50 rounded text-center text-on-surface py-0.5" value="15" />
          </div>
          <div class="flex justify-between items-center gap-2">
            <label class="text-on-surface-variant flex-1 truncate">Sessões (Focos)</label>
            <input type="number" id="f-cfg-cycles" class="w-16 bg-surface-container-highest border border-outline-variant/50 rounded text-center text-on-surface py-0.5" value="4" />
          </div>
        </div>
        <div class="flex gap-2 mt-4 text-xs pt-2 border-t border-white/5">
          <button id="f-pomo-cfg-cancel" class="flex-1 py-1.5 rounded border border-outline-variant/50 text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-colors">Cancelar</button>
          <button id="f-pomo-cfg-save" class="flex-1 py-1.5 rounded bg-primary text-on-secondary font-bold hover:bg-primary-fixed transition-colors">Salvar</button>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-between px-4 py-2 bg-white/5 cursor-move" id="editor-floating-pomodoro-header">
      <div class="flex items-center gap-2 pointer-events-none">
        <span class="material-symbols-outlined text-on-surface-variant text-[18px]">drag_handle</span>
        <span class="font-label-caps text-label-caps text-on-surface-variant" id="f-pomo-title">POMODORO</span>
      </div>
      <div class="flex items-center gap-1">
        <button id="f-pomo-cfg-btn" class="text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center">
          <span class="material-symbols-outlined text-[16px]">settings</span>
        </button>
        <span id="f-pomo-badge" class="px-sm py-xs bg-primary/15 text-primary text-[10px] font-bold rounded-md transition-colors uppercase">ESTUDO</span>
      </div>
    </div>
    
    <div class="p-4 flex flex-col items-center justify-center flex-1 gap-2 relative">
      <div class="absolute inset-0 bg-primary/5 blur-2xl pointer-events-none"></div>
      
      <div class="text-center relative z-10">
        <div id="f-pomo-time" class="font-headline-md text-[40px] font-bold text-on-surface leading-none">25:00</div>
        <div id="f-pomo-cycle-text" class="text-[10px] text-on-surface-variant uppercase tracking-widest mt-1">Sessão 1/4</div>
      </div>
      
      <div id="f-pomo-controls" class="flex items-center gap-4 relative z-10 mt-2">
        <button id="f-pomo-reset" class="p-1.5 rounded-full hover:bg-white/5 text-on-surface-variant hover:text-on-surface transition-colors">
          <span class="material-symbols-outlined text-[20px]">restart_alt</span>
        </button>
        <button id="f-pomo-play" class="p-2.5 rounded-full bg-primary text-on-secondary hover:bg-primary-fixed transition-colors active:scale-95 shadow-lg shadow-primary/20">
          <span class="material-symbols-outlined text-[24px]" style="font-variation-settings: 'FILL' 1;">play_arrow</span>
        </button>
        <button id="f-pomo-skip" class="p-1.5 rounded-full hover:bg-white/5 text-on-surface-variant hover:text-on-surface transition-colors">
          <span class="material-symbols-outlined text-[20px]">skip_next</span>
        </button>
      </div>
      
      <div id="f-pomo-complete-area" class="hidden w-full relative z-10 mt-2 px-2">
        <button id="f-pomo-complete-btn" class="w-full py-1.5 text-xs rounded-lg bg-surface-container-highest border border-tertiary/30 text-tertiary font-bold hover:bg-tertiary hover:text-on-primary shadow-lg shadow-tertiary/20 transition-all flex items-center justify-center gap-1">
          <span class="material-symbols-outlined text-[14px]">done_all</span> Concluir Pomodoro
        </button>
      </div>
    </div>
  </div>
</div>
`;
