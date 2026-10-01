// refatorado
export const Tabelas = () => `
  <div class="tables">
    <section class="card">
      <h2>Tabela de diária integral</h2>
      <table>
        <thead>
          <tr>
            <th>Grupo</th>
            <th>Capitais (exceto Recife)</th>
            <th>Brasília/Manaus</th>
            <th>SP/RJ/BH/POA/Belém/Fortaleza/Salvador</th>
            <th>Demais cidades fora do Estado</th>
            <th>Dentro do Estado</th>
          </tr>
        </thead>
        <tbody id="tabelaIntegral"></tbody>
      </table>
    </section>

    <section class="card">
      <h2>Tabela de diária parcial</h2>
      <table>
        <thead>
          <tr>
            <th>Grupo</th>
            <th>Capitais (exceto Recife)</th>
            <th>Brasília/Manaus</th>
            <th>SP/RJ/BH/POA/Belém/Fortaleza/Salvador</th>
            <th>Demais cidades fora do Estado</th>
            <th>Dentro do Estado</th>
          </tr>
        </thead>
        <tbody id="tabelaParcial"></tbody>
      </table>
    </section>
  </div>
`;