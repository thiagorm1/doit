import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../../shared/config';
import { TopicExcalidrawMindMap, type TopicMindmapState } from './TopicExcalidrawMindMap';

export interface TopicSection {
  title: string;
  html: string;
}

export function parseTopicsFromHtml(html: string, fallbackTitle: string = 'Tópico 1'): TopicSection[] {
  if (!html || html.trim() === '') {
    return [{ title: fallbackTitle, html: '' }];
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const nodes = Array.from(doc.body.childNodes);

  const sections: TopicSection[] = [];
  let currentTitle = '';
  let currentNodes: Node[] = [];
  let foundFirstH1 = false;

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (node.nodeType === Node.ELEMENT_NODE && (node as Element).tagName.toLowerCase() === 'h1') {
      if (foundFirstH1 || currentNodes.length > 0) {
        const tempDiv = document.createElement('div');
        currentNodes.forEach(n => tempDiv.appendChild(n.cloneNode(true)));
        sections.push({
          title: currentTitle || fallbackTitle,
          html: tempDiv.innerHTML
        });
        currentNodes = [];
      }
      foundFirstH1 = true;
      currentTitle = (node as Element).textContent?.trim() || `Tópico ${sections.length + 1}`;
      currentNodes.push(node);
    } else {
      currentNodes.push(node);
    }
  }

  if (currentNodes.length > 0) {
    const tempDiv = document.createElement('div');
    currentNodes.forEach(n => tempDiv.appendChild(n.cloneNode(true)));
    sections.push({
      title: currentTitle || (foundFirstH1 ? `Tópico ${sections.length + 1}` : fallbackTitle),
      html: tempDiv.innerHTML
    });
  }

  return sections.length > 0 ? sections : [{ title: fallbackTitle, html: '' }];
}

interface StudyContent {
  id: string;
  moduleId: string;
  title: string;
  notes?: string;
  mindmap?: string;
}

interface StudyModule {
  id: string;
  name: string;
  icon?: string;
  contents: StudyContent[];
}

