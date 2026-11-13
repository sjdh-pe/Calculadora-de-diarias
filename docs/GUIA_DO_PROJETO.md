# Guia do projeto — Calculadora de Diárias

Este documento apresenta o necessário para uma pessoa nova entender, executar e manter a aplicação. Ele descreve o comportamento implementado no frontend; a API e a integração com a planilha são serviços externos e precisam ser providenciados separadamente.

## 1. Visão geral

A aplicação é uma página web multiparte de cálculo de diárias, feita em HTML, CSS e JavaScript com ES modules. O Vite fornece o servidor de desenvolvimento e o build. Não há framework de interface nem dependências externas de execução, APIs de terceiros ou CDNs.

O frontend permite preencher um cálculo, consultar os valores de referência e imprimir o resumo. O botão **Salvar** envia os dados para um backend. O formulário não é armazenado localmente e não há importação ou exportação de JSON.

Os valores cadastrados no código têm como referência o Decreto nº 55.723, de 31 de outubro de 2023. A aplicação não verifica se essa referência permanece vigente; confirme a norma, o enquadramento do beneficiário e os valores antes do uso administrativo.

## 2. Requisitos e início rápido

Instale Node.js em uma versão compatível com a versão de Vite declarada no projeto e npm. Na raiz do repositório:

```bash
npm install
npm run dev
```

O terminal informa a URL local a abrir no navegador. Para encerrar o servidor, use `Ctrl+C`.

Comandos disponíveis em `package.json`:

| Comando | Finalidade |
| --- | --- |
| `npm run dev` | Inicia o servidor local de desenvolvimento do Vite. |
| `npm run build` | Gera os arquivos estáticos de produção em `dist/`. |
| `npm run preview` | Serve localmente o build já gerado para pré-visualização. |

`npm run preview` não substitui o backend e não executa testes automatizados. O projeto não declara script de testes ou lint no `package.json`.

## 3. Como usar a aplicação

1. Na aba **Calculadora**, informe o nome completo do(a) servidor(a), selecione o cargo/função e confira o grupo preenchido automaticamente.
2. Selecione o tipo de destino e informe as datas de saída e retorno.
3. Marque **Feriado municipal no retorno?** somente quando o dia de retorno for feriado municipal.
4. Pressione **Calcular** para validar os dados e atualizar os resultados e o resumo.
5. Use a aba **Resumo do cálculo** para conferir a apresentação para impressão; **Imprimir / PDF** abre a janela de impressão do navegador, onde é possível imprimir ou selecionar uma opção de salvar como PDF.
6. Pressione **Salvar** apenas se o backend estiver disponível e for necessário registrar o cálculo.
7. **Limpar** apaga os campos e resultados da sessão atual.

As abas **Tabelas de diárias** e **Parâmetros e Configurações** mostram os valores, a classificação de cargos e as regras de retorno cadastradas no frontend.

### Validação do formulário

Nome do(a) servidor(a), cargo/função, destino, data de saída e data de retorno são obrigatórios. O nome é validado após remover espaços no início e no fim; um campo vazio ou preenchido apenas com espaços não é aceito. O retorno não pode ser anterior à saída. Ao faltar dado ou haver período inválido, os resultados são limpos e uma mensagem é apresentada; o salvamento também não prossegue.

## 4. Regras implementadas no cálculo

