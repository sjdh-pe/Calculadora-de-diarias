export const Calculo = () => `
  <section class="card">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
      <h2 style="margin: 0;">Cálculo</h2>
      <div style="display: flex; gap: 10px;">
        <button id="calcularBtn" class="btn-primary" type="button">Calcular</button>
        <button id="salvarBtn" class="btn-success" type="button">Salvar</button>
      </div>
    </div>

    <!-- WRAPPER PARA DIVIDIR A TELA (Lado a Lado) -->
    <div class="calculo-layout-duplo">
      
      <!-- ================= LADO ESQUERDO: INPUTS ================= -->
      <div class="calculo-col-inputs">
        <div class="form-grid">
          <div class="full">
            <label for="nomeFuncionario">Nome do(a) Servidor(a)</label>
            <input id="nomeFuncionario" type="text" placeholder="Digite o nome completo" />
          </div>

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
            <div class="check-box">
              <input id="feriadoMunicipal" type="checkbox" aria-describedby="feriadoMunicipalHint" />
              <label for="feriadoMunicipal">
                <strong>Feriado municipal no retorno?</strong><br />
                Marque apenas quando a data de retorno coincidir com feriado municipal.
              </label>
            </div>
            <div class="hint" id="feriadoMunicipalHint">Sábado, domingo e feriado nacional já contam automaticamente como retorno integral, sem necessidade de marcação.</div>
          </div>
        </div>
      </div>
      <!-- ================= FIM DO LADO ESQUERDO ================= -->

      <!-- ================= LADO DIREITO: RESULTADOS ================= -->
      <div class="calculo-col-resultados">
        
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
            <div class="value" id="motivoRetorno" style="font-size:16px">—</div>
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

        <div class="result-box" style="margin-top: 20px;">
          <div class="label" style="font-size:12px;color:var(--muted);margin-bottom:8px;">Total calculado</div>
          <div class="value" id="totalGeral" style="font-size:32px;font-weight:800;">—</div>
          <div id="resumo" class="hint" style="font-size:14px;margin-top:10px;"></div>
        </div>

        <div id="alerta" class="alert warn" role="status" aria-live="polite" tabindex="-1" style="margin-top: 15px;">Preencha cargo/função, destino e datas para calcular.</div>
      </div>
      <!-- ================= FIM DO LADO DIREITO ================= -->
    </div>
  </section>
`;