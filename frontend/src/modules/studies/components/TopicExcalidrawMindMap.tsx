import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Excalidraw, convertToExcalidrawElements } from '@excalidraw/excalidraw';
import '@excalidraw/excalidraw/index.css';

export interface TopicMindmapState {
  elements: readonly any[];
  appState?: any;
}

interface TopicExcalidrawProps {
  topicKey: string;
  topicTitle: string;
  savedData?: TopicMindmapState | null;
  onSave?: (topicKey: string, data: TopicMindmapState) => void;
}

const createStarterElements = (title: string) => {
  try {
    return convertToExcalidrawElements([
      {
        type: 'rectangle',
        x: 160,
        y: 120,
        width: Math.max(180, title.length * 13 + 40),
        height: 56,
        backgroundColor: '#ffffff', // Inverts to dark in Excalidraw dark theme
        fillStyle: 'solid',
        strokeColor: '#1e1e1e',
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
        strokeColor: '#1e1e1e',
        textAlign: 'center',
        verticalAlign: 'middle',
      }
    ]);
  } catch {
    return [];
  }
};

export const TopicExcalidrawMindMap: React.FC<TopicExcalidrawProps> = ({
  topicKey,
  topicTitle,
  savedData,
  onSave
}) => {
  const [excalidrawAPI, setExcalidrawAPI] = useState<any>(null);
  const saveTimeoutRef = useRef<any>(null);
  const currentKeyRef = useRef(topicKey);
  currentKeyRef.current = topicKey;

  const loadTopicScene = useCallback((api: any, key: string, title: string, data?: TopicMindmapState | null) => {
    if (!api || !key) return;

    let elementsToLoad: any[] = [];
    if (data && data.elements && data.elements.length > 0) {
      elementsToLoad = data.elements.map(el => {
        const newEl = { ...el };
        if (newEl.strokeColor === '#e03131' || newEl.strokeColor === '#ff5252' || newEl.strokeColor === '#ffffff' || newEl.strokeColor === '#fff') {
          newEl.strokeColor = '#1e1e1e';
        }
        if (newEl.backgroundColor === '#1e1e24' || newEl.backgroundColor === '#121214') {
          newEl.backgroundColor = '#ffffff';
          newEl.fillStyle = 'solid';
        }
        return newEl;
      });
    } else {
      elementsToLoad = createStarterElements(title);
    }

    let targetBg = data?.appState?.viewBackgroundColor || '#ffffff';
    if (targetBg === '#121214' || targetBg === '#121212') {
      targetBg = '#ffffff';
    }

    api.updateScene({
      elements: elementsToLoad,
      appState: {
        ...(data?.appState || {}),
        theme: 'dark',
        viewBackgroundColor: targetBg,
      },
      commitToHistory: false,
    });

    setTimeout(() => {
      if (elementsToLoad.length > 0) {
        api.scrollToContent(elementsToLoad, { 
          fitToViewport: true, 
          maxZoom: 0.75,
          viewportZoomFactor: 0.6 
        });
      }
    }, 80);
  }, []);

  // When excalidrawAPI is ready or topic changes, load scene
  useEffect(() => {
    if (excalidrawAPI && topicKey) {
      loadTopicScene(excalidrawAPI, topicKey, topicTitle, savedData);
    }
  }, [excalidrawAPI, topicKey, topicTitle, savedData, loadTopicScene]);

  const handleChange = (elements: readonly any[], appState: any) => {
    if (!currentKeyRef.current || !onSave) return;

    clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      onSave(currentKeyRef.current, {
        elements,
        appState: {
          theme: 'dark',
          viewBackgroundColor: appState.viewBackgroundColor || '#ffffff',
          scrollX: appState.scrollX,
          scrollY: appState.scrollY,
          zoom: appState.zoom,
        }
      });
    }, 600);
  };

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#121214]">
      <Excalidraw
        excalidrawAPI={(api) => setExcalidrawAPI(api)}
        theme="dark"
        initialData={{
          appState: {
            theme: 'dark',
            viewBackgroundColor: '#ffffff',
          }
        }}
        UIOptions={{
          canvasActions: {
            changeViewBackgroundColor: true,
            clearCanvas: true,
            loadScene: false,
            saveToActiveFile: false,
            toggleTheme: false,
          }
        }}
        onChange={handleChange}
      />
    </div>
  );
};
