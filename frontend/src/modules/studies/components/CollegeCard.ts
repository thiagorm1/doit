import { API_BASE_URL } from '../../../shared/config';
export const CollegeCard = () => `
<section class="glass-panel rounded-xl p-lg col-span-1 lg:col-span-4 flex flex-col glow-hover transition-all duration-300 relative overflow-hidden">
  <div class="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent pointer-events-none"></div>
  
  <div class="flex justify-between items-start mb-md relative z-10">
    <h2 class="font-headline-md text-headline-md text-on-surface flex items-center gap-sm">
      <span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1;">school</span>
      Faculdade
    </h2>
    <button id="college-edit-btn" class="text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center bg-surface-container-highest rounded-md w-7 h-7 cursor-pointer">
      <span class="material-symbols-outlined text-[16px]">settings</span>
    </button>
  </div>

  <div class="flex-1 overflow-y-auto pr-sm relative z-10 space-y-4 mt-sm custom-scrollbar">
    <!-- Card de Semestre -->
    <div class="bg-surface-container/50 rounded-lg p-md border border-outline-variant/10">
      <div class="flex justify-between items-center mb-xs">
        <span class="text-label-caps font-label-caps text-on-surface-variant uppercase tracking-widest">Semestre Atual</span>
        <span id="college-current-sem" class="text-primary font-bold">--</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-label-caps font-label-caps text-on-surface-variant uppercase tracking-widest">Conclusão</span>
        <span id="college-grad-sem" class="text-on-surface">--</span>
      </div>
    </div>
    
    <!-- Matérias -->
    <div class="space-y-2">
      <div class="flex justify-between items-center px-xs">
        <h3 class="text-label-caps font-label-caps text-on-surface-variant uppercase tracking-widest">Matérias Matriculadas</h3>
        <button id="btn-history-subjects" class="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 cursor-pointer">
          <span class="material-symbols-outlined text-[14px]">history</span>
        </button>
      </div>
      <!-- View Principal: Apenas matriculadas -->
      <div id="view-enrolled-subjects" class="bg-surface-container/50 rounded-lg p-sm border border-outline-variant/10 space-y-2">
        <div class="text-center text-body-sm text-on-surface-variant py-2">Nenhuma matéria...</div>
      </div>
      <!-- View Histórico: Todas as matérias cursadas -->
      <div id="view-history-subjects" class="hidden bg-surface-container-highest rounded-lg p-sm border border-outline-variant/30 space-y-2">
         <div class="text-center text-body-sm text-on-surface-variant py-2">Carregando histórico...</div>
      </div>
    </div>

    <!-- Provas -->
    <div class="space-y-2">
      <div class="flex justify-between items-center px-xs">
        <h3 class="text-label-caps font-label-caps text-on-surface-variant uppercase tracking-widest">Próximas Provas</h3>
        <button id="btn-history-exams" class="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 cursor-pointer">
          <span class="material-symbols-outlined text-[14px]">history</span>
        </button>
      </div>
      <!-- View Principal: Provas futuras -->
      <div id="view-upcoming-exams" class="bg-surface-container/50 rounded-lg p-sm border border-outline-variant/10 space-y-2">
        <div class="text-center text-body-sm text-on-surface-variant py-2">Nenhuma prova...</div>
      </div>
      <!-- View Histórico: Todas as provas -->
      <div id="view-history-exams" class="hidden bg-surface-container-highest rounded-lg p-sm border border-outline-variant/30 space-y-2">
        <div class="text-center text-body-sm text-on-surface-variant py-2">Carregando histórico...</div>
      </div>
    </div>
  </div>

  <!-- Toast de Sucesso -->
  <div id="college-toast" class="hidden absolute top-4 left-1/2 -translate-x-1/2 bg-[#4CAF50] text-white px-4 py-2 rounded-full shadow-lg text-sm font-bold items-center gap-2 z-[60] transition-opacity duration-300 opacity-0">
    <span class="material-symbols-outlined text-[18px]">check_circle</span>
    <span id="college-toast-msg">Sucesso!</span>
  </div>

  <!-- Modal de Configuração Faculdade (Overlay Interno) -->
  <div id="college-modal" class="hidden absolute inset-0 bg-surface/95 z-50 flex flex-col rounded-xl backdrop-blur-md border border-outline-variant/30 shadow-2xl">
    <div class="p-4 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-low/50">
      <h3 class="font-headline-md text-on-surface text-[18px]">Gestão Acadêmica</h3>
      <button id="college-modal-close" class="text-on-surface-variant hover:text-primary cursor-pointer transition-colors"><span class="material-symbols-outlined">close</span></button>
    </div>
    
    <!-- Tabs -->
    <div class="flex border-b border-outline-variant/20 bg-surface-container-low/30">
      <button id="tab-config" class="flex-1 py-3 text-primary font-bold border-b-2 border-primary text-body-sm transition-colors">Config</button>
      <button id="tab-subjects" class="flex-1 py-3 text-on-surface-variant hover:text-on-surface text-body-sm transition-colors">Matérias</button>
      <button id="tab-exams" class="flex-1 py-3 text-on-surface-variant hover:text-on-surface text-body-sm transition-colors">Provas</button>
    </div>

    <div class="flex-1 overflow-y-auto p-5 custom-scrollbar">
      
      <!-- TAB CONFIG -->
      <div id="content-config" class="flex flex-col space-y-5">
        <div class="flex flex-col gap-1.5">
          <label class="text-on-surface-variant text-body-sm font-medium">Semestre Atual</label>
          <input type="number" id="cfg-sem-atual" class="w-full bg-surface-container border border-outline-variant/50 rounded-lg p-2.5 text-on-surface text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" />
        </div>
        <div class="flex flex-col gap-1.5">
          <label class="text-on-surface-variant text-body-sm font-medium">Semestre de Conclusão</label>
          <input type="number" id="cfg-sem-conclusao" class="w-full bg-surface-container border border-outline-variant/50 rounded-lg p-2.5 text-on-surface text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" />
        </div>
        <button id="cfg-save-btn" class="w-full py-2.5 rounded-lg bg-primary text-on-secondary font-bold hover:bg-primary-fixed transition-colors mt-2 shadow-md">Salvar Configurações</button>
      </div>

      <!-- TAB MATÉRIAS -->
      <div id="content-subjects" class="hidden flex-col h-full">
        <div class="flex gap-2 mb-5">
           <button id="subtab-subj-add" class="px-4 py-1.5 bg-primary text-on-secondary rounded-full text-xs font-bold transition-colors shadow-sm">Adicionar</button>
           <button id="subtab-subj-active" class="px-4 py-1.5 bg-surface border border-outline-variant/30 text-on-surface-variant hover:text-on-surface rounded-full text-xs font-bold transition-colors">Ativos</button>
           <button id="subtab-subj-hist" class="px-4 py-1.5 bg-surface border border-outline-variant/30 text-on-surface-variant hover:text-on-surface rounded-full text-xs font-bold transition-colors">Histórico</button>
        </div>
        
        <div id="subj-form-area" class="bg-surface-container-low p-4 rounded-xl border border-outline-variant/20 shadow-sm flex flex-col space-y-3">
          <h4 class="text-on-surface text-body-sm font-bold mb-1">Matéria</h4>
          <input type="hidden" id="subj-id" />
          <input type="text" id="subj-name" placeholder="Nome da Matéria" class="w-full bg-surface-container border border-outline-variant/50 rounded-lg p-2 text-on-surface text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" />
          <input type="text" id="subj-prof" placeholder="Nome do Professor (Opcional)" class="w-full bg-surface-container border border-outline-variant/50 rounded-lg p-2 text-on-surface text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" />
          <select id="subj-status" class="w-full bg-surface-container border border-outline-variant/50 rounded-lg p-2 text-on-surface text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all">
            <option value="ENROLLED">Matriculado Atualmente</option>
            <option value="COMPLETED">Concluída</option>
            <option value="PENDING">Pendente</option>
          </select>
          <div id="subj-enrolled-fields" class="flex gap-2">
            <input type="text" id="subj-days" placeholder="Dias (Ex: Seg, Qua)" class="flex-1 bg-surface-container border border-outline-variant/50 rounded-lg p-2 text-on-surface text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" />
            <input type="text" id="subj-schedule" placeholder="Horário (Ex: 19:00)" class="flex-1 bg-surface-container border border-outline-variant/50 rounded-lg p-2 text-on-surface text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" />
          </div>
          <div id="subj-completed-fields" class="hidden flex gap-2">
            <select id="subj-grade" class="flex-1 bg-surface-container border border-outline-variant/50 rounded-lg p-2 text-on-surface text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all">
              <option value="E">Excelente (E)</option>
              <option value="B">Bom (B)</option>
              <option value="R">Regular (R)</option>
              <option value="I">Insuficiente (I)</option>
            </select>
            <input type="number" id="subj-semester" placeholder="Semestre" class="flex-1 bg-surface-container border border-outline-variant/50 rounded-lg p-2 text-on-surface text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" />
          </div>
          <button id="subj-add-btn" class="w-full py-2.5 mt-2 rounded-lg bg-primary text-on-secondary text-sm font-bold hover:bg-primary-fixed transition-colors shadow-md">Salvar</button>
        </div>
        
        <div id="subj-active-list-area" class="hidden flex-1 overflow-y-auto space-y-2 pb-10">
          <div id="subj-active-list" class="space-y-2"></div>
        </div>

        <div id="subj-hist-list-area" class="hidden flex-1 overflow-y-auto space-y-2 pb-10">
          <div id="subj-hist-list" class="space-y-2"></div>
        </div>
      </div>

      <!-- TAB PROVAS -->
      <div id="content-exams" class="hidden flex-col h-full">
        <div class="flex gap-2 mb-5">
           <button id="subtab-exam-add" class="px-4 py-1.5 bg-primary text-on-secondary rounded-full text-xs font-bold transition-colors shadow-sm">Adicionar</button>
           <button id="subtab-exam-active" class="px-4 py-1.5 bg-surface border border-outline-variant/30 text-on-surface-variant hover:text-on-surface rounded-full text-xs font-bold transition-colors">Ativos</button>
           <button id="subtab-exam-hist" class="px-4 py-1.5 bg-surface border border-outline-variant/30 text-on-surface-variant hover:text-on-surface rounded-full text-xs font-bold transition-colors">Histórico</button>
        </div>
        
        <div id="exam-form-area" class="bg-surface-container-low p-4 rounded-xl border border-outline-variant/20 shadow-sm flex flex-col space-y-3">
          <h4 class="text-on-surface text-body-sm font-bold mb-1">Prova</h4>
          <input type="hidden" id="exam-id" />
          <input type="text" id="exam-title" placeholder="Título (Ex: Cálculo I - P1)" class="w-full bg-surface-container border border-outline-variant/50 rounded-lg p-2 text-on-surface text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" />
          <div class="flex gap-2">
            <input type="date" id="exam-date" class="flex-1 bg-surface-container border border-outline-variant/50 rounded-lg p-2 text-on-surface text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" />
            <input type="number" id="exam-sem" placeholder="Semestre" class="flex-1 bg-surface-container border border-outline-variant/50 rounded-lg p-2 text-on-surface text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" />
          </div>
          <input type="number" step="0.1" id="exam-grade" placeholder="Nota (Opcional, deixe vazio se ainda não fez)" class="w-full bg-surface-container border border-outline-variant/50 rounded-lg p-2 text-on-surface text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" />
          <button id="exam-add-btn" class="w-full py-2.5 mt-2 rounded-lg bg-primary text-on-secondary text-sm font-bold hover:bg-primary-fixed transition-colors shadow-md">Salvar</button>
        </div>
        
        <div id="exam-active-list-area" class="hidden flex-1 overflow-y-auto space-y-2 pb-10">
          <div id="exam-active-list" class="space-y-2"></div>
        </div>

        <div id="exam-hist-list-area" class="hidden flex-1 overflow-y-auto space-y-2 pb-10">
          <div id="exam-hist-list" class="space-y-2"></div>
        </div>
      </div>

    </div>
  </div>
</section>
`;

