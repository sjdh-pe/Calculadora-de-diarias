import { Assinatura } from './assinatura.js';

export const Hero = () => `
  <section class="hero">
    <div class="hero-conteudo">
      <h1>Cálculo de Diárias</h1>
      <div class="top-actions">
        <button id="imprimirResumoBtn">Imprimir / PDF</button>
        <button class="secondary" id="limparFormularioBtn">Limpar</button>
      </div>
    </div>
    ${Assinatura()}
  </section>
`;