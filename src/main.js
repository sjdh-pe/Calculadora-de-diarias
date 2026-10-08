// refatorado
import { Hero } from './components/hero.js';
import { Calculo } from './components/calculo.js';
import { Parametros } from './components/parametros.js';
import { Tabelas } from './components/tabelas.js';
import { Assinatura } from './components/assinatura.js';
import { Resumo } from './components/resumo.js';

// Importamos a função das abas
import { iniciarTabs } from './components/tabs.js';

// Importamos a função de inicialização da calculadora
import { iniciarCalculadora } from './calculadora.js';

// Importamos o controlador de tema (claro/escuro)
import { iniciarTema } from './utils/tema.js';

// Monta a interface na tela
document.getElementById('app').innerHTML = `
  ${Hero()}

  <!-- MENU DE ABAS -->
  <div class="tabs-header" role="tablist" aria-label="Seções da calculadora">
      <button class="tab-btn active" id="tab-calculo" role="tab" aria-selected="true" aria-controls="aba-calculo" tabindex="0" data-target="aba-calculo">Calculadora</button>
      <button class="tab-btn" id="tab-resumo" role="tab" aria-selected="false" aria-controls="aba-resumo" tabindex="-1" data-target="aba-resumo">Resumo do cálculo</button>
      <button class="tab-btn" id="tab-tabelas" role="tab" aria-selected="false" aria-controls="aba-tabelas" tabindex="-1" data-target="aba-tabelas">Tabelas de diárias</button>
      <button class="tab-btn" id="tab-parametros" role="tab" aria-selected="false" aria-controls="aba-parametros" tabindex="-1" data-target="aba-parametros">Parâmetros e Configurações</button>
  </div>

  <!-- ABA 1: CÁLCULO (Ativa por padrão) -->
  <div id="aba-calculo" class="tab-content active" role="tabpanel" aria-labelledby="tab-calculo" tabindex="0">
      <!-- Mantive a div grid caso seu CSS dependa dela -->
      <div class="grid">
          ${Calculo()}
      </div>
  </div>

  <!-- ABA 2: RESUMO (Nova aba!) -->
  <div id="aba-resumo" class="tab-content" role="tabpanel" aria-labelledby="tab-resumo" tabindex="0">
      <div class="grid">
          ${Resumo()}
      </div>
  </div>

  <!-- ABA 3: TABELAS -->
  <div id="aba-tabelas" class="tab-content" role="tabpanel" aria-labelledby="tab-tabelas" tabindex="0">
      ${Tabelas()}
  </div>

  <!-- ABA 4: PARÂMETROS -->
  <div id="aba-parametros" class="tab-content" role="tabpanel" aria-labelledby="tab-parametros" tabindex="0">
      <div class="grid">
          ${Parametros()}
      </div>
  </div>

  ${Assinatura()}
`;

// AGORA que o HTML existe na tela, iniciamos as lógicas
iniciarTabs(); // Liga os cliques dos botões das abas
iniciarCalculadora(); // Liga a lógica da calculadora
iniciarTema(); // Liga a alternância de tema claro/escuro