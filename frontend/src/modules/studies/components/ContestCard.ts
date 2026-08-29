export const ContestCard = () => `
<section class="glass-panel rounded-xl p-lg col-span-1 lg:col-span-4 flex flex-col glow-hover transition-all duration-300 relative overflow-hidden h-[400px]">
  <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
  
  <div class="flex justify-between items-start z-10">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
        <span class="material-symbols-outlined text-[20px]">workspace_premium</span>
      </div>
      <div>
        <h2 class="text-title-md font-title-md text-on-surface mb-0.5">Concurso Objetivo</h2>
        <p id="contest-position" class="text-body-sm text-on-surface-variant">Carregando...</p>
      </div>
    </div>
    <button id="contest-edit-btn" class="text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center bg-surface-container-highest rounded-md w-7 h-7 cursor-pointer">
      <span class="material-symbols-outlined text-[16px]">settings</span>
    </button>
  </div>

  <div class="flex-1 flex flex-col items-center justify-center z-10 relative mt-4">
    <div id="contest-not-configured" class="hidden text-center text-on-surface-variant">
      <span class="material-symbols-outlined text-4xl mb-2 opacity-50">event_busy</span>
      <p>Nenhum concurso configurado.</p>
    </div>

    <div id="contest-configured" class="flex flex-col items-center w-full">
      <h3 id="contest-name-display" class="text-lg font-bold text-on-surface mb-6 text-center"></h3>
      
      <!-- Split Flap Countdown -->
      <div class="flex gap-2 sm:gap-4 justify-center text-on-surface font-mono text-3xl sm:text-4xl font-bold">
        <div class="flex flex-col items-center">
          <div class="bg-surface-container-highest px-3 py-2 sm:px-4 sm:py-3 rounded-lg shadow-inner relative overflow-hidden">
             <span id="flap-days">00</span>
             <div class="absolute inset-x-0 top-1/2 h-px bg-background/80"></div>
          </div>
          <span class="text-[10px] text-on-surface-variant uppercase mt-2 tracking-widest font-sans">Dias</span>
        </div>
        <span class="mt-2 text-on-surface-variant opacity-50">:</span>
        <div class="flex flex-col items-center">
          <div class="bg-surface-container-highest px-3 py-2 sm:px-4 sm:py-3 rounded-lg shadow-inner relative overflow-hidden">
             <span id="flap-hours">00</span>
             <div class="absolute inset-x-0 top-1/2 h-px bg-background/80"></div>
          </div>
          <span class="text-[10px] text-on-surface-variant uppercase mt-2 tracking-widest font-sans">Horas</span>
        </div>
        <span class="mt-2 text-on-surface-variant opacity-50">:</span>
        <div class="flex flex-col items-center">
          <div class="bg-surface-container-highest px-3 py-2 sm:px-4 sm:py-3 rounded-lg shadow-inner relative overflow-hidden">
             <span id="flap-mins">00</span>
             <div class="absolute inset-x-0 top-1/2 h-px bg-background/80"></div>
          </div>
          <span class="text-[10px] text-on-surface-variant uppercase mt-2 tracking-widest font-sans">Min</span>
        </div>
        <span class="mt-2 text-on-surface-variant opacity-50">:</span>
        <div class="flex flex-col items-center">
          <div class="bg-surface-container-highest px-3 py-2 sm:px-4 sm:py-3 rounded-lg shadow-inner relative overflow-hidden">
             <span id="flap-secs" class="text-primary">00</span>
             <div class="absolute inset-x-0 top-1/2 h-px bg-background/80"></div>
          </div>
          <span class="text-[10px] text-on-surface-variant uppercase mt-2 tracking-widest font-sans">Seg</span>
        </div>
      </div>
      
      <div class="mt-8 flex items-center gap-2 text-on-surface-variant bg-surface-container px-4 py-2 rounded-full border border-outline-variant/20">
        <span class="material-symbols-outlined text-[18px]">calendar_month</span>
        <span id="contest-date-display" class="text-sm font-medium">--</span>
      </div>
    </div>
  </div>

  <!-- Modal Config -->
  <div id="contest-modal" class="hidden absolute inset-0 z-50 bg-surface/95 backdrop-blur-md flex-col p-lg">
    <div class="flex justify-between items-center mb-6">
      <h3 class="text-title-md font-bold text-on-surface">Configurar Concurso</h3>
      <button id="contest-modal-close" class="text-on-surface-variant hover:text-error transition-colors flex items-center justify-center bg-surface-container-highest rounded-full w-8 h-8 cursor-pointer shadow-sm">
        <span class="material-symbols-outlined text-[18px]">close</span>
      </button>
    </div>
    
    <div class="flex-1 overflow-y-auto space-y-4">
      <div class="flex flex-col gap-1.5">
        <label class="text-on-surface-variant text-body-sm font-medium">Nome do Concurso</label>
        <input type="text" id="cfg-contest-name" placeholder="Ex: Polícia Federal" class="w-full bg-surface-container border border-outline-variant/50 rounded-lg p-2.5 text-on-surface text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" />
      </div>
      <div class="flex flex-col gap-1.5">
        <label class="text-on-surface-variant text-body-sm font-medium">Cargo Almejado</label>
        <input type="text" id="cfg-contest-position" placeholder="Ex: Agente" class="w-full bg-surface-container border border-outline-variant/50 rounded-lg p-2.5 text-on-surface text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" />
      </div>
      <div class="flex flex-col gap-1.5">
        <label class="text-on-surface-variant text-body-sm font-medium">Data da Prova</label>
        <input type="date" id="cfg-contest-date" class="w-full bg-surface-container border border-outline-variant/50 rounded-lg p-2.5 text-on-surface text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" />
      </div>
      <button id="cfg-contest-save" class="w-full py-2.5 rounded-lg bg-primary text-on-secondary font-bold hover:bg-primary-fixed transition-colors mt-4 shadow-md">Salvar</button>
    </div>
  </div>
  
  <!-- Toast -->
  <div id="contest-toast" class="hidden absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#4CAF50] text-white px-4 py-2 rounded-full shadow-lg items-center gap-2 z-[60] transition-opacity duration-300 opacity-0 text-sm font-medium whitespace-nowrap">
    <span class="material-symbols-outlined text-[18px]">check_circle</span>
    <span id="contest-toast-msg">Salvo com sucesso!</span>
  </div>
</section>
`;

