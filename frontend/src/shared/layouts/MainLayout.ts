export const Header = () => `
<header class="fixed top-0 left-0 w-full h-16 z-50 bg-surface-container/90 backdrop-blur-md flex justify-between items-center px-lg border-b border-outline-variant/10">
  <!-- Logo -->
  <div class="font-headline-md text-headline-md font-bold text-primary flex items-center gap-sm">
    <img src="/logo_transparent.png" alt="DOIT Logo" class="h-10 w-auto object-contain scale-[2.8] origin-left ml-16 drop-shadow-[0_0_15px_rgba(255,82,82,0.3)]" />
  </div>
  
  <!-- Navegação Centralizada -->
  <nav class="hidden md:flex gap-md absolute left-1/2 transform -translate-x-1/2 text-body-lg">
    <a class="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer px-sm py-xs rounded-md" href="#">Dashboard</a>
    <a class="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer px-sm py-xs rounded-md" href="#">Tasks</a>
    <a class="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer px-sm py-xs rounded-md" href="#">Agenda</a>
    <a class="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer px-sm py-xs rounded-md" href="#">Financeiro</a>
    <a class="text-primary font-bold bg-primary/10 rounded-lg px-sm py-xs transition-colors cursor-pointer" href="#">Estudos</a>
  </nav>

  <!-- Ações Direitas -->
  <div class="flex items-center gap-md">
    <button class="text-on-surface-variant hover:text-primary transition-colors cursor-pointer opacity-80 hover:opacity-100 flex items-center justify-center p-sm rounded-full hover:bg-surface-container-highest">
      <span class="material-symbols-outlined">settings</span>
    </button>
    <img alt="User avatar" class="w-10 h-10 rounded-full border border-outline-variant/30 object-cover cursor-pointer hover:border-primary transition-colors" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB44gcsHMwKNM-vNz1aQQzuPriEHYl0f6i7y-Z2CkYSm8R8Cc-LKTiYzvKP1AU6cOZTIssxxtVONvTNZ0ShtZ80BM2xpuccTY0Zpd8soiU3Oq2bsyK7-b8DNXGRR7rHg62Cl46tEgOA08IC-sF9SMluPZYIKiBuGajZ32234PLuK2_TYgTFAjc-RhnDjTSrfDkJJbhCuih15RHuxS_CihAS2O0hEfVUbH4IlHTbawXz1OqWdZJAM-0"/>
  </div>
</header>
`;

export const MainLayout = (children: string) => `
  ${Header()}
  <main class="pt-24 pb-12 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full relative z-0">
    ${children}
  </main>
`;
