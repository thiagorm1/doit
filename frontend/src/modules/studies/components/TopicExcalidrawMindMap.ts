import React from 'react';
import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import { Excalidraw, convertToExcalidrawElements } from '@excalidraw/excalidraw';
import '@excalidraw/excalidraw/index.css';

export interface TopicMindmapState {
  elements: readonly any[];
  appState?: any;
}

export class TopicExcalidrawManager {
  private root: Root | null = null;
  private container: HTMLElement | null = null;
  private api: any = null;
  private currentTopicKey: string = '';
  private currentTopicTitle: string = '';
  private onSaveCallback: ((topicKey: string, data: TopicMindmapState) => void) | null = null;
  private saveTimeout: any = null;
  private pendingTopicData: TopicMindmapState | null = null;

  public init(container: HTMLElement, onSave: (topicKey: string, data: TopicMindmapState) => void) {
    this.onSaveCallback = onSave;
    
    // Se o container mudou (ex: troca de página), desmonta a raiz antiga
    if (this.root && this.container !== container) {
      try {
        this.root.unmount();
      } catch(e) {}
      this.root = null;
    }
    
    if (!this.root) {
      this.root = createRoot(container);
      this.container = container;
    }

    const ExcalidrawWrapper = () => {
      return React.createElement('div', { 
        className: 'w-full h-full relative overflow-hidden bg-[#121214]' 
      },
        React.createElement(Excalidraw, {
          excalidrawAPI: (apiInstance: any) => {
            this.api = apiInstance;
            if (this.currentTopicKey) {
              this.applySceneData();
            }
          },
          theme: 'dark',
          initialData: {
            appState: {
              theme: 'dark',
              viewBackgroundColor: '#ffffff',
            }
          },
          UIOptions: {
            canvasActions: {
              changeViewBackgroundColor: true,
              clearCanvas: true,
              loadScene: false,
              saveToActiveFile: false,
              toggleTheme: false,
            },
          },
          onChange: (elements: readonly any[], appState: any) => {
            if (!this.currentTopicKey || !this.api) return;
            
            clearTimeout(this.saveTimeout);
            this.saveTimeout = setTimeout(() => {
              if (this.onSaveCallback && this.currentTopicKey) {
                this.onSaveCallback(this.currentTopicKey, {
                  elements,
                  appState: {
                    theme: 'dark',
                    viewBackgroundColor: appState.viewBackgroundColor || '#ffffff',
                    scrollX: appState.scrollX,
                    scrollY: appState.scrollY,
                    zoom: appState.zoom,
                  }
                });
              }
            }, 600);
          }
        })
      );
    };

    this.root.render(React.createElement(ExcalidrawWrapper));
  }

  private createStarterElements(title: string) {
    try {
      return convertToExcalidrawElements([
        {
          type: 'rectangle',
          x: 160,
          y: 120,
          width: Math.max(180, title.length * 13 + 40),
          height: 56,
          backgroundColor: '#ffffff', // Inverts to black (#121212) in Excalidraw dark theme
          fillStyle: 'solid',
          strokeColor: '#1e1e1e',     // Inverts to white (#f0f0f0) in Excalidraw dark theme
          strokeWidth: 2,
          roundness: { type: 3 },
          roughness: 0,
        },
        {
          type: 'text',
          x: 180,
          y: 138,
          text: title || 'Novo Tópico',
          fontSize: 18,
          fontFamily: 1,
          strokeColor: '#1e1e1e',     // Inverts to white in Excalidraw dark theme
          textAlign: 'center',
          verticalAlign: 'middle',
        }
      ]);
    } catch {
      return [];
    }
  }

  public loadTopic(topicKey: string, topicTitle: string, savedData?: TopicMindmapState | null) {
    this.currentTopicKey = topicKey;
    this.currentTopicTitle = topicTitle;
    this.pendingTopicData = savedData || null;

    if (this.api) {
      this.applySceneData();
    }
  }

  private applySceneData() {
    if (!this.api || !this.currentTopicKey) return;

    let elementsToLoad: any[] = [];
    if (this.pendingTopicData && this.pendingTopicData.elements && this.pendingTopicData.elements.length > 0) {
      elementsToLoad = this.pendingTopicData.elements.map(el => {
        const newEl = { ...el };
        // Sanitize previous auto-generated red nodes to white border & black fill
        if (newEl.strokeColor === '#e03131' || newEl.strokeColor === '#ff5252') {
          newEl.strokeColor = '#1e1e1e';
          newEl.backgroundColor = '#ffffff';
          newEl.fillStyle = 'solid';
        }
        if (newEl.strokeColor === '#ffffff' || newEl.strokeColor === '#fff') {
          newEl.strokeColor = '#1e1e1e';
        }
        if (newEl.backgroundColor === '#1e1e24' || newEl.backgroundColor === '#121214') {
          newEl.backgroundColor = '#ffffff';
          newEl.fillStyle = 'solid';
        }
        return newEl;
      });
    } else {
      elementsToLoad = this.createStarterElements(this.currentTopicTitle);
    }

    // Excalidraw dark theme uses #ffffff as the default base canvas color which gets inverted by theme filter to dark
    let targetBg = this.pendingTopicData?.appState?.viewBackgroundColor || '#ffffff';
    if (targetBg === '#121214' || targetBg === '#121212') {
      targetBg = '#ffffff';
    }

    this.api.updateScene({
      elements: elementsToLoad,
      appState: {
        ...(this.pendingTopicData?.appState || {}),
        theme: 'dark',
        viewBackgroundColor: targetBg,
      },
      commitToHistory: false,
    });

    setTimeout(() => {
      if (this.api && elementsToLoad.length > 0) {
        this.api.scrollToContent(elementsToLoad, { 
          fitToViewport: true, 
          maxZoom: 0.75,
          viewportZoomFactor: 0.6 
        });
      }
    }, 80);
  }

  public refresh() {
    if (this.api) {
      const elements = this.api.getSceneElements();
      if (elements && elements.length > 0) {
        this.api.scrollToContent(elements, { 
          fitToViewport: true, 
          maxZoom: 0.75,
          viewportZoomFactor: 0.6 
        });
      }
    }
  }

  public getCurrentTopicData(): TopicMindmapState | null {
    if (!this.api || !this.currentTopicKey) return null;
    const appState = this.api.getAppState();
    return {
      elements: this.api.getSceneElements(),
      appState: {
        theme: 'dark',
        viewBackgroundColor: appState.viewBackgroundColor || '#ffffff',
        scrollX: appState.scrollX,
        scrollY: appState.scrollY,
        zoom: appState.zoom,
      }
    };
  }

  public destroy() {
    clearTimeout(this.saveTimeout);
    if (this.root) {
      this.root.unmount();
      this.root = null;
    }
    this.api = null;
    this.currentTopicKey = '';
  }
}

export const topicExcalidraw = new TopicExcalidrawManager();
