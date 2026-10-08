export const Hero = () => `
  <section class="hero">
    <h1>Cálculo de Diárias</h1>
    <div class="top-actions">
      <button id="imprimirResumoBtn" type="button">Imprimir / PDF</button>
      <button class="secondary" id="limparFormularioBtn" type="button">Limpar</button>
      <button class="secondary" id="temaBtn" type="button" aria-pressed="false">
        <svg class="icone-lua" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
        <svg class="icone-sol" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
        <span class="sr-only">Alternar para tema escuro</span>
      </button>
    </div>
  </section>
`;
