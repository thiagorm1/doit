import './style.css';
import { App, initApp } from './app/App';

const app = document.querySelector<HTMLDivElement>('#app')!;
app.innerHTML = App();

initApp();

// Global Context Menu Intercept for Rich Text Editor
document.addEventListener('contextmenu', (e: MouseEvent) => {
  const notesArea = document.getElementById('kb-current-topic-notes');
  if (notesArea && (notesArea.contains(e.target as Node) || e.target === notesArea)) {
    e.preventDefault();
    e.stopPropagation();
    
    const ctxMenu = document.getElementById('kb-rich-text-context-menu');
    if (!ctxMenu) return;
    
    let x = e.clientX;
    let y = e.clientY;
    
    ctxMenu.classList.remove('hidden');
    ctxMenu.classList.add('flex');
    
    // Position menu
    setTimeout(() => {
      const menuRect = ctxMenu.getBoundingClientRect();
      if (x + menuRect.width > window.innerWidth) x = window.innerWidth - menuRect.width - 10;
      if (y + menuRect.height > window.innerHeight) y = window.innerHeight - menuRect.height - 10;
      
      ctxMenu.style.top = `${y}px`;
      ctxMenu.style.left = `${x}px`;
    }, 0);
  }
}, { capture: true });
