export const Parametros = () => `
  <section class="card">
    <h2>Parâmetros</h2>

    <table>
      <thead>
        <tr>
          <th>Cargo/Função</th>
          <th>Grupo</th>
        </tr>
      </thead>
      <tbody id="tabelaCargos"></tbody>
    </table>

    <div class="footer-note">
      A classificação acima serve como apoio operacional. Em caso de incongruência entre o enquadramento funcional e a tabela de beneficiários, a avaliação deve considerar preponderantemente a categorização da própria tabela de diárias.
      <ul class="compact">
        <li>Retorno em sábado ou domingo: integral automático.</li>
        <li>Retorno em feriado nacional: integral automático.</li>
        <li>Retorno em feriado municipal: marcar manualmente a caixa correspondente.</li>
        <li>Na ausência dessas hipóteses, o retorno permanece parcial.</li>
      </ul>
      <div style="margin-top:8px;"><strong>Referência:</strong> Valores parametrizados conforme o DECRETO Nº 55.723, DE 31 DE OUTUBRO DE 2023.</div>
    </div>
  </section>
`;