- Os dias corridos incluem as datas de saída e retorno.
- Cada dia entre saída e retorno conta como um pernoite; uma viagem de um único dia resulta em zero pernoites.
- A quantidade de diárias integrais começa pelo número de pernoites.
- Em retorno comum, a data de retorno conta como uma diária parcial.
- Em retorno considerado especial, a data de retorno conta como integral: sábado, domingo, feriado nacional reconhecido pelo código ou feriado municipal marcado pelo usuário.
- Os feriados nacionais calculados no código são 1º de janeiro, Paixão de Cristo, 21 de abril, 1º de maio, 7 de setembro, 12 de outubro, 2 de novembro, 15 de novembro, 20 de novembro e 25 de dezembro. Paixão de Cristo é calculada a partir da Páscoa.
- Não há consulta externa de feriados ou identificação automática de feriados municipais, estaduais, pontos facultativos ou outros calendários. A caixa manual só afeta a regra da data de retorno.
- O total é calculado pela soma de `quantidade_integral × valor_integral` e `quantidade_parcial × valor_parcial` para o grupo e destino selecionados.
- Se saída e retorno forem no mesmo dia, o código apresenta um dia corrido e nenhum pernoite; o retorno é parcial em dia comum e integral caso classificado como especial.

Os cálculos usam datas locais ao meio-dia para evitar mudança de dia por conversão de fuso. As regras e tabelas estão implementadas no frontend e precisam ser revisadas se a regulamentação mudar.

## 5. Valores e parâmetros

`src/parametros-diarias.js` é a fonte dos dados usados pela calculadora:

- `cargos`: rótulos de cargo/função e grupo associado.
- `destinos`: categorias de destino disponíveis.
- `tabela`: valores integrais e parciais indexados por grupo e categoria de destino.

Ao alterar os nomes dos destinos, mantenha os mesmos rótulos coerentes em `destinos`, nas tabelas e nos cabeçalhos apresentados pela interface. Para alterar valores, atualize os valores integrais e parciais de cada grupo. Revise também a referência normativa visível na aba de parâmetros e nesta documentação quando necessário.

## 6. Estrutura e responsabilidades

```text
.
├── docs/
│   └── GUIA_DO_PROJETO.md
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── README.md
└── src/
    ├── main.js
    ├── calculadora.js
    ├── parametros-diarias.js
    ├── style.css
    ├── api/
    │   └── api.js
    ├── components/
    │   ├── assinatura.js
    │   ├── calculo.js
    │   ├── hero.js
    │   ├── parametros.js
    │   ├── resumo.js
    │   ├── tabelas.js
    │   └── tabs.js
    ├── styles/
    │   ├── base.css
    │   ├── forms.css
    │   ├── hero.css
    │   ├── layout.css
    │   ├── print.css
    │   ├── responsive.css
    │   ├── results.css
    │   ├── signature.css
    │   └── tabs.css
    └── utils/
        ├── datas.js
        ├── elementos.js
        ├── formatadores.js
        └── impressao.js
```

- `index.html` fornece o elemento raiz da interface e carrega `src/main.js`.
- `src/main.js` monta as abas e inicializa a navegação e a calculadora.
- `src/calculadora.js` conecta elementos do formulário, valida entradas, calcula diárias, atualiza resultados e controla as ações **Calcular**, **Salvar**, **Limpar** e **Imprimir / PDF**.
- `src/parametros-diarias.js` concentra os cargos, destinos e valores.
- `src/components/` contém funções que retornam os trechos HTML da interface.
- `src/utils/elementos.js` lista os IDs do DOM usados pela calculadora.
- `src/utils/datas.js` implementa diferenças de dias, cálculo da Páscoa e classificação do retorno.
- `src/utils/formatadores.js` trata datas locais e formatação monetária.
- `src/utils/impressao.js` prepara uma página separada para a impressão do resumo.
- `src/styles/` separa os estilos por responsabilidade; `src/style.css` importa as folhas.
- `src/api/api.js` faz a chamada HTTP para salvar um cálculo.
- `vite.config.js` configura o proxy de API somente para o servidor de desenvolvimento.

## 7. Salvamento e integração com backend

O botão **Salvar** executa novamente a validação e o cálculo, e então envia uma requisição `POST` em JSON para:

```text
/api/calculo_diarias/registrar
```

Durante o desenvolvimento, o proxy do Vite remove o prefixo `/api` e encaminha a requisição para:

```text
http://localhost:8000/calculo_diarias/registrar
```

