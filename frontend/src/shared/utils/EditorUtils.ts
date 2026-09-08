let savedRange: Range | null = null;
let lastActiveEditor: HTMLElement | null = null;

export const TEXT_COLORS = [
  { label: 'Branco', value: '#FFFFFF', border: 'border-white/20' },
  { label: 'Cinza', value: '#B3B3B3', border: 'border-transparent' },
  { label: 'Vermelho', value: '#FF5252', border: 'border-transparent' },
  { label: 'Laranja', value: '#FFB74D', border: 'border-transparent' },
  { label: 'Amarelo', value: '#FACC15', border: 'border-transparent' },
  { label: 'Verde', value: '#4ADE80', border: 'border-transparent' },
  { label: 'Ciano', value: '#38BDF8', border: 'border-transparent' },
  { label: 'Azul', value: '#60A5FA', border: 'border-transparent' },
  { label: 'Roxo', value: '#C084FC', border: 'border-transparent' },
  { label: 'Rosa', value: '#F472B6', border: 'border-transparent' },
];

export const HIGHLIGHT_COLORS = [
  { label: 'Amarelo Claro', value: '#FEF08A' },
  { label: 'Verde Claro', value: '#BBF7D0' },
  { label: 'Azul Claro', value: '#BAE6FD' },
  { label: 'Laranja Claro', value: '#FED7AA' },
  { label: 'Rosa Claro', value: '#FBCFE8' },
  { label: 'Roxo Claro', value: '#E9D5FF' },
  { label: 'Amarelo Ouro', value: '#EAB308' },
  { label: 'Verde Neon', value: '#22C55E' },
  { label: 'Ciano Vivo', value: '#06B6D4' },
  { label: 'Coral', value: '#F97316' },
];

export const getActiveEditor = (): HTMLElement | null => {
  return lastActiveEditor 
    || document.getElementById('editor-rich-textarea') 
    || document.getElementById('kb-current-topic-notes');
};

export const saveSelection = (explicitTarget?: HTMLElement) => {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return;
  const range = sel.getRangeAt(0);

  const fullscreenEditor = document.getElementById('editor-rich-textarea');
  const kbEditor = document.getElementById('kb-current-topic-notes');

  const container = range.commonAncestorContainer;
  if (fullscreenEditor && (fullscreenEditor.contains(container) || container === fullscreenEditor)) {
    savedRange = range.cloneRange();
    lastActiveEditor = fullscreenEditor;
  } else if (kbEditor && (kbEditor.contains(container) || container === kbEditor)) {
    savedRange = range.cloneRange();
    lastActiveEditor = kbEditor;
  } else if (explicitTarget) {
    savedRange = range.cloneRange();
    lastActiveEditor = explicitTarget;
  }
};

const stripImportantPriorities = (range: Range) => {
  try {
    const common = range.commonAncestorContainer;
    const parent = common.nodeType === Node.ELEMENT_NODE ? (common as HTMLElement) : common.parentElement;
    if (parent) {
      const cleanElement = (el: HTMLElement) => {
        if (el.style.getPropertyPriority('color') === 'important') {
          const val = el.style.getPropertyValue('color');
          el.style.removeProperty('color');
          el.style.setProperty('color', val);
        }
        if (el.style.getPropertyPriority('background-color') === 'important') {
          const val = el.style.getPropertyValue('background-color');
          el.style.removeProperty('background-color');
          el.style.setProperty('background-color', val);
        }
      };
      cleanElement(parent);
      parent.querySelectorAll('[style*="important"]').forEach(el => cleanElement(el as HTMLElement));
    }
  } catch (e) {
    // Ignore errors during !important cleanup
  }
};

const cleanSelectionBackgroundColor = () => {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return;
  const range = sel.getRangeAt(0);
  
  try {
    const common = range.commonAncestorContainer;
    const parent = common.nodeType === Node.ELEMENT_NODE ? (common as HTMLElement) : common.parentElement;
    if (parent) {
      if (parent.id !== 'editor-rich-textarea' && parent.id !== 'kb-current-topic-notes') {
        if (parent.style.backgroundColor && parent.style.backgroundColor !== 'transparent') {
          parent.style.backgroundColor = 'transparent';
        }
      }
      const styledElements = parent.querySelectorAll('span, a, font, mark');
      styledElements.forEach(el => {
        const htmlEl = el as HTMLElement;
        if (range.intersectsNode(htmlEl) && htmlEl.style.backgroundColor && htmlEl.style.backgroundColor !== 'transparent') {
          htmlEl.style.backgroundColor = 'transparent';
        }
      });
    }
  } catch (e) {
    // Ignore cleanup errors
  }
};

