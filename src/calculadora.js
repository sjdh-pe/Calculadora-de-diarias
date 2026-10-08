import { cargos, destinos, tabela } from './parametros-diarias.js';
import { moeda, parseDate, formatarData } from './utils/formatadores.js';
import { dayDiff, classificarRetorno } from './utils/datas.js';
import { imprimirResumo } from './utils/impressao.js';
import { elementosIds } from './utils/elementos.js'
import { salvarDiaria } from './api/api.js';

export function iniciarCalculadora() {
  const el = Object.fromEntries(elementosIds.map(id => [id, document.getElementById(id)]));

  function popularSelects() {
    el.cargo.innerHTML = '<option value="">Selecione</option>' + cargos.map(c => `<option value="${c.nome}">${c.nome}</option>`).join('');
    el.destino.innerHTML = '<option value="">Selecione</option>' + destinos.map(d => `<option value="${d}">${d}</option>`).join('');
  }

  // Refatorado
  function popularTabelas() {
    const colunas = ['Capitais (exceto Recife)', 'Brasília/Manaus', 'SP/RJ/BH/POA/Belém/Fortaleza/Salvador', 'Demais cidades fora do Estado', 'Dentro do Estado'];
    const gerarLinhas = (tipo) => ['1', '2', '3'].map(g => 
      `<tr><td>${g}</td>${colunas.map(col => `<td>${moeda(tabela[g][tipo][col])}</td>`).join('')}</tr>`
    ).join('');

    el.tabelaCargos.innerHTML = cargos.map(c => `<tr><td>${c.nome}</td><td>${c.grupo}</td></tr>`).join('');
    el.tabelaIntegral.innerHTML = gerarLinhas('integral');
    el.tabelaParcial.innerHTML = gerarLinhas('parcial');
  }

  function atualizarGrupo() {
    el.grupo.value = cargos.find(c => c.nome === el.cargo.value)?.grupo || '';
  }

  function resetSaidas() {
    ['diasCorridos', 'pernoites', 'retornoEspecial', 'motivoRetorno', 'qtdIntegrais', 'qtdParciais', 'valorIntegral', 'valorParcial', 'totalGeral', 'printCargo', 'printGrupo', 'printDestino', 'printPeriodo', 'printRetorno', 'printQuantitativo', 'printValores', 'printTotal', 'printNome']
      .forEach(id => el[id].textContent = '—');
    el.resumo.textContent = '';
    el.printObservacao.textContent = 'Preencha os campos para gerar o resumo do cálculo.';
  }

  const camposDoFormulario = ['cargo', 'destino', 'saida', 'retorno'];

  function setAlert(tipo, texto) {
    el.alerta.className = `alert ${tipo}`;
    el.alerta.textContent = texto;
    // Erros são anunciados de imediato (assertivo); avisos e sucesso, de forma educada
    el.alerta.setAttribute('role', tipo === 'bad' ? 'alert' : 'status');
    el.alerta.setAttribute('aria-live', tipo === 'bad' ? 'assertive' : 'polite');
  }

  function limparErrosDeCampo() {
    camposDoFormulario.forEach(id => el[id].removeAttribute('aria-invalid'));
  }

  function marcarErroDeCampo(id) {
    el[id].setAttribute('aria-invalid', 'true');
  }

  function calcular() {
    atualizarGrupo();

    const { value: grupo } = el.grupo;
    const { value: destino } = el.destino;
    const saida = parseDate(el.saida.value);
    const retorno = parseDate(el.retorno.value);

    limparErrosDeCampo();

    const camposFaltando = [];
    if (!grupo) camposFaltando.push('cargo');
    if (!destino) camposFaltando.push('destino');
    if (!saida) camposFaltando.push('saida');
    if (!retorno) camposFaltando.push('retorno');

    if (camposFaltando.length) {
      resetSaidas();
      camposFaltando.forEach(marcarErroDeCampo);
      setAlert('bad', 'Preencha os campos destacados para calcular.');
      el[camposFaltando[0]].focus();
      return;
    }

    if (retorno < saida) {
      resetSaidas();
      marcarErroDeCampo('retorno');
      setAlert('bad', 'A data de retorno não pode ser anterior à data de saída.');
      el.retorno.focus();
      return;
    }

    const diff = dayDiff(saida, retorno);
    const diasCorridos = diff + 1;
    const pernoites = Math.max(0, diff);
    const retornoInfo = classificarRetorno(retorno, el.feriadoMunicipal.checked);
    const vInt = tabela[grupo].integral[destino];
    const vPar = tabela[grupo].parcial[destino];

    let qtdInt = pernoites + (retornoInfo.especial ? 1 : 0);
    let qtdPar = retornoInfo.especial ? Math.max(0, (diasCorridos > 0 ? 1 : 0) - 1) : (diasCorridos > 0 ? 1 : 0);
    const total = (qtdInt * vInt) + (qtdPar * vPar);

    // Atualiza a tela (Formulário)
    el.diasCorridos.textContent = diasCorridos;
    el.pernoites.textContent = pernoites;
    el.retornoEspecial.textContent = retornoInfo.especial ? 'Sim' : 'Não';
    el.motivoRetorno.textContent = retornoInfo.motivo;
    el.qtdIntegrais.textContent = qtdInt;
    el.qtdParciais.textContent = qtdPar;
    el.valorIntegral.textContent = moeda(vInt);
    el.valorParcial.textContent = moeda(vPar);
    el.totalGeral.textContent = moeda(total);
    el.resumo.textContent = `Cálculo: ${qtdInt} diária(s) integral(is) + ${qtdPar} diária(s) parcial(is), no destino “${destino}”, para beneficiário do grupo ${grupo}.`;
    
    // Atualiza a tela (Área de Impressão)
    el.printNome.textContent = el.nomeFuncionario.value || '—';
    el.printCargo.textContent = el.cargo.value || '—';
    el.printGrupo.textContent = grupo;
    el.printDestino.textContent = destino;
    el.printPeriodo.textContent = `${formatarData(saida)} a ${formatarData(retorno)}`;
    el.printRetorno.textContent = retornoInfo.especial ? `Integral automático (${retornoInfo.motivo})` : 'Parcial';
    el.printQuantitativo.textContent = `${qtdInt} integral(is) e ${qtdPar} parcial(is)`;
    el.printValores.textContent = `Integral: ${moeda(vInt)} | Parcial: ${moeda(vPar)}`;
    el.printTotal.textContent = moeda(total);

    // Refatorado
    const msg = retornoInfo.especial 
      ? `Retorno tratado automaticamente como diária integral. Motivo: ${retornoInfo.motivo}.` 
      : 'Cálculo realizado pela regra padrão: pernoites geram diárias integrais e o retorno gera diária parcial.';
    el.printObservacao.textContent = msg;
    setAlert('ok', msg);

    const dataformatada = new Date().toISOString().split('T')[0]; 
    const retornoEspecialString = retornoInfo.especial ? "SIM" : "NÃO";

    return {
      user_id: null,
      user_name: null,
      data: dataformatada,

      nome_funcionario: el.nomeFuncionario.value || null,
      grupo: el.grupo.value || null,
      cargo_funcionario: el.cargo.value || null,
      tipo_destino: destino,
      data_saida: el.saida.value || null,
      data_retorno: el.retorno.value || null,
      
      dias_corridos: diasCorridos,
      pernoites: pernoites,
      retorno_especial: retornoEspecialString,
      quantidade_integrais: qtdInt,
      quantidade_parciais: qtdPar,
      valor_integrais: vInt,
      valor_parciais: vPar,
      total_calculado: total,
    };
  }

  async function salvar() {
    const dadosParaSalvar = calcular();
    if (!dadosParaSalvar) return;

    el.salvarBtn.disabled = true;
    setAlert('warn', 'Salvando cálculo...');

    try {
      await salvarDiaria(dadosParaSalvar);
      setAlert('ok', 'Cálculo salvo com sucesso.');
    } catch (erro) {
      const mensagem = erro instanceof Error ? erro.message : 'Erro desconhecido.';
      setAlert('bad', `Não foi possível salvar o cálculo. ${mensagem}`);
    } finally {
      el.salvarBtn.disabled = false;
    }
  }

  function limparFormulario() {
    el.nomeFuncionario.value = '';
    el.cargo.value = el.destino.value = el.saida.value = el.retorno.value = '';
    el.feriadoMunicipal.checked = false;
    atualizarGrupo();
    limparErrosDeCampo();
    resetSaidas();
    setAlert('warn', 'Preencha cargo/função, destino e datas para calcular.');
  }

  el.calcularBtn.addEventListener('click', calcular);
  el.salvarBtn.addEventListener('click', salvar);
  el.cargo.addEventListener('change', atualizarGrupo);

  el.imprimirResumoBtn.addEventListener('click', imprimirResumo);
  el.limparFormularioBtn.addEventListener('click', limparFormulario);

  // Inicialização
  popularSelects();
  popularTabelas();
  atualizarGrupo();
  resetSaidas();
}