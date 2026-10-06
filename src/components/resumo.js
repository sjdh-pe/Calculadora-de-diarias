// components/resumo.js
export const Resumo = () => `
  <section id="printArea" class="card print-summary">
    <h2>Resumo do cálculo</h2>

    <div class="print-summary-grid">
      <div class="print-item"><div class="label">Nome</div><div class="value" id="printNome">—</div></div>
      <div class="print-item"><div class="label">Cargo/Função</div><div class="value" id="printCargo">—</div></div>
      <div class="print-item"><div class="label">Grupo</div><div class="value" id="printGrupo">—</div></div>
      <div class="print-item"><div class="label">Tipo de destino</div><div class="value" id="printDestino">—</div></div>
      <div class="print-item"><div class="label">Período</div><div class="value" id="printPeriodo">—</div></div>
      <div class="print-item"><div class="label">Retorno</div><div class="value" id="printRetorno">—</div></div>
      <div class="print-item"><div class="label">Quantitativo</div><div class="value" id="printQuantitativo">—</div></div>
      <div class="print-item"><div class="label">Valores aplicados</div><div class="value" id="printValores">—</div></div>
      <div class="print-item"><div class="label">Total calculado</div><div class="value" id="printTotal">—</div></div>
    </div>
    
    <div class="footer-note" id="printObservacao" style="margin-top: 20px;">
      Calcule as diárias na aba "Calculadora" para gerar este resumo.
    </div>
  </section>
`;