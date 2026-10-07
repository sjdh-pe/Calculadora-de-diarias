# Calculadora de Diárias

Aplicação web para cálculo de diárias de viagem com base no cargo ou função, tipo de destino e datas de saída e retorno. A ferramenta calcula as quantidades e os valores de diárias integrais e parciais por grupo, apresenta um resumo detalhado e permite imprimir ou salvar esse resumo em PDF pelo navegador.

Os valores parametrizados na aplicação têm como referência o Decreto nº 55.723, de 31 de outubro de 2023. O resultado deve ser utilizado considerando a regulamentação vigente e o enquadramento funcional do beneficiário.

## Funcionalidades

- Seleção do cargo/função e classificação automática do grupo.
- Seleção do tipo de destino e preenchimento das datas da viagem.
- Cálculo sob demanda pelo botão **Calcular**.
- Salvamento sob demanda na API pelo botão **Salvar**.
- Cálculo de dias corridos, pernoites, quantidades integrais e parciais, valores e total.
- Tratamento automático de sábado, domingo e feriado nacional no retorno como retorno integral.
- Opção para marcar feriado municipal no retorno.
- Resumo do cálculo em uma aba própria, atualizado após o cálculo.
- Impressão ou exportação do resumo para PDF pelo botão **Imprimir / PDF**.
- Consulta das tabelas de diárias integrais e parciais em uma aba própria.
- Consulta dos grupos por cargo/função e das regras de retorno na aba **Parâmetros e Configurações**.
- Envio dos dados do cálculo para a API local configurada no frontend somente pelo botão **Salvar**.
- Navegação por abas; a rolagem do conteúdo ocorre dentro da aba ativa.
- Rodapé de identidade visual compartilhado por todas as abas.

## Abas da aplicação

1. **Calculadora** — formulário da viagem, resultados do cálculo e mensagens de validação.
2. **Resumo do cálculo** — dados do beneficiário, período, quantitativos, valores e observação sobre a regra aplicada.
3. **Tabelas de diárias** — valores das diárias integrais e parciais por grupo e destino.
4. **Parâmetros e Configurações** — cargos e grupos, regras de retorno e referência normativa.

A identificação visual do projeto aparece uma única vez no rodapé, abaixo da área das abas.

Para atualizar o resumo, preencha os dados e pressione **Calcular**. O cálculo não é salvo automaticamente. Para persistir os dados, pressione **Salvar**. O formulário não recalcula automaticamente ao alterar cada campo.

## Integração com a API

Ao pressionar **Salvar** com os dados válidos, o frontend envia os dados da diária por `POST` em JSON para a rota `/api/calculo_diarias/registrar`. Durante o desenvolvimento com Vite, essa rota é encaminhada para:

```text
http://localhost:8000/calculo_diarias/registrar
```

Para persistir os registros, é necessário que um backend esteja executando em `http://localhost:8000` e aceite o formato de dados enviado pela aplicação. O proxy do Vite, configurado em `vite.config.js`, evita bloqueios de CORS durante o desenvolvimento; em produção, configure o servidor web para encaminhar `/api` ao backend. A API não faz parte dos scripts de execução do frontend descritos neste README.

Caso os registros devam ser enviados ao Google Planilhas, essa integração deve ser feita pelo backend que atende essa rota. O frontend não acessa diretamente a planilha nem contém credenciais do Google; a configuração da API e das permissões da planilha é externa a este projeto.

## Estrutura do projeto

```text
Calculadora-diarias/
├── index.html
├── package.json
├── vite.config.js              # proxy local da API durante o desenvolvimento
├── README.md
└── src/
    ├── main.js                  # montagem da interface e navegação
    ├── calculadora.js           # cálculo, eventos e envio de dados
    ├── parametros-diarias.js    # cargos, destinos e valores
    ├── style.css                # ponto de entrada dos estilos
    ├── api/
    │   └── api.js               # comunicação com o backend local
    ├── components/
    │   ├── assinatura.js        # identidade visual
    │   ├── calculo.js           # formulário e resultados imediatos
    │   ├── hero.js              # cabeçalho e ações globais
    │   ├── parametros.js        # conteúdo da aba de parâmetros
    │   ├── resumo.js             # conteúdo da aba de resumo
    │   ├── tabelas.js            # tabelas de valores
    │   └── tabs.js               # comportamento das abas
    ├── styles/
    │   ├── base.css              # variáveis, estilos globais e botões
    │   ├── forms.css             # campos e formulários
    │   ├── hero.css              # cabeçalho e cartões
    │   ├── layout.css            # grids e dimensões
    │   ├── print.css             # regras de impressão
    │   ├── responsive.css        # ajustes para telas menores
    │   ├── results.css           # resultados, alertas e tabelas
    │   ├── signature.css         # identidade visual
    │   └── tabs.css              # navegação e rolagem das abas
    └── utils/
        ├── datas.js              # diferenças de datas e classificação de retorno
        ├── elementos.js          # IDs dos elementos usados pela calculadora
        ├── formatadores.js       # moeda e formatação de datas
        └── impressao.js          # preparação e impressão do resumo
```

## Tecnologias

- HTML5 e CSS3.
- JavaScript com ES modules, sem framework.
- Vite para desenvolvimento e build de produção.
- Google Planilhas como destino de armazenamento, integrado pelo backend da API (configuração externa ao frontend).

## Como executar

É necessário ter Node.js e npm instalados.

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra no navegador o endereço local informado pelo Vite.

## Build de produção

Gere os arquivos de produção:

```bash
npm run build
```

Para servir localmente os arquivos gerados:

```bash
npm run preview
```

O build é gerado na pasta `dist/`, que não é versionada.
