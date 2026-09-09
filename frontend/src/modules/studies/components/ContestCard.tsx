import React, { useState, useEffect, useRef } from 'react';
import { API_BASE_URL } from '../../../shared/config';

interface ContestData {
  contestName?: string;
  targetPosition?: string;
  examDate?: string;
}

interface SplitFlapProps {
  val: string;
  label: string;
}

const SplitFlap: React.FC<SplitFlapProps> = ({ val, label }) => {
  const [displayedVal, setDisplayedVal] = useState(val);
  const [isFlipping, setIsFlipping] = useState(false);
  const prevValRef = useRef(val);

  useEffect(() => {
    if (prevValRef.current !== val) {
      prevValRef.current = val;
      setIsFlipping(true);
      const timer = setTimeout(() => {
        setDisplayedVal(val);
      }, 200);
      const resetTimer = setTimeout(() => {
        setIsFlipping(false);
      }, 400);
      return () => {
        clearTimeout(timer);
        clearTimeout(resetTimer);
      };
    }
  }, [val]);

  return (
    <div className="flex flex-col items-center" style={{ perspective: '1000px' }}>
      <div className={`bg-surface-container-highest px-2 py-1 rounded shadow-inner relative overflow-hidden ${
        isFlipping ? 'animate-flip-plate' : ''
      }`}>
        <span className="relative z-10 block font-mono text-2xl font-bold text-on-surface">
          {displayedVal}
        </span>
        <div className="absolute inset-x-0 top-1/2 h-px bg-background/80 z-20" />
      </div>
      <span className="text-[9px] text-on-surface-variant uppercase mt-1 tracking-widest font-sans">
        {label}
      </span>
    </div>
  );
};

