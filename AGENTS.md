# Contexto do projeto — Central SEPES unificada

## Comunicação

- Use sempre português do Brasil (PT-BR) na documentação, commits e textos visíveis.
- Não traduza nomes de tecnologias, APIs, métodos ou mensagens de erro.
- Para erros, informe causa provável, diagnóstico e correção.

## Escopo técnico

- Este é um projeto JavaScript multipágina construído com Vite, sem framework de interface.
- Compartilhe somente código com comportamento comprovadamente equivalente.
- Faça mudanças mínimas e não refatore trechos fora do escopo solicitado.
- Mantenha a aplicação sem dependências externas de execução, APIs ou CDNs.

## Validação

- Após mudanças compartilhadas, valide as duas unidades e os quatro módulos.
- Teste persistência local, importação/exportação JSON, imagens, cálculos e impressão.
- Execute `npm run build` antes de entregar uma versão.

## Documentação

- Atualize o `README.md` após mudanças de estrutura, execução, persistência, comportamento ou compatibilidade.
- Documente decisões que afetem o funcionamento offline ou os formatos JSON.

## Commits

Use título e corpo em português do Brasil:

```text
<tipo>: <resumo claro em pt-br>

- O que mudou e onde
- Por que a mudança foi necessária
- Impacto ou comportamento anterior vs. novo
```

Tipos permitidos: `feat`, `fix`, `refactor`, `docs`, `chore` e `test`.
