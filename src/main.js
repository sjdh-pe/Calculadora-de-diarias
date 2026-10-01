// refatorado
import { Hero } from './components/hero.js';
import { Calculo } from './components/calculo.js';
import { Parametros } from './components/parametros.js';
import { Tabelas } from './components/tabelas.js';
import { Assinatura } from './components/assinatura.js';

// Importamos a função de inicialização da calculadora
import { iniciarCalculadora } from './calculadora.js';

// Monta a interface na tela
document.getElementById('app').innerHTML = `

  ${Hero()}

  <div class="grid">

    ${Calculo()}

    ${Parametros()}
  </div>

  ${Tabelas()}
  
  ${Assinatura()}
`;

// AGORA que o HTML existe na tela, iniciamos a lógica
iniciarCalculadora();