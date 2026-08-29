import './style.css';
import { App, initApp } from './app/App';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = App();
initApp();