export const initContestCard = () => {
  const modal = document.getElementById('contest-modal')!;
  const btnEdit = document.getElementById('contest-edit-btn')!;
  const btnClose = document.getElementById('contest-modal-close')!;
  const btnSave = document.getElementById('cfg-contest-save') as HTMLButtonElement;
  
  const notConfigured = document.getElementById('contest-not-configured')!;
  const configured = document.getElementById('contest-configured')!;
  
  const elPosition = document.getElementById('contest-position')!;
  const elName = document.getElementById('contest-name-display')!;
  const elDate = document.getElementById('contest-date-display')!;
  
  const iName = document.getElementById('cfg-contest-name') as HTMLInputElement;
  const iPos = document.getElementById('cfg-contest-position') as HTMLInputElement;
  const iDate = document.getElementById('cfg-contest-date') as HTMLInputElement;

  const fDays = document.getElementById('flap-days')!;
  const fHours = document.getElementById('flap-hours')!;
  const fMins = document.getElementById('flap-mins')!;
  const fSecs = document.getElementById('flap-secs')!;

  let countdownInterval: any = null;
  let currentTargetDate: string | null = null;

  const showToast = (msg: string) => {
    const toast = document.getElementById('contest-toast')!;
    document.getElementById('contest-toast-msg')!.textContent = msg;
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

  const updateCountdown = () => {
    if (!currentTargetDate) return;
    // Assume exam is at 00:00 local time of the date
    const target = new Date(currentTargetDate + "T00:00:00").getTime();
    const now = new Date().getTime();
    const diff = target - now;
    
    if (diff <= 0) {
      fDays.textContent = '00';
      fHours.textContent = '00';
      fMins.textContent = '00';
      fSecs.textContent = '00';
      return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);
    
    fDays.textContent = String(days).padStart(2, '0');
    fHours.textContent = String(hours).padStart(2, '0');
    fMins.textContent = String(mins).padStart(2, '0');
    fSecs.textContent = String(secs).padStart(2, '0');
  };

  const renderCard = (data: any) => {
    if (data.contestName && data.examDate) {
      notConfigured.classList.add('hidden');
      configured.classList.remove('hidden');
      
      elPosition.textContent = data.targetPosition || 'Cargo não definido';
      elName.textContent = data.contestName;
      
      // Format date: "4 de Novembro de 2026"
      const d = new Date(data.examDate + "T00:00:00");
      elDate.textContent = new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }).format(d);
      
      currentTargetDate = data.examDate;
      if (countdownInterval) clearInterval(countdownInterval);
      updateCountdown();
      countdownInterval = setInterval(updateCountdown, 1000);
    } else {
      notConfigured.classList.remove('hidden');
      configured.classList.add('hidden');
      elPosition.textContent = 'Sem alvo';
      if (countdownInterval) clearInterval(countdownInterval);
    }
    
    iName.value = data.contestName || '';
    iPos.value = data.targetPosition || '';
    iDate.value = data.examDate || '';
  };

  const fetchState = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/studies/contest');
      if (res.ok) {
        const data = await res.json();
        renderCard(data);
      }
    } catch(e) {
      console.warn('Contest API fail', e);
    }
  };

  btnEdit.addEventListener('click', () => {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    fetchState();
  });
  btnClose.addEventListener('click', () => {
    modal.classList.remove('flex');
    modal.classList.add('hidden');
  });

  btnSave.addEventListener('click', async () => {
    const originalBg = btnSave.className;
    btnSave.disabled = true;
    btnSave.innerHTML = '<span class="material-symbols-outlined animate-spin text-[16px]">sync</span>';
    
    try {
      await fetch('http://localhost:8080/api/studies/contest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contestName: iName.value,
          targetPosition: iPos.value,
          examDate: iDate.value
        })
      });
      showToast('Salvo com sucesso!');
      await fetchState();
    } catch(e) {
      btnSave.innerHTML = 'Erro';
    }
    
    setTimeout(() => {
      btnSave.className = originalBg;
      btnSave.innerHTML = 'Salvar';
      btnSave.disabled = false;
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }, 500);
  });

  fetchState();
};
