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

</section>

<!-- Modal de Configuração Faculdade -->
<div id="college-modal" class="hidden fixed inset-0 z-[100] items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
  <div class="bg-surface-container w-full max-w-xl max-h-[90vh] flex flex-col rounded-xl border border-outline-variant/30 shadow-2xl">
    <div class="p-4 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-highest rounded-t-xl">
      <h3 class="font-headline-md text-on-surface text-[18px]">Gestão Acadêmica</h3>
      <button id="college-modal-close" class="text-on-surface-variant hover:text-primary cursor-pointer"><span class="material-symbols-outlined">close</span></button>
    </div>
    
    <!-- Tabs -->
    <div class="flex border-b border-outline-variant/20 bg-surface-container-highest">
      <button id="tab-config" class="flex-1 py-3 text-primary font-bold border-b-2 border-primary text-body-sm">Config</button>
      <button id="tab-subjects" class="flex-1 py-3 text-on-surface-variant hover:text-on-surface text-body-sm">Matérias</button>
      <button id="tab-exams" class="flex-1 py-3 text-on-surface-variant hover:text-on-surface text-body-sm">Provas</button>
    </div>

    <div class="flex-1 overflow-y-auto p-4 custom-scrollbar">
      
      <!-- TAB CONFIG -->
      <div id="content-config" class="flex flex-col space-y-4">
        <div class="flex flex-col gap-1">
          <label class="text-on-surface-variant text-body-sm">Semestre Atual</label>
          <input type="number" id="cfg-sem-atual" class="w-full bg-surface-container-highest border border-outline-variant/50 rounded p-2 text-on-surface" />
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-on-surface-variant text-body-sm">Semestre de Conclusão</label>
          <input type="number" id="cfg-sem-conclusao" class="w-full bg-surface-container-highest border border-outline-variant/50 rounded p-2 text-on-surface" />
        </div>
        <button id="cfg-save-btn" class="w-full py-2 rounded bg-primary text-on-secondary font-bold hover:bg-primary-fixed transition-colors mt-4">Salvar Configurações</button>
      </div>

      <!-- TAB MATÉRIAS -->
      <div id="content-subjects" class="hidden flex-col h-full">
        <div class="flex gap-2 mb-4">
           <button id="subtab-subj-add" class="px-3 py-1 bg-primary text-on-secondary rounded-full text-xs font-bold transition-colors">Adicionar</button>
           <button id="subtab-subj-hist" class="px-3 py-1 bg-surface border border-outline-variant/30 text-on-surface-variant hover:text-on-surface rounded-full text-xs font-bold transition-colors">Histórico</button>
        </div>
        
        <div id="subj-form-area" class="bg-surface-container-highest p-3 rounded border border-outline-variant/20">
          <h4 class="text-on-surface text-body-sm font-bold mb-2">Nova Matéria</h4>
          <input type="text" id="subj-name" placeholder="Nome da Matéria" class="w-full bg-surface border border-outline-variant/50 rounded p-1 mb-2 text-on-surface text-sm" />
          <input type="text" id="subj-prof" placeholder="Nome do Professor (Opcional)" class="w-full bg-surface border border-outline-variant/50 rounded p-1 mb-2 text-on-surface text-sm" />
          <select id="subj-status" class="w-full bg-surface border border-outline-variant/50 rounded p-1 mb-2 text-on-surface text-sm">
            <option value="ENROLLED">Matriculado Atualmente</option>
            <option value="COMPLETED">Concluída</option>
            <option value="PENDING">Pendente</option>
          </select>
          <input type="text" id="subj-schedule" placeholder="Horário (Ex: 19:00 - 20:40)" class="w-full bg-surface border border-outline-variant/50 rounded p-1 mb-2 text-on-surface text-sm" />
          <div id="subj-completed-fields" class="hidden flex gap-2 mb-2">
            <select id="subj-grade" class="flex-1 bg-surface border border-outline-variant/50 rounded p-1 text-on-surface text-sm">
              <option value="E">Excelente (E)</option>
              <option value="B">Bom (B)</option>
              <option value="R">Regular (R)</option>
              <option value="I">Insuficiente (I)</option>
            </select>
            <input type="number" id="subj-semester" placeholder="Semestre" class="flex-1 bg-surface border border-outline-variant/50 rounded p-1 text-on-surface text-sm" />
          </div>
          <button id="subj-add-btn" class="w-full py-1 rounded bg-primary text-on-secondary text-sm font-bold hover:bg-primary-fixed transition-colors">Adicionar</button>
        </div>
        
        <div id="subj-list-area" class="hidden flex-1 overflow-y-auto space-y-2 pb-10">
          <div id="subj-list" class="space-y-2"></div>
        </div>
      </div>

      <!-- TAB PROVAS -->
      <div id="content-exams" class="hidden flex-col h-full">
        <div class="flex gap-2 mb-4">
           <button id="subtab-exam-add" class="px-3 py-1 bg-primary text-on-secondary rounded-full text-xs font-bold transition-colors">Adicionar</button>
           <button id="subtab-exam-hist" class="px-3 py-1 bg-surface border border-outline-variant/30 text-on-surface-variant hover:text-on-surface rounded-full text-xs font-bold transition-colors">Histórico</button>
        </div>
        
        <div id="exam-form-area" class="bg-surface-container-highest p-3 rounded border border-outline-variant/20">
          <h4 class="text-on-surface text-body-sm font-bold mb-2">Nova Prova</h4>
          <input type="text" id="exam-title" placeholder="Título (Ex: Cálculo I - P1)" class="w-full bg-surface border border-outline-variant/50 rounded p-1 mb-2 text-on-surface text-sm" />
          <div class="flex gap-2 mb-2">
            <input type="date" id="exam-date" class="flex-1 bg-surface border border-outline-variant/50 rounded p-1 text-on-surface text-sm" />
            <input type="number" id="exam-sem" placeholder="Semestre" class="flex-1 bg-surface border border-outline-variant/50 rounded p-1 text-on-surface text-sm" />
          </div>
          <input type="number" step="0.1" id="exam-grade" placeholder="Nota (Opcional, 0 a 10)" class="w-full bg-surface border border-outline-variant/50 rounded p-1 mb-2 text-on-surface text-sm" />
          <button id="exam-add-btn" class="w-full py-1 rounded bg-primary text-on-secondary text-sm font-bold hover:bg-primary-fixed transition-colors">Adicionar</button>
        </div>
        
        <div id="exam-list-area" class="hidden flex-1 overflow-y-auto space-y-2 pb-10">
          <div id="exam-list" class="space-y-2"></div>
        </div>
      </div>

    </div>
  </div>
