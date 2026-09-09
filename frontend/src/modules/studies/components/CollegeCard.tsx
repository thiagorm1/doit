import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../../shared/config';

interface Subject {
  id: string;
  name: string;
  professor?: string;
  status: 'ENROLLED' | 'COMPLETED' | 'PENDING';
  daysOfWeek?: string;
  scheduleTime?: string;
  grade?: string;
  semester?: number;
}

interface Exam {
  id: string;
  title: string;
  examDate: string;
  semester?: number;
  grade?: number;
}

interface CollegeData {
  config?: {
    currentSemester?: number;
    graduationSemester?: number;
  };
  subjects?: Subject[];
  exams?: Exam[];
}

export const CollegeCard: React.FC = () => {
  const [data, setData] = useState<CollegeData>({ subjects: [], exams: [] });
  const [showModal, setShowModal] = useState(false);
  const [modalTab, setModalTab] = useState<'config' | 'subjects' | 'exams'>('config');
  const [showSubjHistory, setShowSubjHistory] = useState(false);
  const [showExamHistory, setShowExamHistory] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Config tab form
  const [cfgSemAtual, setCfgSemAtual] = useState<string>('');
  const [cfgSemGrad, setCfgSemGrad] = useState<string>('');

  // Subject tab form & state
  const [subjSubtab, setSubjSubtab] = useState<'add' | 'active' | 'hist'>('add');
  const [subjId, setSubjId] = useState<string>('');
  const [subjName, setSubjName] = useState<string>('');
  const [subjProf, setSubjProf] = useState<string>('');
  const [subjStatus, setSubjStatus] = useState<'ENROLLED' | 'COMPLETED' | 'PENDING'>('ENROLLED');
  const [subjDays, setSubjDays] = useState<string>('');
  const [subjSchedule, setSubjSchedule] = useState<string>('');
  const [subjGrade, setSubjGrade] = useState<string>('B');
  const [subjSemester, setSubjSemester] = useState<string>('');

  // Exam tab form & state
  const [examSubtab, setExamSubtab] = useState<'add' | 'active' | 'hist'>('add');
  const [examId, setExamId] = useState<string>('');
  const [examTitle, setExamTitle] = useState<string>('');
  const [examDate, setExamDate] = useState<string>('');
  const [examSem, setExamSem] = useState<string>('');
  const [examGrade, setExamGrade] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const fetchData = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/studies/college`);
      if (res.ok) {
        const json = await res.json();
        setData(json);
        if (json.config) {
          setCfgSemAtual(json.config.currentSemester?.toString() || '');
          setCfgSemGrad(json.config.graduationSemester?.toString() || '');
        }
      }
    } catch (e) {
      console.warn('College API offline', e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveConfig = async () => {
    try {
      await fetch(`${API_BASE_URL}/api/studies/college/config`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentSemester: parseInt(cfgSemAtual, 10) || 0,
          graduationSemester: parseInt(cfgSemGrad, 10) || 0
        })
      });
      showToast('Configurações salvas!');
      await fetchData();
    } catch (e) {
      alert('Erro ao salvar configurações');
    }
  };

  const handleSaveSubject = async () => {
    if (!subjName.trim()) {
      alert('Preencha o nome da matéria!');
      return;
    }

    try {
      await fetch(`${API_BASE_URL}/api/studies/college/subjects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: subjId || null,
          name: subjName,
          professor: subjProf,
          status: subjStatus,
          daysOfWeek: subjStatus === 'ENROLLED' ? subjDays : null,
          scheduleTime: subjStatus === 'ENROLLED' ? subjSchedule : null,
          grade: subjStatus === 'COMPLETED' ? subjGrade : null,
          semester: subjStatus === 'COMPLETED' ? (parseInt(subjSemester, 10) || 0) : null
        })
      });
      showToast('Matéria salva com sucesso!');
      setSubjId('');
      setSubjName('');
      setSubjProf('');
      setSubjDays('');
      setSubjSchedule('');
      setSubjSemester('');
      await fetchData();
      setSubjSubtab('active');
    } catch (e) {
      alert('Erro ao salvar matéria');
    }
  };

  const handleDeleteSubject = async (id: string) => {
    if (!confirm('Deseja excluir esta matéria?')) return;
    try {
      await fetch(`${API_BASE_URL}/api/studies/college/subjects/${id}`, { method: 'DELETE' });
      showToast('Matéria excluída!');
      await fetchData();
    } catch (e) {
      alert('Erro ao excluir matéria');
    }
  };

  const handleSaveExam = async () => {
    if (!examTitle.trim() || !examDate) {
      alert('Preencha o título e a data da prova!');
      return;
    }

    try {
      await fetch(`${API_BASE_URL}/api/studies/college/exams`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: examId || null,
          title: examTitle,
          examDate: examDate,
          semester: parseInt(examSem, 10) || 0,
          grade: examGrade !== '' ? parseFloat(examGrade) : null
        })
      });
      showToast('Prova salva com sucesso!');
      setExamId('');
      setExamTitle('');
      setExamDate('');
      setExamSem('');
      setExamGrade('');
      await fetchData();
      setExamSubtab('active');
    } catch (e) {
      alert('Erro ao salvar prova');
    }
  };

  const handleDeleteExam = async (id: string) => {
    if (!confirm('Deseja excluir esta prova?')) return;
    try {
      await fetch(`${API_BASE_URL}/api/studies/college/exams/${id}`, { method: 'DELETE' });
      showToast('Prova excluída!');
      await fetchData();
    } catch (e) {
      alert('Erro ao excluir prova');
    }
  };

  const enrolledSubjects = (data.subjects || []).filter(s => s.status === 'ENROLLED');
  const completedSubjects = (data.subjects || []).filter(s => s.status === 'COMPLETED');
  
  const nowStr = new Date().toISOString().split('T')[0];
  const upcomingExams = (data.exams || []).filter(e => e.examDate >= nowStr);
  const historyExams = data.exams || [];

  return (
    <section className="glass-panel rounded-xl p-lg col-span-1 lg:col-span-4 flex flex-col glow-hover transition-all duration-300 relative overflow-hidden h-full">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent pointer-events-none" />
      
      {/* Header */}
      <div className="flex justify-between items-start mb-md relative z-10">
        <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-sm">
          <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
            school
          </span>
          Faculdade
        </h2>
        <button 
          type="button"
          onClick={() => setShowModal(true)}
          className="text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center bg-surface-container-highest rounded-md w-7 h-7 cursor-pointer"
          title="Configurações da Faculdade"
        >
          <span className="material-symbols-outlined text-[16px]">settings</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-sm relative z-10 space-y-4 mt-sm custom-scrollbar">
        {/* Card de Semestre */}
        <div className="bg-surface-container/50 rounded-lg p-md border border-outline-variant/10">
          <div className="flex justify-between items-center mb-xs">
            <span className="text-label-caps font-label-caps text-on-surface-variant uppercase tracking-widest">Semestre Atual</span>
            <span className="text-primary font-bold">
              {data.config?.currentSemester ? `${data.config.currentSemester}º` : '--'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-label-caps font-label-caps text-on-surface-variant uppercase tracking-widest">Conclusão</span>
            <span className="text-on-surface">
              {data.config?.graduationSemester ? `${data.config.graduationSemester}º` : '--'}
            </span>
          </div>
        </div>
        
        {/* Matérias */}
        <div className="space-y-2">
          <div className="flex justify-between items-center px-xs">
            <h3 className="text-label-caps font-label-caps text-on-surface-variant uppercase tracking-widest">
              {showSubjHistory ? 'Histórico de Matérias' : 'Matérias Matriculadas'}
            </h3>
            <button 
              type="button"
              onClick={() => setShowSubjHistory(prev => !prev)}
              className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 cursor-pointer text-xs" 
              title={showSubjHistory ? 'Ver matriculadas' : 'Ver histórico completo'}
            >
              <span className="material-symbols-outlined text-[14px]">history</span>
            </button>
          </div>

          <div className="bg-surface-container/50 rounded-lg p-sm border border-outline-variant/10 space-y-2">
            {!showSubjHistory ? (
              enrolledSubjects.length === 0 ? (
                <div className="text-center text-body-sm text-on-surface-variant py-2">Nenhuma matéria matriculada...</div>
              ) : (
                enrolledSubjects.map(s => (
                  <div key={s.id} className="flex justify-between items-center p-2 rounded bg-surface-container-high/40 hover:bg-surface-container-high transition-colors">
                    <div>
                      <h4 className="text-xs font-bold text-on-surface">{s.name}</h4>
                      {s.daysOfWeek && (
                        <p className="text-[10px] text-on-surface-variant">{s.daysOfWeek} {s.scheduleTime ? `às ${s.scheduleTime}` : ''}</p>
                      )}
                    </div>
                    <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full font-bold">Matriculada</span>
                  </div>
                ))
              )
            ) : (
              completedSubjects.length === 0 ? (
                <div className="text-center text-body-sm text-on-surface-variant py-2">Nenhuma matéria no histórico...</div>
              ) : (
                completedSubjects.map(s => (
                  <div key={s.id} className="flex justify-between items-center p-2 rounded bg-surface-container-high/40">
                    <div>
                      <h4 className="text-xs font-bold text-on-surface">{s.name}</h4>
                      <p className="text-[10px] text-on-surface-variant">{s.semester ? `${s.semester}º Semestre` : ''}</p>
                    </div>
                    <span className="text-[10px] bg-tertiary/20 text-tertiary px-2 py-0.5 rounded font-bold">Nota: {s.grade || '--'}</span>
                  </div>
                ))
              )
            )}
          </div>
        </div>

        {/* Provas */}
        <div className="space-y-2">
          <div className="flex justify-between items-center px-xs">
            <h3 className="text-label-caps font-label-caps text-on-surface-variant uppercase tracking-widest">
              {showExamHistory ? 'Todas as Provas' : 'Próximas Provas'}
            </h3>
            <button 
              type="button"
              onClick={() => setShowExamHistory(prev => !prev)}
              className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 cursor-pointer text-xs" 
              title={showExamHistory ? 'Ver futuras' : 'Ver histórico'}
            >
              <span className="material-symbols-outlined text-[14px]">history</span>
            </button>
          </div>

          <div className="bg-surface-container/50 rounded-lg p-sm border border-outline-variant/10 space-y-2">
            {(!showExamHistory ? upcomingExams : historyExams).length === 0 ? (
              <div className="text-center text-body-sm text-on-surface-variant py-2">Nenhuma prova encontrada...</div>
            ) : (
              (!showExamHistory ? upcomingExams : historyExams).map(e => (
                <div key={e.id} className="flex justify-between items-center p-2 rounded bg-surface-container-high/40">
                  <div>
                    <h4 className="text-xs font-bold text-on-surface">{e.title}</h4>
                    <p className="text-[10px] text-on-surface-variant">{e.examDate}</p>
                  </div>
                  {e.grade !== undefined && e.grade !== null ? (
                    <span className="text-[10px] font-bold text-primary bg-primary/20 px-2 py-0.5 rounded">
                      Nota: {e.grade}
                    </span>
                  ) : (
                    <span className="text-[10px] text-on-surface-variant">Agendada</span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Modal de Gestão Acadêmica */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
          <div className="bg-surface border border-outline-variant/40 rounded-xl w-full max-w-md h-[550px] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-low/50">
              <h3 className="font-headline-md text-on-surface text-[18px]">Gestão Acadêmica</h3>
              <button 
                type="button"
                onClick={() => setShowModal(false)}
                className="text-on-surface-variant hover:text-primary cursor-pointer transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            {/* Tabs */}
            <div className="flex border-b border-outline-variant/20 bg-surface-container-low/30">
              {(['config', 'subjects', 'exams'] as const).map(tab => (
                <button 
                  key={tab}
                  type="button"
                  onClick={() => setModalTab(tab)}
                  className={`flex-1 py-3 text-body-sm transition-colors cursor-pointer capitalize ${
                    modalTab === tab 
                      ? 'text-primary font-bold border-b-2 border-primary' 
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {tab === 'config' ? 'Config' : tab === 'subjects' ? 'Matérias' : 'Provas'}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
              {/* TAB CONFIG */}
              {modalTab === 'config' && (
                <div className="flex flex-col space-y-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-on-surface-variant text-body-sm font-medium">Semestre Atual</label>
                    <input 
                      type="number" 
                      value={cfgSemAtual} 
                      onChange={(e) => setCfgSemAtual(e.target.value)}
                      className="w-full bg-surface-container border border-outline-variant/50 rounded-lg p-2.5 text-on-surface text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" 
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-on-surface-variant text-body-sm font-medium">Semestre de Conclusão</label>
                    <input 
                      type="number" 
                      value={cfgSemGrad} 
                      onChange={(e) => setCfgSemGrad(e.target.value)}
                      className="w-full bg-surface-container border border-outline-variant/50 rounded-lg p-2.5 text-on-surface text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" 
                    />
                  </div>
                  <button 
                    type="button"
                    onClick={handleSaveConfig}
                    className="w-full py-2.5 rounded-lg bg-primary text-on-secondary font-bold hover:bg-primary-fixed transition-colors mt-2 shadow-md cursor-pointer"
                  >
                    Salvar Configurações
                  </button>
                </div>
              )}

              {/* TAB MATÉRIAS */}
              {modalTab === 'subjects' && (
                <div className="flex flex-col h-full">
                  <div className="flex gap-2 mb-4">
                    <button 
                      type="button"
                      onClick={() => setSubjSubtab('add')}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                        subjSubtab === 'add' ? 'bg-primary text-on-secondary shadow-sm' : 'bg-surface border border-outline-variant/30 text-on-surface-variant'
                      }`}
                    >
                      Adicionar
                    </button>
                    <button 
                      type="button"
                      onClick={() => setSubjSubtab('active')}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                        subjSubtab === 'active' ? 'bg-primary text-on-secondary shadow-sm' : 'bg-surface border border-outline-variant/30 text-on-surface-variant'
                      }`}
                    >
                      Ativos ({enrolledSubjects.length})
                    </button>
                    <button 
                      type="button"
                      onClick={() => setSubjSubtab('hist')}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                        subjSubtab === 'hist' ? 'bg-primary text-on-secondary shadow-sm' : 'bg-surface border border-outline-variant/30 text-on-surface-variant'
                      }`}
                    >
                      Histórico ({completedSubjects.length})
                    </button>
                  </div>

                  {subjSubtab === 'add' && (
                    <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/20 shadow-sm flex flex-col space-y-3">
                      <h4 className="text-on-surface text-body-sm font-bold mb-1">
                        {subjId ? 'Editar Matéria' : 'Nova Matéria'}
                      </h4>
                      <input 
                        type="text" 
                        placeholder="Nome da Matéria" 
                        value={subjName} 
                        onChange={(e) => setSubjName(e.target.value)}
                        className="w-full bg-surface-container border border-outline-variant/50 rounded-lg p-2 text-on-surface text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" 
                      />
                      <input 
                        type="text" 
                        placeholder="Nome do Professor (Opcional)" 
                        value={subjProf} 
                        onChange={(e) => setSubjProf(e.target.value)}
                        className="w-full bg-surface-container border border-outline-variant/50 rounded-lg p-2 text-on-surface text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" 
                      />
                      <select 
                        value={subjStatus} 
                        onChange={(e) => setSubjStatus(e.target.value as any)}
                        className="w-full bg-surface-container border border-outline-variant/50 rounded-lg p-2 text-on-surface text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
                      >
                        <option value="ENROLLED">Matriculado Atualmente</option>
                        <option value="COMPLETED">Concluída</option>
                        <option value="PENDING">Pendente</option>
                      </select>
                      {subjStatus === 'ENROLLED' && (
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            placeholder="Dias (Ex: Seg, Qua)" 
                            value={subjDays} 
                            onChange={(e) => setSubjDays(e.target.value)}
                            className="flex-1 bg-surface-container border border-outline-variant/50 rounded-lg p-2 text-on-surface text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" 
                          />
                          <input 
                            type="text" 
                            placeholder="Horário (Ex: 19:00)" 
                            value={subjSchedule} 
                            onChange={(e) => setSubjSchedule(e.target.value)}
                            className="flex-1 bg-surface-container border border-outline-variant/50 rounded-lg p-2 text-on-surface text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" 
                          />
                        </div>
                      )}
                      {subjStatus === 'COMPLETED' && (
                        <div className="flex gap-2">
                          <select 
                            value={subjGrade} 
                            onChange={(e) => setSubjGrade(e.target.value)}
                            className="flex-1 bg-surface-container border border-outline-variant/50 rounded-lg p-2 text-on-surface text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
                          >
                            <option value="E">Excelente (E)</option>
                            <option value="B">Bom (B)</option>
                            <option value="R">Regular (R)</option>
                            <option value="I">Insuficiente (I)</option>
                          </select>
                          <input 
                            type="number" 
                            placeholder="Semestre" 
                            value={subjSemester} 
                            onChange={(e) => setSubjSemester(e.target.value)}
                            className="flex-1 bg-surface-container border border-outline-variant/50 rounded-lg p-2 text-on-surface text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" 
                          />
                        </div>
                      )}
                      <button 
                        type="button"
                        onClick={handleSaveSubject}
                        className="w-full py-2.5 mt-2 rounded-lg bg-primary text-on-secondary text-sm font-bold hover:bg-primary-fixed transition-colors shadow-md cursor-pointer"
                      >
                        Salvar
                      </button>
                    </div>
                  )}

                  {subjSubtab === 'active' && (
                    <div className="space-y-2">
                      {enrolledSubjects.map(s => (
                        <div key={s.id} className="p-3 bg-surface-container-high/50 rounded-lg flex justify-between items-center">
                          <div>
                            <span className="text-xs font-bold text-on-surface block">{s.name}</span>
                            <span className="text-[10px] text-on-surface-variant block">{s.professor || 'Sem professor'} | {s.daysOfWeek}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <button 
                              type="button"
                              onClick={() => {
                                setSubjId(s.id);
                                setSubjName(s.name);
                                setSubjProf(s.professor || '');
                                setSubjStatus(s.status);
                                setSubjDays(s.daysOfWeek || '');
                                setSubjSchedule(s.scheduleTime || '');
                                setSubjSubtab('add');
                              }}
                              className="p-1 text-on-surface-variant hover:text-primary"
                            >
                              <span className="material-symbols-outlined text-[16px]">edit</span>
                            </button>
                            <button 
                              type="button"
                              onClick={() => handleDeleteSubject(s.id)}
                              className="p-1 text-on-surface-variant hover:text-error"
                            >
                              <span className="material-symbols-outlined text-[16px]">delete</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {subjSubtab === 'hist' && (
                    <div className="space-y-2">
                      {completedSubjects.map(s => (
                        <div key={s.id} className="p-3 bg-surface-container-high/50 rounded-lg flex justify-between items-center">
                          <div>
                            <span className="text-xs font-bold text-on-surface block">{s.name}</span>
                            <span className="text-[10px] text-on-surface-variant block">Nota: {s.grade} | Semestre: {s.semester}º</span>
                          </div>
                          <button 
                            type="button"
                            onClick={() => handleDeleteSubject(s.id)}
                            className="p-1 text-on-surface-variant hover:text-error"
                          >
                            <span className="material-symbols-outlined text-[16px]">delete</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB PROVAS */}
              {modalTab === 'exams' && (
                <div className="flex flex-col h-full">
                  <div className="flex gap-2 mb-4">
                    <button 
                      type="button"
                      onClick={() => setExamSubtab('add')}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                        examSubtab === 'add' ? 'bg-primary text-on-secondary shadow-sm' : 'bg-surface border border-outline-variant/30 text-on-surface-variant'
                      }`}
                    >
                      Adicionar
                    </button>
                    <button 
                      type="button"
                      onClick={() => setExamSubtab('active')}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                        examSubtab === 'active' ? 'bg-primary text-on-secondary shadow-sm' : 'bg-surface border border-outline-variant/30 text-on-surface-variant'
                      }`}
                    >
                      Próximas ({upcomingExams.length})
                    </button>
                    <button 
                      type="button"
                      onClick={() => setExamSubtab('hist')}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                        examSubtab === 'hist' ? 'bg-primary text-on-secondary shadow-sm' : 'bg-surface border border-outline-variant/30 text-on-surface-variant'
                      }`}
                    >
                      Histórico ({historyExams.length})
                    </button>
                  </div>

                  {examSubtab === 'add' && (
                    <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/20 shadow-sm flex flex-col space-y-3">
                      <h4 className="text-on-surface text-body-sm font-bold mb-1">
                        {examId ? 'Editar Prova' : 'Nova Prova'}
                      </h4>
                      <input 
                        type="text" 
                        placeholder="Título (Ex: Cálculo I - P1)" 
                        value={examTitle} 
                        onChange={(e) => setExamTitle(e.target.value)}
                        className="w-full bg-surface-container border border-outline-variant/50 rounded-lg p-2 text-on-surface text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" 
                      />
                      <div className="flex gap-2">
                        <input 
                          type="date" 
                          value={examDate} 
                          onChange={(e) => setExamDate(e.target.value)}
                          className="flex-1 bg-surface-container border border-outline-variant/50 rounded-lg p-2 text-on-surface text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" 
                        />
                        <input 
                          type="number" 
                          placeholder="Semestre" 
                          value={examSem} 
                          onChange={(e) => setExamSem(e.target.value)}
                          className="flex-1 bg-surface-container border border-outline-variant/50 rounded-lg p-2 text-on-surface text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" 
                        />
                      </div>
                      <input 
                        type="number" 
                        step="0.1" 
                        placeholder="Nota (Opcional, deixe vazio se ainda não fez)" 
                        value={examGrade} 
                        onChange={(e) => setExamGrade(e.target.value)}
                        className="w-full bg-surface-container border border-outline-variant/50 rounded-lg p-2 text-on-surface text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" 
                      />
                      <button 
                        type="button"
                        onClick={handleSaveExam}
                        className="w-full py-2.5 mt-2 rounded-lg bg-primary text-on-secondary text-sm font-bold hover:bg-primary-fixed transition-colors shadow-md cursor-pointer"
                      >
                        Salvar
                      </button>
                    </div>
                  )}

                  {examSubtab === 'active' && (
                    <div className="space-y-2">
                      {upcomingExams.map(e => (
                        <div key={e.id} className="p-3 bg-surface-container-high/50 rounded-lg flex justify-between items-center">
                          <div>
                            <span className="text-xs font-bold text-on-surface block">{e.title}</span>
                            <span className="text-[10px] text-on-surface-variant block">{e.examDate}</span>
                          </div>
                          <button 
                            type="button"
                            onClick={() => handleDeleteExam(e.id)}
                            className="p-1 text-on-surface-variant hover:text-error"
                          >
                            <span className="material-symbols-outlined text-[16px]">delete</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {examSubtab === 'hist' && (
                    <div className="space-y-2">
                      {historyExams.map(e => (
                        <div key={e.id} className="p-3 bg-surface-container-high/50 rounded-lg flex justify-between items-center">
                          <div>
                            <span className="text-xs font-bold text-on-surface block">{e.title}</span>
                            <span className="text-[10px] text-on-surface-variant block">
                              Data: {e.examDate} {e.grade !== undefined && e.grade !== null ? `| Nota: ${e.grade}` : ''}
                            </span>
                          </div>
                          <button 
                            type="button"
                            onClick={() => handleDeleteExam(e.id)}
                            className="p-1 text-on-surface-variant hover:text-error"
                          >
                            <span className="material-symbols-outlined text-[16px]">delete</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 bg-[#4CAF50] text-white px-4 py-2 rounded-full shadow-lg text-sm font-bold flex items-center gap-2 z-[60] animate-fade-in">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          <span>{toastMsg}</span>
        </div>
      )}
    </section>
  );
};
