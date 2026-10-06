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

// Monta a interface na tela
document.getElementById('app').innerHTML = `
  ${Hero()}

  <!-- MENU DE ABAS -->
  <div class="tabs-header">
      <button class="tab-btn active" data-target="aba-calculo">Calculadora</button>
      <button class="tab-btn" data-target="aba-resumo">Resumo do cálculo</button>
      <button class="tab-btn" data-target="aba-tabelas">Tabelas de diárias</button>
      <button class="tab-btn" data-target="aba-parametros">Parâmetros e Configurações</button>
  </div>

  <!-- ABA 1: CÁLCULO (Ativa por padrão) -->
  <div id="aba-calculo" class="tab-content active">
      <!-- Mantive a div grid caso seu CSS dependa dela -->
      <div class="grid">
          ${Calculo()}
      </div>
  </div>

  <!-- ABA 2: RESUMO (Nova aba!) -->
  <div id="aba-resumo" class="tab-content">
      <div class="grid">
          ${Resumo()}
      </div>
  </div>

  <!-- ABA 3: TABELAS -->
  <div id="aba-tabelas" class="tab-content">
      ${Tabelas()}
  </div>

  <!-- ABA 4: PARÂMETROS -->
  <div id="aba-parametros" class="tab-content">
      <div class="grid">
          ${Parametros()}
      </div>
  </div>

  ${Assinatura()}
`;

// AGORA que o HTML existe na tela, iniciamos as lógicas
iniciarTabs(); // Liga os cliques dos botões das abas
iniciarCalculadora(); // Liga a lógica da calculadora