Portanto, para salvar localmente, um backend compatível precisa estar em execução na porta `8000` e aceitar essa rota. Sem ele, os cálculos continuam disponíveis, mas o salvamento falha e a interface exibe uma mensagem de erro.

O payload atual contém:

| Campo | Conteúdo |
| --- | --- |
| `user_id`, `user_name` | `null` no frontend atual. |
| `data` | Data do envio no formato `AAAA-MM-DD`. |
| `nome_funcionario` | Nome obrigatório informado, sem espaços no início ou no fim. |
| `grupo`, `cargo_funcionario` | Grupo calculado e rótulo do cargo/função. |
| `tipo_destino` | Categoria de destino escolhida. |
| `data_saida`, `data_retorno` | Datas do formulário no formato `AAAA-MM-DD`. |
| `dias_corridos`, `pernoites` | Quantitativos calculados. |
| `retorno_especial` | Texto `SIM` ou `NÃO`. |
| `quantidade_integrais`, `quantidade_parciais` | Quantidades calculadas. |
| `valor_integrais`, `valor_parciais` | Valor unitário aplicado para cada tipo. |
| `total_calculado` | Soma calculada em número. |

O backend deve aceitar JSON (`Content-Type: application/json`) e responder com status HTTP de sucesso e corpo JSON, pois o frontend interpreta a resposta como JSON. Respostas HTTP não exitosas são mostradas como falha de salvamento.

Em produção, o servidor que hospeda o frontend precisa encaminhar `/api/calculo_diarias/registrar` para o backend apropriado. O proxy definido em `vite.config.js` não configura a infraestrutura de produção.

### Planilha de registros

[Abrir a planilha de registros](https://docs.google.com/spreadsheets/d/1gxIb8RQm3amF4xNnV8r8AawZOgdejWiOY6jZda1tVhw/edit?gid=0#gid=0)

Esse link é um acesso à planilha, não uma integração implementada no navegador. O frontend não usa a API do Google, não possui credenciais e não grava diretamente na planilha. Para registrar nela, o backend que atende a rota acima deve implementar a integração e ter as permissões necessárias. Compartilhamento e acesso dependem da conta Google utilizada.

## 8. Persistência, privacidade e uso offline

- Não há armazenamento em `localStorage`, `sessionStorage` ou banco de dados no frontend.
- Os dados preenchidos permanecem apenas na página até que ela seja recarregada ou o formulário seja limpo.
- O frontend só envia os campos do cálculo ao backend quando **Salvar** é acionado. O nome obrigatório do servidor faz parte desse envio.
- Imprimir/gerar PDF usa os recursos do navegador; não cria um arquivo automaticamente no projeto.
- O bundle do frontend não depende de CDN para carregar a interface. A página pode ser hospedada em uma infraestrutura local sem internet, mas o **Salvar** depende da conectividade com o backend. O link da planilha requer acesso à internet e permissão Google.

## 9. Build e implantação

Gere os arquivos estáticos com:

```bash
npm run build
```

O resultado fica em `dist/`, pasta ignorada pelo Git. Para conferi-lo localmente:

```bash
npm run preview
```

Na implantação, publique o conteúdo de `dist/` em um servidor que sirva a aplicação e configure o encaminhamento da rota de API descrito acima. O Vite é ferramenta de desenvolvimento/build, não o backend de registros.

## 10. Verificações manuais úteis

Após alterar a interface, os parâmetros ou as regras:

1. Execute `npm run build` e confirme que o build termina sem erros.
2. Inicie `npm run dev` e verifique as quatro abas em desktop e tela estreita.
3. Faça cálculo de dia único, período com pernoite, retorno em fim de semana, feriado nacional e feriado municipal marcado.
4. Confirme validação para campos obrigatórios e para retorno anterior à saída.
5. Teste **Limpar** e a janela **Imprimir / PDF**.
6. Teste **Salvar** com backend compatível; sem backend, confirme que o erro é apresentado ao usuário.

Não há suíte automatizada de testes configurada neste repositório no momento.
