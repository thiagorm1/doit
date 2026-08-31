export const initImageResizer = () => {
  if ((window as any).__imageResizerAttached) return;

  const overlay = document.createElement('div');
  overlay.className = 'hidden absolute border-2 border-primary z-40 pointer-events-none transition-none';
  
  const handle = document.createElement('div');
  handle.className = 'absolute -bottom-2 -right-2 w-4 h-4 bg-primary border-2 border-surface-container-highest rounded-full cursor-nwse-resize pointer-events-auto shadow-md';
  overlay.appendChild(handle);
  
  document.body.appendChild(overlay);

  let activeImage: HTMLImageElement | null = null;
  let isResizing = false;
  let startX = 0;
  let startWidth = 0;

  // Listen for clicks on images inside any rich text editor
  document.addEventListener('mousedown', (e) => {
    const target = e.target as HTMLElement;
    
    // If clicking the handle, don't hide
    if (target === handle) return;

    if (target.tagName === 'IMG' && target.closest('.rich-text-content')) {
      activeImage = target as HTMLImageElement;
      updateOverlay();
    } else if (!isResizing) {
      activeImage = null;
      overlay.classList.add('hidden');
    }
  });

  const updateOverlay = () => {
    if (!activeImage) return;
    const rect = activeImage.getBoundingClientRect();
    overlay.style.top = `${rect.top + window.scrollY}px`;
    overlay.style.left = `${rect.left + window.scrollX}px`;
    overlay.style.width = `${rect.width}px`;
    overlay.style.height = `${rect.height}px`;
    overlay.classList.remove('hidden');
  };

  handle.addEventListener('mousedown', (e) => {
    if (!activeImage) return;
    isResizing = true;
    startX = e.clientX;
    startWidth = activeImage.clientWidth;
    e.preventDefault();
    e.stopPropagation();
  });

  document.addEventListener('mousemove', (e) => {
    if (!isResizing || !activeImage) return;
    const diffX = e.clientX - startX;
    const newWidth = Math.max(50, startWidth + diffX);
    activeImage.style.width = `${newWidth}px`;
    activeImage.style.height = 'auto'; // Maintain aspect ratio
    updateOverlay();
  });

  document.addEventListener('mouseup', () => {
    if (isResizing) {
      isResizing = false;
      // trigger input event so auto-save works in the editor
      if (activeImage) {
        const editor = activeImage.closest('.rich-text-content');
        if (editor) editor.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }
  });

  // Keep overlay attached during any scroll or resize
  window.addEventListener('scroll', (e) => {
    if (activeImage && !isResizing) updateOverlay();
  }, { passive: true, capture: true }); // Capture true catches all internal scrolls
  
  window.addEventListener('resize', () => {
    if (activeImage && !isResizing) updateOverlay();
  });

  // Track image load events in case they change size after clicking
  document.addEventListener('load', (e) => {
    const target = e.target as HTMLElement;
    if (activeImage && target === activeImage) {
      updateOverlay();
    }
  }, true);

  (window as any).__imageResizerAttached = true;
};
