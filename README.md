# Calculadora de Diárias

Aplicação web para calcular diárias de viagem a partir do cargo/função, do tipo de destino e do período informado. O projeto usa JavaScript sem framework e Vite para desenvolvimento e geração dos arquivos de produção.

> Os valores atualmente cadastrados no sistema têm como referência o Decreto nº 55.723, de 31 de outubro de 2023. Confirme a regulamentação e os valores vigentes antes de utilizar o resultado para fins administrativos.

## Acesso à planilha de registros

- Seleção do cargo/função e classificação automática do grupo.
- Seleção do tipo de destino e preenchimento das datas da viagem.
- Cálculo sob demanda pelo botão **Calcular**.
- Salvamento sob demanda na API pelo botão **Salvar**.
- Cálculo de dias corridos, pernoites, quantidades integrais e parciais, valores e total.
- Tratamento automático de sábado, domingo e feriado nacional no retorno como retorno integral.
- Opção para marcar feriado municipal no retorno.
- Resumo do cálculo em uma aba própria, atualizado após o cálculo.
- Impressão ou exportação para PDF pelo botão **Imprimir / PDF**, reunindo **Resumo do cálculo**, **Tabelas de diárias** e **Parâmetros e Configurações** em um documento no modelo institucional (cabeçalho com logotipo e rodapé).
- Consulta das tabelas de diárias integrais e parciais em uma aba própria.
- Consulta dos grupos por cargo/função e das regras de retorno na aba **Parâmetros e Configurações**.
- Envio dos dados do cálculo para a API local configurada no frontend somente pelo botão **Salvar**.
- Navegação por abas; a rolagem do conteúdo ocorre dentro da aba ativa.
- Rodapé de identidade visual compartilhado por todas as abas.

O frontend não lê nem grava diretamente nessa planilha. O botão **Salvar** envia o cálculo para uma API externa ao projeto; a integração dessa API com a planilha, assim como as permissões de acesso, deve ser configurada no backend.

## O que a aplicação oferece

- Seleção de cargo/função com preenchimento automático do grupo.
- Nome do(a) servidor(a) obrigatório para calcular e salvar.
- Seleção do tipo de destino e entrada das datas de saída e retorno.
- Cálculo explícito pelo botão **Calcular**, com quantitativos, valores e total.
- Retorno tratado como diária integral quando cai em sábado, domingo ou feriado nacional; feriado municipal precisa ser marcado manualmente.
- Abas para calculadora, resumo imprimível, tabelas de valores e parâmetros.
- Impressão do resumo ou salvamento em PDF pela janela de impressão do navegador.
- Envio opcional do cálculo à API pelo botão **Salvar**.

O formulário não é persistido no navegador e não há funcionalidade de importar ou exportar JSON. Se a página for recarregada, os valores digitados são perdidos. O cálculo funciona sem backend; somente o salvamento requer a API.

## Executar localmente

Requisitos: Node.js compatível com Vite 8 e npm.

```bash
npm install
npm run dev
```

Abra no navegador o endereço local informado pelo Vite. Para desenvolver o salvamento, inicie também um backend na porta `8000`; consulte o [guia do projeto](./docs/GUIA_DO_PROJETO.md) para detalhes da integração.

## Build e pré-visualização

```bash
npm run build
npm run preview
```

O build gera os arquivos estáticos em `dist/`. O comando de build não inicia nem valida a API.

## Documentação para quem está chegando

Consulte o [Guia do projeto](./docs/GUIA_DO_PROJETO.md) para conhecer a arquitetura, as regras de cálculo, o formato enviado à API, as etapas de execução e as orientações para manutenção.

## Estrutura

```text
Calculadora-diarias/
├── docs/
│   └── GUIA_DO_PROJETO.md
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.js
    ├── calculadora.js
    ├── parametros-diarias.js
    ├── style.css
    ├── api/api.js
    ├── components/
    ├── styles/
    └── utils/
```