export const KnowledgeBaseArea: React.FC = () => {
  const navigate = useNavigate();
  const [modules, setModules] = useState<StudyModule[]>([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});

  // Active selection
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [activeContentId, setActiveContentId] = useState<string | null>(null);

  // Topics & Notes
  const [topics, setTopics] = useState<TopicSection[]>([]);
  const [activeTopicIndex, setActiveTopicIndex] = useState(0);
  const [isViewingAllTopics, setIsViewingAllTopics] = useState(false);
  const [topicDropdownOpen, setTopicDropdownOpen] = useState(false);

  // Mindmap data
  const [mindmapState, setMindmapState] = useState<{ topics: Record<string, TopicMindmapState> }>({ topics: {} });
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);

  // Modals
  const [showModuleModal, setShowModuleModal] = useState(false);
  const [moduleModalId, setModuleModalId] = useState<string | null>(null);
  const [moduleModalName, setModuleModalName] = useState('');
  const [moduleModalIcon, setModuleModalIcon] = useState('folder');

  const [showContentModal, setShowContentModal] = useState(false);
  const [contentModalId, setContentModalId] = useState<string | null>(null);
  const [contentModalModuleId, setContentModalModuleId] = useState<string>('');
  const [contentModalTitle, setContentModalTitle] = useState('');

  // Refs
  const notesAreaRef = useRef<HTMLDivElement>(null);
  const mindmapSaveTimerRef = useRef<any>(null);

  const fetchModules = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/studies/modules`);
      if (res.ok) {
        const data: StudyModule[] = await res.json();
        setModules(data);

        // Check if previous session was saved
        const lastMod = sessionStorage.getItem('kb_last_module');
        const lastCnt = sessionStorage.getItem('kb_last_content');
        if (lastMod && lastCnt) {
          setExpandedModules(prev => ({ ...prev, [lastMod]: true }));
          loadContent(lastCnt, lastMod, data);
        }
      }
    } catch (e) {
      console.warn('Erro ao carregar módulos', e);
    }
  };

  useEffect(() => {
    fetchModules();
  }, []);

  const loadContent = (contentId: string, moduleId: string, currentModules?: StudyModule[]) => {
    const list = currentModules || modules;
    const mod = list.find(m => m.id === moduleId);
    const cnt = mod?.contents.find(c => c.id === contentId);
    if (!cnt) return;

    setActiveModuleId(moduleId);
    setActiveContentId(contentId);
    sessionStorage.setItem('kb_last_module', moduleId);
    sessionStorage.setItem('kb_last_content', contentId);

    // Parse mindmap
    let parsedMindmap: { topics: Record<string, TopicMindmapState> } = { topics: {} };
    if (cnt.mindmap) {
      try {
        parsedMindmap = JSON.parse(cnt.mindmap);
      } catch (e) {
        parsedMindmap = { topics: {} };
      }
    }
    setMindmapState(parsedMindmap);

    // Parse topics
    const rawNotes = cnt.notes || '';
    const parsedSections = parseTopicsFromHtml(rawNotes, cnt.title);
    setTopics(parsedSections);

    const lastTopic = parseInt(sessionStorage.getItem(`kb_last_topic_${contentId}`) || '0', 10);
    const lastViewAll = sessionStorage.getItem(`kb_last_viewall_${contentId}`) === 'true';

    setActiveTopicIndex(Math.min(lastTopic, Math.max(0, parsedSections.length - 1)));
    setIsViewingAllTopics(lastViewAll);

    // Set notes HTML
    if (notesAreaRef.current) {
      if (lastViewAll) {
        notesAreaRef.current.innerHTML = rawNotes;
      } else {
        notesAreaRef.current.innerHTML = parsedSections[lastTopic]?.html || rawNotes;
      }
    }
  };

  const handleSelectTopic = (index: number) => {
    // Save current topic notes first
    if (notesAreaRef.current) {
      const currentHtml = notesAreaRef.current.innerHTML;
      if (!isViewingAllTopics && topics[activeTopicIndex]) {
        topics[activeTopicIndex].html = currentHtml;
      }
    }

    setActiveTopicIndex(index);
    setIsViewingAllTopics(false);
    setTopicDropdownOpen(false);

    if (activeContentId) {
      sessionStorage.setItem(`kb_last_topic_${activeContentId}`, index.toString());
      sessionStorage.setItem(`kb_last_viewall_${activeContentId}`, 'false');
    }

    if (notesAreaRef.current && topics[index]) {
      notesAreaRef.current.innerHTML = topics[index].html;
    }
  };

  const handleSelectViewAll = () => {
    if (notesAreaRef.current && !isViewingAllTopics && topics[activeTopicIndex]) {
      topics[activeTopicIndex].html = notesAreaRef.current.innerHTML;
    }

    setIsViewingAllTopics(true);
    setTopicDropdownOpen(false);

    if (activeContentId) {
      sessionStorage.setItem(`kb_last_viewall_${activeContentId}`, 'true');
    }

    const fullHtml = topics.map(t => t.html).join('');
    if (notesAreaRef.current) {
      notesAreaRef.current.innerHTML = fullHtml;
    }
  };

  const handleSaveNotes = async () => {
    if (!activeContentId || !activeModuleId) return;

    let fullNotesHtml = '';
    if (notesAreaRef.current) {
      if (isViewingAllTopics) {
        fullNotesHtml = notesAreaRef.current.innerHTML;
      } else if (topics[activeTopicIndex]) {
        topics[activeTopicIndex].html = notesAreaRef.current.innerHTML;
        fullNotesHtml = topics.map(t => t.html).join('');
      }
    }

    const mod = modules.find(m => m.id === activeModuleId);
    const content = mod?.contents.find(c => c.id === activeContentId);
    if (!content) return;

    try {
      await fetch(`${API_BASE_URL}/api/studies/modules/contents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: content.id,
          moduleId: content.moduleId,
          title: content.title,
          notes: fullNotesHtml,
          mindmap: JSON.stringify(mindmapState)
        })
      });
      content.notes = fullNotesHtml;
      alert('Anotações salvas com sucesso!');
    } catch (e) {
      alert('Erro ao salvar anotações');
    }
  };

  const handleSaveMindmap = (topicKey: string, data: TopicMindmapState) => {
    setMindmapState(prev => {
      const updated = {
        ...prev,
        topics: {
          ...prev.topics,
          [topicKey]: data
        }
      };

      clearTimeout(mindmapSaveTimerRef.current);
      mindmapSaveTimerRef.current = setTimeout(async () => {
        if (!activeContentId || !activeModuleId) return;
        const mod = modules.find(m => m.id === activeModuleId);
        const content = mod?.contents.find(c => c.id === activeContentId);
        if (!content) return;

        const serialized = JSON.stringify(updated);
        content.mindmap = serialized;

        try {
          await fetch(`${API_BASE_URL}/api/studies/modules/contents`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: content.id,
              moduleId: content.moduleId,
              title: content.title,
              notes: content.notes || (notesAreaRef.current?.innerHTML || ''),
              mindmap: serialized
            })
          });
        } catch (err) {
          console.error('Erro ao salvar mapa mental no backend', err);
        }
      }, 1000);

      return updated;
    });
  };

  // Navigation to full screen editor
  const handleOpenFullscreenEditor = () => {
    if (!activeContentId || !activeModuleId) {
      alert('Selecione um conteúdo primeiro!');
      return;
    }
    const mod = modules.find(m => m.id === activeModuleId);
    const content = mod?.contents.find(c => c.id === activeContentId);
    if (mod && content) {
      const modSlug = encodeURIComponent(mod.name.toLowerCase().replace(/\s+/g, '-'));
      const contentSlug = encodeURIComponent(content.title.toLowerCase().replace(/\s+/g, '-'));
      navigate(`/estudos/${modSlug}/${contentSlug}`, {
        state: {
          contentId: content.id,
          moduleId: mod.id,
          moduleName: mod.name,
          title: content.title,
          notes: content.notes || (notesAreaRef.current?.innerHTML || ''),
          mindmap: content.mindmap
        }
      });
    }
  };

  // Module CRUD
  const handleSaveModule = async () => {
    try {
      await fetch(`${API_BASE_URL}/api/studies/modules`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: moduleModalId || null,
          name: moduleModalName,
          icon: moduleModalIcon || 'folder'
        })
      });
      setShowModuleModal(false);
      await fetchModules();
    } catch (e) {
      alert('Erro ao salvar módulo');
    }
  };

  const handleDeleteModule = async () => {
    if (!moduleModalId || !confirm('Tem certeza que deseja excluir este módulo?')) return;
    try {
      await fetch(`${API_BASE_URL}/api/studies/modules/${moduleModalId}`, { method: 'DELETE' });
      setShowModuleModal(false);
      if (activeModuleId === moduleModalId) {
        setActiveModuleId(null);
        setActiveContentId(null);
      }
      await fetchModules();
    } catch (e) {
      alert('Erro ao excluir módulo');
    }
  };

  // Content CRUD
  const handleSaveContentModal = async () => {
    try {
      await fetch(`${API_BASE_URL}/api/studies/modules/contents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: contentModalId || null,
          moduleId: contentModalModuleId,
          title: contentModalTitle
        })
      });
      setShowContentModal(false);
      await fetchModules();
    } catch (e) {
      alert('Erro ao salvar conteúdo');
    }
  };

  const handleDeleteContent = async () => {
    if (!contentModalId || !confirm('Tem certeza que deseja excluir este conteúdo?')) return;
    try {
      await fetch(`${API_BASE_URL}/api/studies/modules/contents/${contentModalId}`, { method: 'DELETE' });
      setShowContentModal(false);
      if (activeContentId === contentModalId) {
        setActiveContentId(null);
      }
      await fetchModules();
    } catch (e) {
      alert('Erro ao excluir conteúdo');
    }
  };

  // Current active topic key and title
  const currentTopicKey = isViewingAllTopics ? 'topic_all' : `topic_${activeTopicIndex}`;
  const currentTopicTitle = isViewingAllTopics 
    ? 'Todos os Tópicos' 
    : (topics[activeTopicIndex]?.title || 'Tópico 1');
  const activeContent = modules.flatMap(m => m.contents).find(c => c.id === activeContentId);

  return (
    <section className="glass-panel rounded-xl p-lg flex flex-col lg:flex-row gap-lg h-[600px] relative z-10">
      {/* Sidebar: Cursos / Módulos */}
      <div 
        className={`relative flex-shrink-0 flex flex-col border-b lg:border-b-0 lg:border-r border-outline-variant/10 pb-md lg:pb-0 lg:pr-md overflow-hidden transition-all duration-300 ${
          sidebarCollapsed ? 'w-10 pr-0' : 'w-full lg:w-64'
        }`}
      >
        <div className="flex items-center justify-between mb-md">
          {!sidebarCollapsed && (
            <h3 className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">
              Módulos
            </h3>
          )}
          <div className="flex items-center gap-xs">
            {!sidebarCollapsed && (
              <button 
                type="button"
                onClick={() => {
                  setModuleModalId(null);
                  setModuleModalName('');
                  setModuleModalIcon('folder');
                  setShowModuleModal(true);
                }}
                className="text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center bg-surface-container-highest rounded-md w-7 h-7 cursor-pointer shadow-sm" 
                title="Criar Módulo"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
              </button>
            )}
            <button 
              type="button"
              onClick={() => setSidebarCollapsed(prev => !prev)}
              className="text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center bg-surface-container-highest rounded-md w-7 h-7 cursor-pointer shadow-sm" 
              title="Recolher/Expandir Sidebar"
            >
              <span className={`material-symbols-outlined text-[16px] ${sidebarCollapsed ? 'text-primary' : ''}`}>
                dock_to_right
              </span>
            </button>
          </div>
        </div>

        {/* Modules List */}
        {!sidebarCollapsed && (
          <div className="flex-1 overflow-y-auto space-y-2 pr-xs custom-scrollbar">
            {modules.length === 0 ? (
              <p className="text-xs text-on-surface-variant text-center mt-4">Nenhum módulo criado.</p>
            ) : (
              modules.map((mod) => {
                const isExpanded = Boolean(expandedModules[mod.id]);
                return (
                  <div key={mod.id} className="space-y-1">
                    <div 
                      onClick={() => setExpandedModules(prev => ({ ...prev, [mod.id]: !prev[mod.id] }))}
                      className="w-full text-left p-sm rounded-lg hover:bg-surface-container-high text-on-surface flex items-center gap-sm transition-all group cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px] text-primary pointer-events-none">
                        {mod.icon || 'folder'}
                      </span>
                      <span className="font-bold flex-1 truncate pointer-events-none">{mod.name}</span>
                      <button 
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setModuleModalId(mod.id);
                          setModuleModalName(mod.name);
                          setModuleModalIcon(mod.icon || 'folder');
                          setShowModuleModal(true);
                        }}
                        className="material-symbols-outlined text-[16px] opacity-0 group-hover:opacity-100 transition-opacity hover:text-primary z-10" 
                        title="Configurações do Módulo"
                      >
                        settings
                      </button>
                      <span className={`material-symbols-outlined text-[16px] ml-auto opacity-50 transition-transform pointer-events-none ${
                        isExpanded ? 'rotate-180' : ''
                      }`}>
                        expand_more
                      </span>
                    </div>

                    {isExpanded && (
                      <div className="pl-8 space-y-1">
                        {mod.contents && mod.contents.length > 0 ? (
                          mod.contents.map(c => {
                            const isSelected = activeContentId === c.id;
                            return (
                              <div 
                                key={c.id}
                                onClick={() => loadContent(c.id, mod.id)}
                                className={`w-full text-left p-sm rounded-lg flex items-center gap-sm transition-all group cursor-pointer ${
                                  isSelected 
                                    ? 'bg-primary/20 text-primary font-bold border border-primary/30' 
                                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                                }`}
                              >
                                <span className="material-symbols-outlined text-[18px] pointer-events-none">description</span>
                                <span className="truncate flex-1 pointer-events-none">{c.title}</span>
                                <button 
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setContentModalId(c.id);
                                    setContentModalModuleId(mod.id);
                                    setContentModalTitle(c.title);
                                    setShowContentModal(true);
                                  }}
                                  className="material-symbols-outlined text-[16px] opacity-0 group-hover:opacity-100 transition-opacity hover:text-primary z-10" 
                                  title="Configurações do Conteúdo"
                                >
                                  settings
                                </button>
                              </div>
                            );
                          })
                        ) : null}

                        <button 
                          type="button"
                          onClick={() => {
                            setContentModalId(null);
                            setContentModalModuleId(mod.id);
                            setContentModalTitle('');
                            setShowContentModal(true);
                          }}
                          className="w-full text-left p-xs rounded-lg hover:bg-surface-container-high text-primary/70 hover:text-primary flex items-center gap-sm transition-all mt-2 border border-dashed border-primary/20 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[14px] ml-1">add</span>
                          <span className="text-xs">Novo Conteúdo</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center mb-md border-b border-outline-variant/10 pb-sm">
          <div className="flex items-center gap-sm">
            <span className="font-body-sm text-on-surface-variant mr-2">
              {activeContent ? activeContent.title : 'Selecione um Conteúdo no menu à esquerda'}
            </span>
          </div>
        </div>

        {/* Side-by-Side View */}
        <div className="flex-1 flex flex-col md:flex-row gap-md overflow-hidden">
          {/* Left: Written Notes */}
          <div className="flex-1 bg-surface-container rounded-lg border border-outline-variant/10 p-md overflow-y-auto custom-scrollbar relative flex flex-col">
            {/* Topic Navigation Bar */}
            <div className="relative mb-md">
              <div className="bg-surface-container-high/80 border border-outline-variant/20 hover:border-primary/40 rounded-xl px-3 py-2 flex items-center justify-between transition-all shadow-sm">
                <button 
                  type="button"
                  disabled={activeTopicIndex <= 0 || isViewingAllTopics}
                  onClick={() => handleSelectTopic(activeTopicIndex - 1)}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-highest transition-all disabled:opacity-20 disabled:pointer-events-none cursor-pointer" 
                  title="Tópico Anterior"
                >
                  <span className="material-symbols-outlined text-[24px]">chevron_left</span>
                </button>

                {/* Center Clickable Trigger */}
                <button 
                  type="button"
                  onClick={() => setTopicDropdownOpen(prev => !prev)}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg hover:bg-surface-container-highest transition-all cursor-pointer group max-w-[80%] min-w-0" 
                  title="Clique para selecionar ou ver todos os tópicos"
                >
                  <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest text-xs md:text-sm font-bold shrink-0">
                    TÓPICO:
                  </span>
                  <span className="font-headline-md text-on-surface font-bold text-base md:text-lg lg:text-xl truncate group-hover:text-primary transition-colors tracking-tight">
                    {currentTopicTitle}
                  </span>
                  <span className={`material-symbols-outlined text-[24px] text-on-surface-variant group-hover:text-primary transition-transform shrink-0 ${
                    topicDropdownOpen ? 'rotate-180' : ''
                  }`}>
                    arrow_drop_down
                  </span>
                </button>

                <button 
                  type="button"
                  disabled={activeTopicIndex >= topics.length - 1 || isViewingAllTopics}
                  onClick={() => handleSelectTopic(activeTopicIndex + 1)}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-highest transition-all disabled:opacity-20 disabled:pointer-events-none cursor-pointer" 
                  title="Próximo Tópico"
                >
                  <span className="material-symbols-outlined text-[24px]">chevron_right</span>
                </button>
              </div>

              {/* Topic Dropdown Menu */}
              {topicDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-80 max-w-[95%] mt-2 z-50 bg-[#18181f] border border-white/10 rounded-xl shadow-2xl p-2.5 flex flex-col gap-1 backdrop-blur-md max-h-72 overflow-y-auto custom-scrollbar">
                  <div className="px-2 py-1 text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                    Tópicos (H1)
                  </div>
                  <div className="space-y-1">
                    {topics.map((t, idx) => {
                      const isSelected = !isViewingAllTopics && activeTopicIndex === idx;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSelectTopic(idx)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-xs md:text-sm flex items-center justify-between gap-2 transition-all cursor-pointer ${
                            isSelected 
                              ? 'bg-primary/20 text-primary font-bold border border-primary/30 shadow-sm' 
                              : 'text-on-surface hover:bg-surface-container-high hover:text-primary'
                          }`}
                        >
                          <span className="truncate">{idx + 1}. {t.title || `Tópico ${idx + 1}`}</span>
                          {isSelected && (
                            <span className="material-symbols-outlined text-[16px] text-primary shrink-0">check</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  <div className="my-1.5 border-t border-outline-variant/20" />
                  <button 
                    type="button"
                    onClick={handleSelectViewAll}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs md:text-sm flex items-center justify-between gap-2 transition-all cursor-pointer ${
                      isViewingAllTopics 
                        ? 'bg-primary/20 text-primary font-bold border border-primary/30 shadow-sm' 
                        : 'text-on-surface hover:bg-surface-container-high hover:text-primary'
                    }`}
                  >
                    <span className="flex items-center gap-2 truncate">
                      <span className="material-symbols-outlined text-[16px] text-primary shrink-0">view_agenda</span>
                      <span className="truncate">Ver Todos os Tópicos ({topics.length})</span>
                    </span>
                    {isViewingAllTopics && (
                      <span className="material-symbols-outlined text-[16px] text-primary shrink-0">check</span>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Notes Contenteditable Area */}
            <div 
              ref={notesAreaRef}
              id="kb-current-topic-notes"
              contentEditable
              suppressContentEditableWarning
              className="rich-text-content flex-1 outline-none text-on-surface text-body-md overflow-y-auto leading-relaxed space-y-3 cursor-text selection:bg-secondary/30 selection:text-secondary pb-12"
              data-placeholder="Clique aqui para escrever as anotações..."
              onKeyDown={(e) => {
                if (e.ctrlKey && e.shiftKey) {
                  if (e.key === '1' || e.code === 'Digit1') {
                    e.preventDefault();
                    document.execCommand('formatBlock', false, 'H1');
                  } else if (e.key === '2' || e.code === 'Digit2') {
                    e.preventDefault();
                    document.execCommand('formatBlock', false, 'H2');
                  } else if (e.key === '3' || e.code === 'Digit3') {
                    e.preventDefault();
                    document.execCommand('formatBlock', false, 'H3');
                  }
                }
              }}
            />

            {/* Float Actions */}
            <div className="absolute bottom-4 right-4 flex gap-2">
              <button 
                type="button"
                onClick={handleSaveNotes}
                className="w-10 h-10 rounded-full bg-surface-container-highest border border-outline-variant/30 text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors shadow-lg flex items-center justify-center cursor-pointer" 
                title="Salvar Anotações"
              >
                <span className="material-symbols-outlined text-[18px]">save</span>
              </button>
              <button 
                type="button"
                onClick={handleOpenFullscreenEditor}
                className="w-10 h-10 rounded-full bg-surface-container-highest border border-outline-variant/30 text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors shadow-lg flex items-center justify-center cursor-pointer" 
                title="Expandir Editor (Tela Cheia)"
              >
                <span className="material-symbols-outlined text-[18px]">fullscreen</span>
              </button>
            </div>
          </div>

          {/* Right: Mind Map Area */}
          <div className={`relative flex-1 min-h-[350px] bg-surface-container rounded-lg border border-outline-variant/10 overflow-hidden flex flex-col ${
            isMapFullscreen ? '!fixed !inset-0 !w-screen !h-screen !z-[9999999] !m-0 !rounded-none !border-none' : ''
          }`}>
            <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
              <div className="bg-surface-container-highest/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs font-bold text-on-surface shadow-sm">
                {currentTopicTitle}
              </div>
            </div>

            <div className="absolute top-3 right-3 z-10">
              <button 
                type="button"
                onClick={() => setIsMapFullscreen(prev => !prev)}
                className="w-8 h-8 rounded-lg bg-surface-container-highest/80 backdrop-blur-md border border-white/10 text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors shadow-sm flex items-center justify-center cursor-pointer" 
                title={isMapFullscreen ? "Sair da Tela Cheia" : "Expandir Mapa Mental"}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isMapFullscreen ? 'fullscreen_exit' : 'fullscreen'}
                </span>
              </button>
            </div>

            {/* Excalidraw Component */}
            {activeContentId ? (
              <TopicExcalidrawMindMap 
                topicKey={currentTopicKey}
                topicTitle={currentTopicTitle}
                savedData={mindmapState.topics?.[currentTopicKey] || null}
                onSave={handleSaveMindmap}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-on-surface-variant">
                Selecione um conteúdo para ver o mapa mental
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Module Modal */}
      {showModuleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-surface-container border border-outline-variant/40 rounded-xl p-5 w-full max-w-sm flex flex-col gap-4 shadow-2xl">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-on-surface">
                {moduleModalId ? 'Editar Módulo' : 'Novo Módulo'}
              </h3>
              <button 
                type="button"
                onClick={() => setShowModuleModal(false)}
                className="text-on-surface-variant hover:text-on-surface cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] text-on-surface-variant font-medium">Nome do Módulo</label>
                <input 
                  type="text" 
                  placeholder="Ex: Engenharia de Software" 
                  value={moduleModalName} 
                  onChange={(e) => setModuleModalName(e.target.value)}
                  className="bg-surface-container-high border border-outline-variant/30 rounded-lg px-3 py-1.5 text-xs text-on-surface outline-none focus:border-primary" 
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[11px] text-on-surface-variant font-medium">Ícone (Material Symbols)</label>
                <input 
                  type="text" 
                  placeholder="Ex: folder, terminal, code" 
                  value={moduleModalIcon} 
                  onChange={(e) => setModuleModalIcon(e.target.value)}
                  className="bg-surface-container-high border border-outline-variant/30 rounded-lg px-3 py-1.5 text-xs text-on-surface outline-none focus:border-primary" 
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-outline-variant/20">
              {moduleModalId && (
                <button 
                  type="button"
                  onClick={handleDeleteModule}
                  className="mr-auto px-3 py-1.5 rounded-lg text-xs bg-error/20 text-error hover:bg-error hover:text-on-error transition-colors cursor-pointer"
                >
                  Excluir
                </button>
              )}
              <button 
                type="button"
                onClick={() => setShowModuleModal(false)}
                className="px-3 py-1.5 rounded-lg text-xs text-on-surface-variant hover:bg-white/5 transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button 
                type="button"
                onClick={handleSaveModule}
                className="px-4 py-1.5 rounded-lg bg-primary text-on-secondary text-xs font-bold hover:bg-primary-fixed transition-colors cursor-pointer"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content Modal */}
      {showContentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-surface-container border border-outline-variant/40 rounded-xl p-5 w-full max-w-sm flex flex-col gap-4 shadow-2xl">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-on-surface">
                {contentModalId ? 'Editar Conteúdo' : 'Novo Conteúdo'}
              </h3>
              <button 
                type="button"
                onClick={() => setShowContentModal(false)}
                className="text-on-surface-variant hover:text-on-surface cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] text-on-surface-variant font-medium">Tópico</label>
                <input 
                  type="text" 
                  placeholder="Ex: Padrões de Projeto" 
                  value={contentModalTitle} 
                  onChange={(e) => setContentModalTitle(e.target.value)}
                  className="bg-surface-container-high border border-outline-variant/30 rounded-lg px-3 py-1.5 text-xs text-on-surface outline-none focus:border-primary" 
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-outline-variant/20">
              {contentModalId && (
                <button 
                  type="button"
                  onClick={handleDeleteContent}
                  className="mr-auto px-3 py-1.5 rounded-lg text-xs bg-error/20 text-error hover:bg-error hover:text-on-error transition-colors cursor-pointer"
                >
                  Excluir
                </button>
              )}
              <button 
                type="button"
                onClick={() => setShowContentModal(false)}
                className="px-3 py-1.5 rounded-lg text-xs text-on-surface-variant hover:bg-white/5 transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button 
                type="button"
                onClick={handleSaveContentModal}
                className="px-4 py-1.5 rounded-lg bg-primary text-on-secondary text-xs font-bold hover:bg-primary-fixed transition-colors cursor-pointer"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
