// Geração do documento de impressão / PDF
// Segue o modelo institucional (cabeçalho com logotipo e rodapé) e reúne o conteúdo
// de três abas: Resumo do cálculo, Tabelas de diárias e Parâmetros.

import logotipoUrl from '../assets/img/logo-sjdh.png';

function urlAbsolutaDoLogo() {
  return new URL(logotipoUrl, window.location.href).href;
}

async function logoComoDataUrl() {
  try {
    const resposta = await fetch(urlAbsolutaDoLogo());
    if (!resposta.ok) throw new Error('logotipo indisponível');

    const blob = await resposta.blob();

    return await new Promise((resolver, rejeitar) => {
      const leitor = new FileReader();
      leitor.onload = () => resolver(leitor.result);
      leitor.onerror = rejeitar;
      leitor.readAsDataURL(blob);
    });
  } catch (erro) {
    // Reserva: URL absoluta (pode não carregar em alguns contextos de impressão)
    return urlAbsolutaDoLogo();
  }
}

function conteudoDaAba(id) {
  const painel = document.getElementById(id);
  return painel ? painel.innerHTML : '';
}

function conteudoDoResumo() {
  const area = document.getElementById('printArea');
  if (!area) return '';

  // Remove o título interno ("Resumo do cálculo"): a seção já tem o próprio cabeçalho
  const clone = area.cloneNode(true);
  const tituloInterno = clone.querySelector('h2');
  if (tituloInterno) tituloInterno.remove();

  return clone.innerHTML;
}

export async function imprimirResumo() {
  const titulo = 'Cálculo de Diárias';
  const logo = await logoComoDataUrl();

  const documento = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>${titulo}</title>
  <style>
    @page { size: A4 portrait; margin: 14mm; }

    * { box-sizing: border-box; }

    body {
      margin: 0;
      font-family: "Atkinson Hyperlegible", Arial, Helvetica, sans-serif;
      color: #1f2937;
      font-size: 10.5pt;
      line-height: 1.45;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    /* Cabeçalho/rodapé como grupos de tabela: repetem em todas as páginas */
    table.doc { width: 100%; border-collapse: collapse; }
    table.doc > thead > tr > td,
    table.doc > tfoot > tr > td,
    table.doc > tbody > tr > td { padding: 0; border: 0; vertical-align: top; }
    table.doc > thead > tr > td { padding-bottom: 4mm; }
    table.doc > tfoot > tr > td { padding-top: 4mm; }

    .doc-cabecalho { text-align: center; }
    .doc-cabecalho img { height: 17mm; }
    .doc-cabecalho .orgao {
      margin-top: 3mm;
      font-size: 9.5pt;
      font-weight: 700;
      letter-spacing: .06em;
      text-transform: uppercase;
      color: #12385c;
    }

    .doc-rodape {
      border-top: 1px solid #cbd5e1;
      padding-top: 2mm;
      text-align: center;
      font-size: 8pt;
      letter-spacing: .14em;
      text-transform: uppercase;
      color: #64748b;
    }

    .doc-titulo { margin: 0 0 2mm; font-size: 20pt; font-weight: 800; letter-spacing: -.01em; color: #12385c; }
    .doc-subtitulo { margin: 0 0 8mm; font-size: 10pt; color: #64748b; }

    .doc-secao { margin-bottom: 8mm; }

    .doc-secao > h2 {
      margin: 0 0 3mm;
      padding-bottom: 1.5mm;
      border-bottom: 2px solid #7c2b33;
      font-size: 13pt;
      letter-spacing: .02em;
      text-transform: uppercase;
      color: #7c2b33;
    }

    .doc-secao section.card > h2 {
      margin: 0 0 2mm;
      padding-bottom: 1mm;
      border-bottom: 1px solid #cbd5e1;
      font-size: 10.5pt;
      color: #12385c;
    }

    /* Resumo do cálculo */
    .print-summary-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3mm; }
    .print-item { border: 1px solid #d8e0ea; border-radius: 2mm; padding: 2.5mm 3mm; break-inside: avoid; }
    .print-item .label { font-size: 8pt; letter-spacing: .04em; text-transform: uppercase; color: #64748b; }
    .print-item .value { font-size: 10.5pt; font-weight: 700; color: #12385c; }
    .footer-note { margin-top: 3mm; font-size: 9pt; color: #475569; line-height: 1.5; }
    ul.compact { margin: 2mm 0 0 5mm; padding: 0; font-size: 9pt; color: #475569; }

    /* Tabelas */
    .tables { display: block; }
    .tables section.card { break-inside: avoid; margin-bottom: 6mm; }
    .doc-secao table { width: 100%; border-collapse: collapse; table-layout: fixed; font-size: 8.5pt; }
    .doc-secao table th,
    .doc-secao table td {
      border: 1px solid #cbd5e1;
      padding: 1.4mm 1.6mm;
      text-align: left;
      vertical-align: top;
      word-break: break-word;
    }
    .doc-secao table thead th { background: #eef2f7; color: #12385c; font-size: 7.5pt; }
    .doc-secao table th:first-child,
    .doc-secao table td:first-child { text-align: center; }
  </style>
</head>
<body>
  <table class="doc">
    <thead>
      <tr>
        <td>
          <div class="doc-cabecalho">
            <img src="${logo}" alt="Secretaria de Justiça, Direitos Humanos e Prevenção à Violência — Governo de Pernambuco" />
            <div class="orgao">Secretaria de Justiça, Direitos Humanos e Prevenção à Violência</div>
          </div>
        </td>
      </tr>
    </thead>

    <tfoot>
      <tr>
        <td>
          <div class="doc-rodape">Portal SJDH-PE</div>
        </td>
      </tr>
    </tfoot>

    <tbody>
      <tr>
        <td>
          <h1 class="doc-titulo">${titulo}</h1>
          <p class="doc-subtitulo">Resumo do cálculo, tabelas de diárias e parâmetros</p>

          <section class="doc-secao">
            <h2>1. Resumo do cálculo</h2>
            ${conteudoDoResumo()}
          </section>

          <section class="doc-secao">
            <h2>2. Tabelas de diárias</h2>
            ${conteudoDaAba('aba-tabelas')}
          </section>

          <section class="doc-secao">
            <h2>3. Parâmetros e Configurações</h2>
            ${conteudoDaAba('aba-parametros')}
          </section>
        </td>
      </tr>
    </tbody>
  </table>
</body>
</html>`;

  const janela = window.open('', '_blank', 'width=900,height=700');
  if (!janela) {
    alert('Não foi possível abrir a janela de impressão. Verifique se o bloqueador de janelas pop-up está desativado para este site.');
    return;
  }

  janela.document.open();
  janela.document.write(documento);
  janela.document.close();

  let impresso = false;
  const imprimir = () => {
    if (impresso) return;
    impresso = true;
    janela.focus();
    janela.print();
  };

  janela.addEventListener('load', imprimir);
  setTimeout(imprimir, 400);
}