export const restoreSelection = () => {
  const editor = getActiveEditor();
  if (editor) {
    editor.focus();
  }
  if (savedRange) {
    stripImportantPriorities(savedRange);
    const sel = window.getSelection();
    if (sel) {
      sel.removeAllRanges();
      sel.addRange(savedRange);
    }
  }
};

export const applyTextColor = (color: string) => {
  restoreSelection();
  try {
    document.execCommand('styleWithCSS', false, 'true');
  } catch (e) {}

  document.execCommand('foreColor', false, color);
  saveSelection();

  const editor = getActiveEditor();
  if (editor) {
    editor.dispatchEvent(new Event('input', { bubbles: true }));
  }
};

export const applyHighlightColor = (color: string) => {
  restoreSelection();
  try {
    document.execCommand('styleWithCSS', false, 'true');
  } catch (e) {}

  if (!color || color === 'transparent') {
    const success = document.execCommand('hiliteColor', false, 'transparent');
    if (!success) {
      document.execCommand('backColor', false, 'transparent');
    }
    cleanSelectionBackgroundColor();
  } else {
    const success = document.execCommand('hiliteColor', false, color);
    if (!success) {
      document.execCommand('backColor', false, color);
    }
  }
  saveSelection();

  const editor = getActiveEditor();
  if (editor) {
    editor.dispatchEvent(new Event('input', { bubbles: true }));
  }
};

export const FONT_SIZES = [10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48];

export const applyFontSize = (sizePx: number | string) => {
  restoreSelection();
  try {
    document.execCommand('styleWithCSS', false, 'true');
  } catch (e) {}

  const size = typeof sizePx === 'string' ? parseInt(sizePx, 10) : sizePx;
  if (isNaN(size) || size <= 0) return;

  document.execCommand('fontSize', false, '7');

  const editor = getActiveEditor();
  if (editor) {
    const fontTags = editor.querySelectorAll('font[size="7"]');
    fontTags.forEach(el => {
      el.removeAttribute('size');
      (el as HTMLElement).style.fontSize = `${size}px`;
    });

    const spans = editor.querySelectorAll('span[style*="-webkit-xxx-large"], span[style*="xxx-large"]');
    spans.forEach(el => {
      (el as HTMLElement).style.fontSize = `${size}px`;
    });
  }

  saveSelection();

  if (editor) {
    editor.dispatchEvent(new Event('input', { bubbles: true }));
  }

  const mainSelect = document.getElementById('editor-select-font-size') as HTMLSelectElement | null;
  const ctxSelect = document.getElementById('ctx-font-size-select') as HTMLSelectElement | null;
  if (mainSelect) mainSelect.value = size.toString();
  if (ctxSelect) ctxSelect.value = size.toString();
};

export const detectCurrentFormatting = () => {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return;
  const range = sel.getRangeAt(0);
  const container = range.commonAncestorContainer;
  const el = container.nodeType === Node.ELEMENT_NODE ? (container as HTMLElement) : container.parentElement;
  if (!el) return;

  try {
    const compStyle = window.getComputedStyle(el);
    const sizePx = parseInt(compStyle.fontSize, 10);
    if (sizePx) {
      const mainSelect = document.getElementById('editor-select-font-size') as HTMLSelectElement | null;
      const ctxSelect = document.getElementById('ctx-font-size-select') as HTMLSelectElement | null;
      const closest = FONT_SIZES.reduce((prev, curr) => Math.abs(curr - sizePx) < Math.abs(prev - sizePx) ? curr : prev);
      if (mainSelect && mainSelect.value !== closest.toString()) mainSelect.value = closest.toString();
      if (ctxSelect && ctxSelect.value !== closest.toString()) ctxSelect.value = closest.toString();
    }
  } catch (e) {}
};

export const initSelectionTracker = () => {
  if ((window as any).__editorSelectionTrackerAttached) return;

  document.addEventListener('selectionchange', () => {
    saveSelection();
    detectCurrentFormatting();
  });

  (window as any).__editorSelectionTrackerAttached = true;
};

