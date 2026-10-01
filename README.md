# Calculadora de Diárias

Aplicação web para cálculo de diárias de viagem com base no cargo ou função, no tipo de destino e nas datas de saída e retorno. A ferramenta calcula a quantidade de diárias integrais e parciais, aplica os valores por grupo e destino e gera um resumo que pode ser impresso ou exportado em PDF pelo navegador.

Os valores usados na aplicação estão parametrizados conforme o Decreto nº 55.723, de 31 de outubro de 2023. A utilização do resultado deve sempre considerar a regulamentação vigente e o enquadramento funcional do beneficiário.

## O que foi refatorado

A aplicação passou por uma reorganização da estrutura para separar responsabilidades e facilitar manutenção, leitura e evolução do código.

### Principais mudanças

- Separação da interface em componentes reutilizáveis na pasta `src/components`.
- Extração da lógica principal de cálculo para `src/calculadora.js`.
- Centralização dos dados de cargos, destinos e tabelas em `src/parametros-diarias.js`.
- Criação de módulos utilitários em `src/utils` para:
  - formatação de moeda e datas;
  - regras de calendário e feriados;
  - seleção de elementos da página;
  - geração do resumo para impressão.
- Redução da lógica acoplada no ponto de entrada da app, deixando `src/main.js` responsável apenas por montar a interface e iniciar a calculadora.

Esse refatoramento deixa o projeto mais modular, mais fácil de testar e mais simples de evoluir sem duplicar regras ou misturar HTML, comportamento e dados.

## Funcionalidades

- Classificação do beneficiário em grupo conforme o cargo ou função.
- Cálculo de diárias integrais e parciais por grupo e tipo de destino.
- Tratamento automático de sábado, domingo e feriado nacional como retorno integral.
- Possibilidade de marcar feriado municipal no retorno.
- Exibição de tabelas com os valores aplicáveis.
- Geração de resumo para impressão em PDF.

## Estrutura do projeto

```text
Calculadora-diarias/
├── index.html
├── package.json
├── README.md
├── src/
│   ├── main.js                 # ponto de entrada da aplicação
│   ├── calculadora.js          # lógica de cálculo e eventos
│   ├── parametros-diarias.js   # cargos, destinos e tabela de valores
│   ├── style.css               # estilos da aplicação
│   ├── components/
│   │   ├── hero.js             # cabeçalho da página
│   │   ├── calculo.js          # formulário e área de resultados
│   │   ├── parametros.js       # tabela de parâmetros
│   │   ├── tabelas.js          # tabelas de valores
│   │   └── assinatura.js       # rodapé/assinatura visual
│   └── utils/
│       ├── datas.js            # regras de feriado e cálculo de datas
│       ├── elementos.js        # lista de elementos do DOM
│       ├── formatadores.js     # moeda e formatação de datas
│       └── impressao.js        # geração do resumo para impressão
└── dist/                       # gerado após o build de produção
```

## Tecnologias

- HTML5 para estrutura da interface.
- CSS3 para layout e visual.
- JavaScript com ES modules, sem framework.
- Vite para execução local e build de produção.

## Como executar

É necessário ter o Node.js e o npm instalados.

1. Instale as dependências:

```bash
npm install
```

2. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

3. Abra o endereço local exibido no terminal no navegador.

## Build de produção

Para gerar a versão de produção:

```bash
npm run build
```

Para visualizar o build localmente:

```bash
npm run preview
```

## Observações importantes

- O fluxo principal da aplicação foi organizado para separar dados, regras de negócio e renderização.
- A manutenção de valores e regras passa a ficar concentrada em módulos específicos, reduzindo riscos de alteração acidental em outras partes do código.
- A estrutura atual facilita a inclusão de novas regras, novos componentes ou alterações de interface sem reescrever o comportamento principal da calculadora.
