export const Calculo = () => `
  <section class="card">
    <h2>Cálculo</h2>
    <div class="form-grid">
      <div>
        <label for="cargo">Cargo/Função</label>
        <select id="cargo"></select>
      </div>

      <div>
        <label for="grupo">Grupo</label>
        <input id="grupo" type="text" readonly />
      </div>

      <div class="full">
        <label for="destino">Tipo de destino</label>
        <select id="destino"></select>
      </div>

      <div class="full dates-grid">
        <div>
          <label for="saida">Data de saída</label>
          <input id="saida" type="date" />
        </div>
        <div>
          <label for="retorno">Data de retorno</label>
          <input id="retorno" type="date" />
        </div>
      </div>

      <div class="full">
        <label>Feriado municipal no retorno?</label>
        <div class="check-box">
          <input id="feriadoMunicipal" type="checkbox" />
          <span>Marque apenas quando a data de retorno coincidir com feriado municipal.</span>
        </div>
        <div class="hint">Sábado, domingo e feriado nacional já contam automaticamente como retorno integral, sem necessidade de marcação.</div>
      </div>
    </div>

    <div class="stats">
      <div class="stat">
        <div class="label">Dias corridos</div>
        <div class="value" id="diasCorridos">—</div>
      </div>
      <div class="stat">
        <div class="label">Pernoites</div>
        <div class="value" id="pernoites">—</div>
      </div>
      <div class="stat">
        <div class="label">Retorno especial?</div>
        <div class="value" id="retornoEspecial">—</div>
      </div>
      <div class="stat">
        <div class="label">Motivo</div>
        <div class="value" id="motivoRetorno" style="font-size:18px">—</div>
      </div>
      <div class="stat">
        <div class="label">Qtde integrais</div>
        <div class="value" id="qtdIntegrais">—</div>
      </div>
      <div class="stat">
        <div class="label">Qtde parciais</div>
        <div class="value" id="qtdParciais">—</div>
      </div>
      <div class="stat">
        <div class="label">Valor integral</div>
        <div class="value" id="valorIntegral">—</div>
      </div>
      <div class="stat">
        <div class="label">Valor parcial</div>
        <div class="value" id="valorParcial">—</div>
      </div>
    </div>

    <div class="result-box">
      <div class="label" style="font-size:12px;color:var(--muted);margin-bottom:8px;">Total calculado</div>
      <div class="value" id="totalGeral" style="font-size:32px;font-weight:800;">—</div>
      <div id="resumo" class="hint" style="font-size:14px;margin-top:10px;"></div>
    </div>

    <div id="alerta" class="alert warn">Preencha cargo/função, destino e datas para calcular.</div>

    <section id="printArea" class="card print-summary">
      <h2>Resumo do cálculo</h2>
      <div class="print-summary-grid">
        <div class="print-item">
          <div class="label">Cargo/Função</div>
          <div class="value" id="printCargo">—</div>
        </div>
        <div class="print-item">
          <div class="label">Grupo</div>
          <div class="value" id="printGrupo">—</div>
        </div>
        <div class="print-item">
          <div class="label">Tipo de destino</div>
          <div class="value" id="printDestino">—</div>
        </div>
        <div class="print-item">
          <div class="label">Período</div>
          <div class="value" id="printPeriodo">—</div>
        </div>
        <div class="print-item">
          <div class="label">Retorno</div>
          <div class="value" id="printRetorno">—</div>
        </div>
        <div class="print-item">
          <div class="label">Quantitativo</div>
          <div class="value" id="printQuantitativo">—</div>
        </div>
        <div class="print-item">
          <div class="label">Valores aplicados</div>
          <div class="value" id="printValores">—</div>
        </div>
        <div class="print-item">
          <div class="label">Total calculado</div>
          <div class="value" id="printTotal">—</div>
        </div>
      </div>
      <div class="footer-note" id="printObservacao">Preencha os campos para gerar o resumo do cálculo.</div>
    </section>
  </section>
`;