export const initCollegeCard = async () => {
  const elConfigSem = document.getElementById('college-current-sem')!;
  const elConfigGrad = document.getElementById('college-grad-sem')!;

  const showToast = (msg: string) => {
    const toast = document.getElementById('college-toast')!;
    document.getElementById('college-toast-msg')!.textContent = msg;
    toast.classList.remove('hidden');
    toast.classList.add('flex');
    requestAnimationFrame(() => {
      toast.classList.remove('opacity-0');
      toast.classList.add('opacity-100');
    });
    setTimeout(() => {
      toast.classList.remove('opacity-100');
      toast.classList.add('opacity-0');
      setTimeout(() => {
        toast.classList.remove('flex');
        toast.classList.add('hidden');
      }, 300);
    }, 3000);
  };

  const fetchState = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/studies/college`);
      if (res.ok) {
        const data = await res.json();
        renderCard(data);
        renderModalLists(data);
      }
    } catch (e) {
      console.warn("Backend college api not ready", e);
    }
  };

  const renderCard = (data: any) => {
    elConfigSem.textContent = `${data.config.currentSemester}º`;
    elConfigGrad.textContent = `${data.config.graduationSemester}º`;

    const enrolled = data.subjects.filter((s:any) => s.status === 'ENROLLED');
    const viewEnrolled = document.getElementById('view-enrolled-subjects')!;
    if (enrolled.length === 0) {
      viewEnrolled.innerHTML = `<div class="text-center text-body-sm text-on-surface-variant py-2">Nenhuma matéria matriculada</div>`;
    } else {
      viewEnrolled.innerHTML = enrolled.map((s:any) => `
        <div class="flex justify-between items-center border-b border-outline-variant/5 pb-1 last:border-0 last:pb-0">
          <div class="flex flex-col">
             <span class="text-body-sm text-on-surface">${s.name}</span>
             ${s.professor ? `<span class="text-[10px] text-on-surface-variant">Prof. ${s.professor}</span>` : ''}
          </div>
          <span class="text-[10px] text-primary">${(s.days ? s.days + (s.schedule ? ' - ' + s.schedule : '') : s.schedule) || 'Cursando'}</span>
        </div>
      `).join('');
    }

    const completed = data.subjects.filter((s:any) => s.status === 'COMPLETED');
    const viewHistorySubj = document.getElementById('view-history-subjects')!;
    if (completed.length === 0) {
      viewHistorySubj.innerHTML = `<div class="text-center text-body-sm text-on-surface-variant py-2">Nenhum histórico</div>`;
    } else {
      viewHistorySubj.innerHTML = completed.map((s:any) => `
        <div class="flex justify-between items-center border-b border-outline-variant/10 pb-1">
          <div class="flex flex-col">
            <span class="text-body-sm text-on-surface-variant">${s.name} (Sem ${s.semesterTaken})</span>
            ${s.professor ? `<span class="text-[10px] text-outline">Prof. ${s.professor}</span>` : ''}
          </div>
          <span class="text-xs font-bold text-on-surface bg-surface-container p-1 rounded">${s.grade}</span>
        </div>
      `).join('');
    }

    const today = new Date().toISOString().split('T')[0];
    const upcoming = data.exams.filter((e:any) => e.examDate >= today);
    const viewUpcoming = document.getElementById('view-upcoming-exams')!;
    if (upcoming.length === 0) {
      viewUpcoming.innerHTML = `<div class="text-center text-body-sm text-on-surface-variant py-2">Nenhuma prova marcada</div>`;
    } else {
      viewUpcoming.innerHTML = upcoming.map((e:any) => `
        <div class="flex justify-between items-center">
          <span class="text-body-sm text-on-surface">${e.title}</span>
          <span class="text-[10px] text-primary">${e.examDate}</span>
        </div>
      `).join('');
    }

    const viewHistoryExams = document.getElementById('view-history-exams')!;
    if (data.exams.length === 0) {
      viewHistoryExams.innerHTML = `<div class="text-center text-body-sm text-on-surface-variant py-2">Nenhum histórico</div>`;
    } else {
      viewHistoryExams.innerHTML = data.exams.map((e:any) => `
        <div class="flex justify-between items-center border-b border-outline-variant/10 pb-1">
          <div class="flex flex-col">
            <span class="text-body-sm text-on-surface-variant">${e.title}</span>
            <span class="text-[10px] text-on-surface-variant">${e.examDate} (Sem ${e.semester})</span>
          </div>
          <span class="text-xs font-bold text-on-surface bg-surface-container p-1 rounded">${e.grade != null ? e.grade : '-'}</span>
        </div>
      `).join('');
    }

    // Initialize modal config values
    (document.getElementById('cfg-sem-atual') as HTMLInputElement).value = data.config.currentSemester;
    (document.getElementById('cfg-sem-conclusao') as HTMLInputElement).value = data.config.graduationSemester;
  };

  const renderModalLists = (data: any) => {
    // Subjects Split
    const activeSubjs = data.subjects.filter((s:any) => s.status !== 'COMPLETED');
    const histSubjs = data.subjects.filter((s:any) => s.status === 'COMPLETED');

    const renderSubjRow = (s:any) => `
      <div class="bg-surface-container p-2 rounded flex justify-between items-center group">
        <div>
          <span class="block text-sm text-on-surface">${s.name}</span>
          ${s.professor ? `<span class="block text-[10px] text-on-surface-variant">Prof. ${s.professor}</span>` : ''}
          <span class="block text-xs text-on-surface-variant">${s.status} ${s.status === 'COMPLETED' ? `- Nota ${s.grade} (Sem ${s.semesterTaken})` : ((s.days ? ` - ${s.days}` : '') + (s.schedule ? ` - ${s.schedule}` : ''))}</span>
        </div>
        <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          ${s.status !== 'COMPLETED' ? `<button class="edit-subj text-primary hover:text-primary-fixed cursor-pointer" data-id="${s.id}" title="Editar / Concluir"><span class="material-symbols-outlined text-[18px]">edit</span></button>` : ''}
          <button class="delete-subj text-error hover:text-error/80 cursor-pointer" data-id="${s.id}"><span class="material-symbols-outlined text-[18px]">delete</span></button>
        </div>
      </div>
    `;

    document.getElementById('subj-active-list')!.innerHTML = activeSubjs.map(renderSubjRow).join('');
    document.getElementById('subj-hist-list')!.innerHTML = histSubjs.map(renderSubjRow).join('');

    // Exams Split
    const activeExams = data.exams.filter((e:any) => e.grade == null);
    const histExams = data.exams.filter((e:any) => e.grade != null);

    const renderExamRow = (e:any) => `
      <div class="bg-surface-container p-2 rounded flex justify-between items-center group">
        <div>
          <span class="block text-sm text-on-surface">${e.title}</span>
          <span class="block text-xs text-on-surface-variant">${e.examDate} - Nota: ${e.grade != null ? e.grade : '-'} (Sem ${e.semester})</span>
        </div>
        <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          ${e.grade == null ? `<button class="edit-exam text-primary hover:text-primary-fixed cursor-pointer" data-id="${e.id}" title="Editar / Lançar Nota"><span class="material-symbols-outlined text-[18px]">edit</span></button>` : ''}
          <button class="delete-exam text-error hover:text-error/80 cursor-pointer" data-id="${e.id}"><span class="material-symbols-outlined text-[18px]">delete</span></button>
        </div>
      </div>
    `;

    document.getElementById('exam-active-list')!.innerHTML = activeExams.map(renderExamRow).join('');
    document.getElementById('exam-hist-list')!.innerHTML = histExams.map(renderExamRow).join('');

    // Binds
    document.querySelectorAll('.delete-subj').forEach(btn => {
      btn.addEventListener('click', async (ev) => {
        const id = (ev.currentTarget as HTMLElement).getAttribute('data-id');
        await fetch(`${API_BASE_URL}/api/studies/college/subjects/${id}`, { method: 'DELETE' });
        fetchState();
      });
    });
    document.querySelectorAll('.delete-exam').forEach(btn => {
      btn.addEventListener('click', async (ev) => {
        const id = (ev.currentTarget as HTMLElement).getAttribute('data-id');
        await fetch(`${API_BASE_URL}/api/studies/college/exams/${id}`, { method: 'DELETE' });
        fetchState();
      });
    });

    // Edit logic for Subjects
    document.querySelectorAll('.edit-subj').forEach(btn => {
      btn.addEventListener('click', (ev) => {
        const id = (ev.currentTarget as HTMLElement).getAttribute('data-id');
        const s = activeSubjs.find((x:any) => x.id == id);
        if(s) {
          (document.getElementById('subj-id') as HTMLInputElement).value = s.id;
          (document.getElementById('subj-name') as HTMLInputElement).value = s.name;
          (document.getElementById('subj-prof') as HTMLInputElement).value = s.professor || '';
          (document.getElementById('subj-status') as HTMLSelectElement).value = s.status;
          (document.getElementById('subj-days') as HTMLInputElement).value = s.days || '';
          (document.getElementById('subj-schedule') as HTMLInputElement).value = s.schedule || '';
          
          document.getElementById('subj-status')!.dispatchEvent(new Event('change'));
          document.getElementById('subj-add-btn')!.innerHTML = 'Salvar Alterações';
          setSubjTab('add');
        }
      });
    });

    // Edit logic for Exams
    document.querySelectorAll('.edit-exam').forEach(btn => {
      btn.addEventListener('click', (ev) => {
        const id = (ev.currentTarget as HTMLElement).getAttribute('data-id');
        const e = activeExams.find((x:any) => x.id == id);
        if(e) {
          (document.getElementById('exam-id') as HTMLInputElement).value = e.id;
          (document.getElementById('exam-title') as HTMLInputElement).value = e.title;
          (document.getElementById('exam-date') as HTMLInputElement).value = e.examDate;
          (document.getElementById('exam-sem') as HTMLInputElement).value = e.semester || '';
          (document.getElementById('exam-grade') as HTMLInputElement).value = e.grade || '';
          
          document.getElementById('exam-add-btn')!.innerHTML = 'Salvar Alterações';
          setExamTab('add');
        }
      });
    });
  };

  // Históricos Toggle
  const btnHistSubj = document.getElementById('btn-history-subjects')!;
  const viewEnrolled = document.getElementById('view-enrolled-subjects')!;
  const viewHistSubj = document.getElementById('view-history-subjects')!;
  btnHistSubj.addEventListener('click', () => {
    viewEnrolled.classList.toggle('hidden');
    viewHistSubj.classList.toggle('hidden');
  });

  const btnHistExam = document.getElementById('btn-history-exams')!;
  const viewUpcoming = document.getElementById('view-upcoming-exams')!;
  const viewHistExam = document.getElementById('view-history-exams')!;
  btnHistExam.addEventListener('click', () => {
    viewUpcoming.classList.toggle('hidden');
    viewHistExam.classList.toggle('hidden');
  });

  // Modal Control
  const modal = document.getElementById('college-modal')!;
  document.getElementById('college-edit-btn')!.addEventListener('click', () => {
    modal.classList.remove('hidden');
    fetchState();
  });
  document.getElementById('college-modal-close')!.addEventListener('click', () => modal.classList.add('hidden'));

  // Tabs
  const tCfg = document.getElementById('tab-config')!;
  const tSub = document.getElementById('tab-subjects')!;
  const tExm = document.getElementById('tab-exams')!;
  const cCfg = document.getElementById('content-config')!;
  const cSub = document.getElementById('content-subjects')!;
  const cExm = document.getElementById('content-exams')!;

  const resetTabs = () => {
    [tCfg, tSub, tExm].forEach(t => {
      t.classList.remove('text-primary', 'font-bold', 'border-b-2', 'border-primary');
      t.classList.add('text-on-surface-variant');
    });
    [cCfg, cSub, cExm].forEach(c => {
      c.classList.remove('flex');
      c.classList.add('hidden');
    });
  };

  tCfg.addEventListener('click', () => { resetTabs(); tCfg.classList.add('text-primary', 'font-bold', 'border-b-2', 'border-primary'); cCfg.classList.remove('hidden'); cCfg.classList.add('flex'); });
  tSub.addEventListener('click', () => { resetTabs(); tSub.classList.add('text-primary', 'font-bold', 'border-b-2', 'border-primary'); cSub.classList.remove('hidden'); cSub.classList.add('flex'); });
  tExm.addEventListener('click', () => { resetTabs(); tExm.classList.add('text-primary', 'font-bold', 'border-b-2', 'border-primary'); cExm.classList.remove('hidden'); cExm.classList.add('flex'); });

  // Sub-tabs Logic
  const stSubjAdd = document.getElementById('subtab-subj-add')!;
  const stSubjActive = document.getElementById('subtab-subj-active')!;
  const stSubjHist = document.getElementById('subtab-subj-hist')!;
  const subjFormArea = document.getElementById('subj-form-area')!;
  const subjActiveArea = document.getElementById('subj-active-list-area')!;
  const subjHistArea = document.getElementById('subj-hist-list-area')!;

  const styleActiveTab = 'px-4 py-1.5 bg-primary text-on-secondary rounded-full text-xs font-bold transition-colors shadow-sm';
  const styleInactiveTab = 'px-4 py-1.5 bg-surface border border-outline-variant/30 text-on-surface-variant hover:text-on-surface rounded-full text-xs font-bold transition-colors';

  const setSubjTab = (mode: 'add' | 'active' | 'hist') => {
    stSubjAdd.className = mode === 'add' ? styleActiveTab : styleInactiveTab;
    stSubjActive.className = mode === 'active' ? styleActiveTab : styleInactiveTab;
    stSubjHist.className = mode === 'hist' ? styleActiveTab : styleInactiveTab;
    
    subjFormArea.classList.toggle('hidden', mode !== 'add');
    subjFormArea.classList.toggle('flex', mode === 'add');
    subjActiveArea.classList.toggle('hidden', mode !== 'active');
    subjHistArea.classList.toggle('hidden', mode !== 'hist');

    // Reset hidden id if changing away from form
    if (mode === 'add' && (document.getElementById('subj-id') as HTMLInputElement).value === '') {
      document.getElementById('subj-add-btn')!.innerHTML = 'Adicionar';
    }
  };
  stSubjAdd.addEventListener('click', () => setSubjTab('add'));
  stSubjActive.addEventListener('click', () => setSubjTab('active'));
  stSubjHist.addEventListener('click', () => setSubjTab('hist'));

  const stExamAdd = document.getElementById('subtab-exam-add')!;
  const stExamActive = document.getElementById('subtab-exam-active')!;
  const stExamHist = document.getElementById('subtab-exam-hist')!;
  const examFormArea = document.getElementById('exam-form-area')!;
  const examActiveArea = document.getElementById('exam-active-list-area')!;
  const examHistArea = document.getElementById('exam-hist-list-area')!;

  const setExamTab = (mode: 'add' | 'active' | 'hist') => {
    stExamAdd.className = mode === 'add' ? styleActiveTab : styleInactiveTab;
    stExamActive.className = mode === 'active' ? styleActiveTab : styleInactiveTab;
    stExamHist.className = mode === 'hist' ? styleActiveTab : styleInactiveTab;
    
    examFormArea.classList.toggle('hidden', mode !== 'add');
    examFormArea.classList.toggle('flex', mode === 'add');
    examActiveArea.classList.toggle('hidden', mode !== 'active');
    examHistArea.classList.toggle('hidden', mode !== 'hist');

    if (mode === 'add' && (document.getElementById('exam-id') as HTMLInputElement).value === '') {
      document.getElementById('exam-add-btn')!.innerHTML = 'Adicionar';
    }
  };
  stExamAdd.addEventListener('click', () => setExamTab('add'));
  stExamActive.addEventListener('click', () => setExamTab('active'));
  stExamHist.addEventListener('click', () => setExamTab('hist'));

  // Status Change Logic
  const stSel = document.getElementById('subj-status') as HTMLSelectElement;
  const cmpFlds = document.getElementById('subj-completed-fields')!;
  const schFld = document.getElementById('subj-enrolled-fields')!;
  stSel.addEventListener('change', () => {
    if (stSel.value === 'COMPLETED') {
      cmpFlds.classList.remove('hidden');
      schFld.classList.add('hidden');
    } else if (stSel.value === 'ENROLLED') {
      cmpFlds.classList.add('hidden');
      schFld.classList.remove('hidden');
    } else {
      cmpFlds.classList.add('hidden');
      schFld.classList.add('hidden');
    }
  });

  // Save Actions
  document.getElementById('cfg-save-btn')!.addEventListener('click', async () => {
    const cur = parseInt((document.getElementById('cfg-sem-atual') as HTMLInputElement).value);
    const grad = parseInt((document.getElementById('cfg-sem-conclusao') as HTMLInputElement).value);
    await fetch(`${API_BASE_URL}/api/studies/college/config`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ currentSemester: cur, graduationSemester: grad })
    });
    fetchState();
  });

  const subjAddBtn = document.getElementById('subj-add-btn') as HTMLButtonElement;
  subjAddBtn.addEventListener('click', async () => {
    const nameInput = document.getElementById('subj-name') as HTMLInputElement;
    const profInput = document.getElementById('subj-prof') as HTMLInputElement;
    const semInput = document.getElementById('subj-semester') as HTMLInputElement;
    const schInput = document.getElementById('subj-schedule') as HTMLInputElement;
    const daysInput = document.getElementById('subj-days') as HTMLInputElement;
    const name = nameInput.value;
    const prof = profInput.value;
    const sch = schInput.value;
    const days = daysInput.value;
    const status = stSel.value;
    const grade = (document.getElementById('subj-grade') as HTMLSelectElement).value;
    const sem = parseInt(semInput.value);
    const subjIdVal = (document.getElementById('subj-id') as HTMLInputElement).value;
    const subjId = subjIdVal ? parseInt(subjIdVal) : null;
    
    if(!name) return;

    // Start animation
    const originalBg = subjAddBtn.className;
    
    subjAddBtn.disabled = true;
    subjAddBtn.innerHTML = '<span class="material-symbols-outlined animate-spin text-[16px] leading-none" style="font-variation-settings: \'wght\' 600;">sync</span>';
    subjAddBtn.classList.add('opacity-80', 'cursor-not-allowed');

    try {
      await fetch(`${API_BASE_URL}/api/studies/college/subjects`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ 
          id: subjId,
          name, status, 
          professor: prof,
          schedule: status === 'ENROLLED' ? sch : null,
          days: status === 'ENROLLED' ? days : null,
          grade: status === 'COMPLETED' ? grade : null, 
          semesterTaken: status === 'COMPLETED' ? sem : null 
        })
      });
      
      // Success animation
      subjAddBtn.innerHTML = '<span class="material-symbols-outlined text-[16px] leading-none" style="font-variation-settings: \'wght\' 600;">check</span>';
      subjAddBtn.classList.remove('bg-primary', 'hover:bg-primary-fixed');
      subjAddBtn.classList.add('bg-[#4CAF50]', 'text-white');
      
      nameInput.value = '';
      profInput.value = '';
      schInput.value = '';
      daysInput.value = '';
      (document.getElementById('subj-id') as HTMLInputElement).value = '';
      if(status === 'COMPLETED') semInput.value = '';
      
      showToast(subjId ? 'Matéria atualizada com sucesso!' : 'Matéria adicionada com sucesso!');
      await fetchState();
    } catch (e) {
      subjAddBtn.innerHTML = 'Erro!';
    }

    // Reset after 1s
    setTimeout(() => {
      subjAddBtn.className = originalBg;
      subjAddBtn.innerHTML = 'Adicionar';
      subjAddBtn.disabled = false;
    }, 1000);
  });

  const examAddBtn = document.getElementById('exam-add-btn') as HTMLButtonElement;
  examAddBtn.addEventListener('click', async () => {
    const titleInput = document.getElementById('exam-title') as HTMLInputElement;
    const dateInput = document.getElementById('exam-date') as HTMLInputElement;
    const semInput = document.getElementById('exam-sem') as HTMLInputElement;
    const gradeInput = document.getElementById('exam-grade') as HTMLInputElement;
    
    const title = titleInput.value;
    const date = dateInput.value;
    const sem = parseInt(semInput.value);
    const gradeRaw = gradeInput.value;
    const examIdVal = (document.getElementById('exam-id') as HTMLInputElement).value;
    const examId = examIdVal ? parseInt(examIdVal) : null;
    
    if(!title || !date || !sem) return;

    // Start animation
    const originalBg = examAddBtn.className;
    
    examAddBtn.disabled = true;
    examAddBtn.innerHTML = '<span class="material-symbols-outlined animate-spin text-[16px] leading-none" style="font-variation-settings: \'wght\' 600;">sync</span>';
    examAddBtn.classList.add('opacity-80', 'cursor-not-allowed');

    try {
      await fetch(`${API_BASE_URL}/api/studies/college/exams`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ 
          id: examId,
          title, examDate: date, semester: sem,
          grade: gradeRaw ? parseFloat(gradeRaw) : null
        })
      });
      
      // Success animation
      examAddBtn.innerHTML = '<span class="material-symbols-outlined text-[16px] leading-none" style="font-variation-settings: \'wght\' 600;">check</span>';
      examAddBtn.classList.remove('bg-primary', 'hover:bg-primary-fixed');
      examAddBtn.classList.add('bg-[#4CAF50]', 'text-white');
      
      titleInput.value = '';
      dateInput.value = '';
      semInput.value = '';
      gradeInput.value = '';
      (document.getElementById('exam-id') as HTMLInputElement).value = '';
      
      showToast(examId ? 'Prova atualizada com sucesso!' : 'Prova adicionada com sucesso!');
      await fetchState();
    } catch (e) {
      examAddBtn.innerHTML = 'Erro!';
    }

    // Reset after 1s
    setTimeout(() => {
      examAddBtn.className = originalBg;
      examAddBtn.innerHTML = 'Adicionar';
      examAddBtn.disabled = false;
    }, 1000);
  });

  await fetchState();
};