export const ContestCard: React.FC = () => {
  const [data, setData] = useState<ContestData>({});
  const [showModal, setShowModal] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form state
  const [nameInput, setNameInput] = useState('');
  const [posInput, setPosInput] = useState('');
  const [dateInput, setDateInput] = useState('');

  // Countdown state
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    mins: '00',
    secs: '00'
  });

  const fetchState = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/studies/contest`);
      if (res.ok) {
        const json = await res.json();
        setData(json);
        setNameInput(json.contestName || '');
        setPosInput(json.targetPosition || '');
        setDateInput(json.examDate || '');
      }
    } catch (e) {
      console.warn('Contest API fail', e);
    }
  };

  useEffect(() => {
    fetchState();
  }, []);

  useEffect(() => {
    if (!data.examDate) return;

    const calculate = () => {
      const target = new Date(data.examDate + "T00:00:00").getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: '00', hours: '00', mins: '00', secs: '00' });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        mins: String(mins).padStart(2, '0'),
        secs: String(secs).padStart(2, '0')
      });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [data.examDate]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await fetch(`${API_BASE_URL}/api/studies/contest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contestName: nameInput,
          targetPosition: posInput,
          examDate: dateInput
        })
      });
      showToast('Salvo com sucesso!');
      await fetchState();
      setShowModal(false);
    } catch (e) {
      alert('Erro ao salvar concurso');
    } finally {
      setIsSaving(false);
    }
  };

  const isConfigured = Boolean(data.contestName && data.examDate);

  const formattedExamDate = data.examDate ? (() => {
    try {
      const d = new Date(data.examDate + "T00:00:00");
      return new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }).format(d);
    } catch {
      return data.examDate;
    }
  })() : '';

  return (
    <div className="h-full flex flex-col">
      <section className="glass-panel rounded-xl p-md flex flex-col glow-hover transition-all duration-300 relative overflow-hidden group h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
        
        <div className="flex justify-between items-center z-10 mb-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-primary">workspace_premium</span>
            <div className="leading-tight">
              <h2 className="text-sm font-bold text-on-surface">
                {isConfigured ? data.contestName : 'Concurso Objetivo'}
              </h2>
              <p className="text-[10px] text-on-surface-variant">
                {isConfigured ? (data.targetPosition || 'Cargo não definido') : 'Sem alvo configurado'}
              </p>
            </div>
          </div>
          <button 
            type="button"
            onClick={() => setShowModal(true)}
            className="text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center bg-surface-container-highest rounded-md w-6 h-6 cursor-pointer"
            title="Configurar Concurso"
          >
            <span className="material-symbols-outlined text-[14px]">settings</span>
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center z-10 relative">
          {!isConfigured ? (
            <div className="text-center text-on-surface-variant">
              <span className="material-symbols-outlined text-xl mb-1 opacity-50">event_busy</span>
              <p className="text-xs">Não configurado</p>
            </div>
          ) : (
            <div className="flex flex-col items-center w-full">
              {/* Split Flap Countdown */}
              <div className="flex gap-2 justify-center text-on-surface font-mono text-2xl font-bold mt-1">
                <SplitFlap val={timeLeft.days} label="Dias" />
                <span className="mt-1 text-on-surface-variant opacity-50">:</span>
                <SplitFlap val={timeLeft.hours} label="Horas" />
                <span className="mt-1 text-on-surface-variant opacity-50">:</span>
                <SplitFlap val={timeLeft.mins} label="Min" />
                <span className="mt-1 text-on-surface-variant opacity-50">:</span>
                <SplitFlap val={timeLeft.secs} label="Seg" />
              </div>

              <div className="mt-3 flex items-center gap-1.5 text-[10px] text-on-surface-variant bg-surface-container/60 px-2.5 py-1 rounded-full border border-outline-variant/10">
                <span className="material-symbols-outlined text-[12px] text-primary">calendar_month</span>
                <span>{formattedExamDate}</span>
              </div>
            </div>
          )}
        </div>

        {/* Modal de Configuração */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-surface-container border border-outline-variant/40 rounded-xl p-5 w-full max-w-sm flex flex-col gap-4 shadow-2xl">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">settings</span>
                  Configurar Concurso Alvo
                </h3>
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="text-on-surface-variant hover:text-on-surface cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] text-on-surface-variant font-medium">Nome do Concurso</label>
                  <input 
                    type="text" 
                    placeholder="Ex: Banco do Brasil, PF, Bacen..." 
                    value={nameInput} 
                    onChange={(e) => setNameInput(e.target.value)}
                    className="bg-surface-container-high border border-outline-variant/30 rounded-lg px-3 py-1.5 text-xs text-on-surface outline-none focus:border-primary" 
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] text-on-surface-variant font-medium">Cargo Alvo</label>
                  <input 
                    type="text" 
                    placeholder="Ex: Agente de TI, Auditor..." 
                    value={posInput} 
                    onChange={(e) => setPosInput(e.target.value)}
                    className="bg-surface-container-high border border-outline-variant/30 rounded-lg px-3 py-1.5 text-xs text-on-surface outline-none focus:border-primary" 
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] text-on-surface-variant font-medium">Data da Prova</label>
                  <input 
                    type="date" 
                    value={dateInput} 
                    onChange={(e) => setDateInput(e.target.value)}
                    className="bg-surface-container-high border border-outline-variant/30 rounded-lg px-3 py-1.5 text-xs text-on-surface outline-none focus:border-primary" 
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-outline-variant/20">
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3 py-1.5 rounded-lg text-xs text-on-surface-variant hover:bg-white/5 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button 
                  type="button"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-4 py-1.5 rounded-lg bg-primary text-on-secondary text-xs font-bold hover:bg-primary-fixed transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {isSaving ? (
                    <span className="material-symbols-outlined animate-spin text-[16px]">sync</span>
                  ) : (
                    'Salvar'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Toast */}
        {toastMsg && (
          <div className="fixed bottom-6 right-6 bg-surface-container-high border border-primary/40 text-on-surface px-4 py-2 rounded-xl text-xs flex items-center gap-2 shadow-2xl z-50 animate-fade-in">
            <span className="material-symbols-outlined text-primary text-[16px]">check_circle</span>
            <span>{toastMsg}</span>
          </div>
        )}
      </section>
    </div>
  );
};