</div>
`;

export const initCollegeCard = async () => {
  const elConfigSem = document.getElementById('college-current-sem')!;
  const elConfigGrad = document.getElementById('college-grad-sem')!;

  const fetchState = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/studies/college');
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
          <span class="text-[10px] text-primary">${s.schedule || 'Cursando'}</span>
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
    const listSubj = document.getElementById('subj-list')!;
    listSubj.innerHTML = data.subjects.map((s:any) => `
      <div class="bg-surface-container p-2 rounded flex justify-between items-center">
        <div>
          <span class="block text-sm text-on-surface">${s.name}</span>
          ${s.professor ? `<span class="block text-[10px] text-on-surface-variant">Prof. ${s.professor}</span>` : ''}
          <span class="block text-xs text-on-surface-variant">${s.status} ${s.status === 'COMPLETED' ? `- Nota ${s.grade} (Sem ${s.semesterTaken})` : (s.schedule ? `- ${s.schedule}` : '')}</span>
        </div>
        <button class="delete-subj text-error hover:text-error/80 cursor-pointer" data-id="${s.id}"><span class="material-symbols-outlined text-[16px]">delete</span></button>
      </div>
    `).join('');

    document.querySelectorAll('.delete-subj').forEach(btn => {
      btn.addEventListener('click', async (ev) => {
        const id = (ev.currentTarget as HTMLElement).getAttribute('data-id');
        await fetch(`http://localhost:8080/api/studies/college/subjects/${id}`, { method: 'DELETE' });
        fetchState();
      });
    });

    const listExam = document.getElementById('exam-list')!;
    listExam.innerHTML = data.exams.map((e:any) => `
      <div class="bg-surface-container p-2 rounded flex justify-between items-center">
        <div>
          <span class="block text-sm text-on-surface">${e.title}</span>
          <span class="block text-xs text-on-surface-variant">${e.examDate} - Nota: ${e.grade != null ? e.grade : '-'} (Sem ${e.semester})</span>
        </div>
        <button class="delete-exam text-error hover:text-error/80 cursor-pointer" data-id="${e.id}"><span class="material-symbols-outlined text-[16px]">delete</span></button>
      </div>
    `).join('');

    document.querySelectorAll('.delete-exam').forEach(btn => {
      btn.addEventListener('click', async (ev) => {
        const id = (ev.currentTarget as HTMLElement).getAttribute('data-id');
        await fetch(`http://localhost:8080/api/studies/college/exams/${id}`, { method: 'DELETE' });
        fetchState();
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
    modal.classList.add('flex');
    fetchState();
  });
  document.getElementById('college-modal-close')!.addEventListener('click', () => {
    modal.classList.remove('flex');
    modal.classList.add('hidden');
  });

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
  const stSubjHist = document.getElementById('subtab-subj-hist')!;
  const subjFormArea = document.getElementById('subj-form-area')!;
  const subjListArea = document.getElementById('subj-list-area')!;

  const setSubjTab = (mode: 'add' | 'hist') => {
    if(mode === 'add') {
      stSubjAdd.className = 'px-3 py-1 bg-primary text-on-secondary rounded-full text-xs font-bold transition-colors';
      stSubjHist.className = 'px-3 py-1 bg-surface border border-outline-variant/30 text-on-surface-variant hover:text-on-surface rounded-full text-xs font-bold transition-colors';
      subjFormArea.classList.remove('hidden');
      subjListArea.classList.add('hidden');
    } else {
      stSubjHist.className = 'px-3 py-1 bg-primary text-on-secondary rounded-full text-xs font-bold transition-colors';
      stSubjAdd.className = 'px-3 py-1 bg-surface border border-outline-variant/30 text-on-surface-variant hover:text-on-surface rounded-full text-xs font-bold transition-colors';
      subjFormArea.classList.add('hidden');
      subjListArea.classList.remove('hidden');
    }
  };
  stSubjAdd.addEventListener('click', () => setSubjTab('add'));
  stSubjHist.addEventListener('click', () => setSubjTab('hist'));

  const stExamAdd = document.getElementById('subtab-exam-add')!;
  const stExamHist = document.getElementById('subtab-exam-hist')!;
  const examFormArea = document.getElementById('exam-form-area')!;
  const examListArea = document.getElementById('exam-list-area')!;

  const setExamTab = (mode: 'add' | 'hist') => {
    if(mode === 'add') {
      stExamAdd.className = 'px-3 py-1 bg-primary text-on-secondary rounded-full text-xs font-bold transition-colors';
      stExamHist.className = 'px-3 py-1 bg-surface border border-outline-variant/30 text-on-surface-variant hover:text-on-surface rounded-full text-xs font-bold transition-colors';
      examFormArea.classList.remove('hidden');
      examListArea.classList.add('hidden');
    } else {
      stExamHist.className = 'px-3 py-1 bg-primary text-on-secondary rounded-full text-xs font-bold transition-colors';
      stExamAdd.className = 'px-3 py-1 bg-surface border border-outline-variant/30 text-on-surface-variant hover:text-on-surface rounded-full text-xs font-bold transition-colors';
      examFormArea.classList.add('hidden');
      examListArea.classList.remove('hidden');
    }
  };
  stExamAdd.addEventListener('click', () => setExamTab('add'));
  stExamHist.addEventListener('click', () => setExamTab('hist'));

  // Status Change Logic
  const stSel = document.getElementById('subj-status') as HTMLSelectElement;
  const cmpFlds = document.getElementById('subj-completed-fields')!;
  const schFld = document.getElementById('subj-schedule')!;
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
    await fetch('http://localhost:8080/api/studies/college/config', {
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
    const name = nameInput.value;
    const prof = profInput.value;
    const sch = schInput.value;
    const status = stSel.value;
    const grade = (document.getElementById('subj-grade') as HTMLSelectElement).value;
    const sem = parseInt(semInput.value);
    
    if(!name) return;

    // Start animation
    const originalText = subjAddBtn.innerHTML;
    const originalBg = subjAddBtn.className;
    
    subjAddBtn.disabled = true;
    subjAddBtn.innerHTML = '<span class="material-symbols-outlined animate-spin text-[16px] leading-none" style="font-variation-settings: \'wght\' 600;">sync</span>';
    subjAddBtn.classList.add('opacity-80', 'cursor-not-allowed');

    try {
      await fetch('http://localhost:8080/api/studies/college/subjects', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ 
          name, status, 
          professor: prof,
          schedule: status === 'ENROLLED' ? sch : null,
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
      if(status === 'COMPLETED') semInput.value = '';
      
      await fetchState();
    } catch (e) {
      subjAddBtn.innerHTML = 'Erro!';
    }

    // Reset after 1s
    setTimeout(() => {
      subjAddBtn.className = originalBg;
      subjAddBtn.innerHTML = originalText;
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
    
    if(!title || !date || !sem) return;

    // Start animation
    const originalText = examAddBtn.innerHTML;
    const originalBg = examAddBtn.className;
    
    examAddBtn.disabled = true;
    examAddBtn.innerHTML = '<span class="material-symbols-outlined animate-spin text-[16px] leading-none" style="font-variation-settings: \'wght\' 600;">sync</span>';
    examAddBtn.classList.add('opacity-80', 'cursor-not-allowed');

    try {
      await fetch('http://localhost:8080/api/studies/college/exams', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ 
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
      
      await fetchState();
    } catch (e) {
      examAddBtn.innerHTML = 'Erro!';
    }

    // Reset after 1s
    setTimeout(() => {
      examAddBtn.className = originalBg;
      examAddBtn.innerHTML = originalText;
      examAddBtn.disabled = false;
    }, 1000);
  });

  await fetchState();
};