export const initContentEditorToolbar = () => {
  initSelectionTracker();

  const textColorBtn = document.getElementById('editor-btn-text-color');
  const textColorMenu = document.getElementById('editor-text-color-menu');
  const textColorBar = document.getElementById('editor-text-color-bar');
  const customTextColorInput = document.getElementById('editor-input-custom-text-color') as HTMLInputElement | null;

  const highlightBtn = document.getElementById('editor-btn-highlight');
  const highlightMenu = document.getElementById('editor-highlight-menu');
  const highlightBar = document.getElementById('editor-highlight-color-bar');
  const customHighlightInput = document.getElementById('editor-input-custom-highlight') as HTMLInputElement | null;
  const removeHighlightBtn = document.getElementById('editor-btn-remove-highlight');

  const closeAllMenus = () => {
    if (textColorMenu) textColorMenu.classList.add('hidden');
    if (highlightMenu) highlightMenu.classList.add('hidden');
  };

  // Toggle Text Color Menu
  if (textColorBtn && textColorMenu) {
    textColorBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      saveSelection();
      const isHidden = textColorMenu.classList.contains('hidden');
      closeAllMenus();
      if (isHidden) {
        textColorMenu.classList.remove('hidden');
      }
    });
  }

  // Toggle Highlight Menu
  if (highlightBtn && highlightMenu) {
    highlightBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      saveSelection();
      const isHidden = highlightMenu.classList.contains('hidden');
      closeAllMenus();
      if (isHidden) {
        highlightMenu.classList.remove('hidden');
      }
    });
  }

  // Close menus on outside click
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (
      textColorMenu && !textColorMenu.contains(target) &&
      textColorBtn && !textColorBtn.contains(target) &&
      highlightMenu && !highlightMenu.contains(target) &&
      highlightBtn && !highlightBtn.contains(target)
    ) {
      closeAllMenus();
    }
  });

  // Text Color Presets
  const textColorChips = document.querySelectorAll('.editor-text-color-chip');
  textColorChips.forEach(chip => {
    chip.addEventListener('click', (e) => {
      e.stopPropagation();
      const color = chip.getAttribute('data-color');
      if (color) {
        applyTextColor(color);
        if (textColorBar) textColorBar.style.backgroundColor = color;
        if (customTextColorInput) customTextColorInput.value = color;
      }
      closeAllMenus();
    });
  });

  // Custom Text Color Input
  if (customTextColorInput) {
    customTextColorInput.addEventListener('pointerdown', () => saveSelection());
    customTextColorInput.addEventListener('mousedown', () => saveSelection());
    
    const handleTextColorChange = () => {
      const color = customTextColorInput.value;
      applyTextColor(color);
      if (textColorBar) textColorBar.style.backgroundColor = color;
    };
    customTextColorInput.addEventListener('input', handleTextColorChange);
    customTextColorInput.addEventListener('change', handleTextColorChange);
  }

  // Highlight Color Presets
  const highlightChips = document.querySelectorAll('.editor-highlight-chip');
  highlightChips.forEach(chip => {
    chip.addEventListener('click', (e) => {
      e.stopPropagation();
      const color = chip.getAttribute('data-color');
      if (color) {
        applyHighlightColor(color);
        if (highlightBar) highlightBar.style.backgroundColor = color;
        if (customHighlightInput) customHighlightInput.value = color;
      }
      closeAllMenus();
    });
  });

  // Remove Highlight
  if (removeHighlightBtn) {
    removeHighlightBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      applyHighlightColor('transparent');
      if (highlightBar) highlightBar.style.backgroundColor = 'transparent';
      closeAllMenus();
    });
  }

  // Custom Highlight Color Input
  if (customHighlightInput) {
    customHighlightInput.addEventListener('pointerdown', () => saveSelection());
    customHighlightInput.addEventListener('mousedown', () => saveSelection());

    const handleHighlightChange = () => {
      const color = customHighlightInput.value;
      applyHighlightColor(color);
      if (highlightBar) highlightBar.style.backgroundColor = color;
    };
    customHighlightInput.addEventListener('input', handleHighlightChange);
    customHighlightInput.addEventListener('change', handleHighlightChange);
  }

  // Font Size in Fixed Toolbar
  const fontSizeSelect = document.getElementById('editor-select-font-size') as HTMLSelectElement | null;
  const fontSizeDecBtn = document.getElementById('editor-btn-font-size-dec');
  const fontSizeIncBtn = document.getElementById('editor-btn-font-size-inc');

  if (fontSizeSelect) {
    fontSizeSelect.addEventListener('change', () => {
      applyFontSize(fontSizeSelect.value);
    });
  }

  if (fontSizeDecBtn && fontSizeSelect) {
    fontSizeDecBtn.addEventListener('click', (e) => {
      e.preventDefault();
      saveSelection();
      const current = parseInt(fontSizeSelect.value, 10) || 16;
      const prevSizes = FONT_SIZES.filter(s => s < current);
      const newSize = prevSizes.length > 0 ? prevSizes[prevSizes.length - 1] : FONT_SIZES[0];
      fontSizeSelect.value = newSize.toString();
      applyFontSize(newSize);
    });
  }

  if (fontSizeIncBtn && fontSizeSelect) {
    fontSizeIncBtn.addEventListener('click', (e) => {
      e.preventDefault();
      saveSelection();
      const current = parseInt(fontSizeSelect.value, 10) || 16;
      const nextSizes = FONT_SIZES.filter(s => s > current);
      const newSize = nextSizes.length > 0 ? nextSizes[0] : FONT_SIZES[FONT_SIZES.length - 1];
      fontSizeSelect.value = newSize.toString();
      applyFontSize(newSize);
    });
  }
};
