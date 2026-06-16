# Projeto MongoDB — Sistema Judiciário

Projeto acadêmico em MongoDB que representa um sistema judiciário simplificado. A base possui usuários, processos e documentos, permitindo demonstrar inserções, consultas, atualizações, agregações e remoções.

## Arquivos

- `base.js`: cria e povoa o banco `judiciariodb`.
- `consultas.js`: contém as consultas de seleção, projeção, filtros, busca textual e junções com `lookup`.
- `update.js`: contém atualizações, inserções adicionais, agregações, `mapReduce`, renomeação de coleção e remoções.

## Como rodar

Abra o terminal na pasta dos arquivos e entre no MongoDB Shell:

```bash
mongosh
```

Depois execute, nesta ordem:

```javascript
load("base.js")
load("consultas.js")
load("update.js")
```

A ordem é importante porque `base.js` cria a base, `consultas.js` consulta os dados inseridos e `update.js` altera/remove dados depois.

## Observações

Os scripts usam:

```javascript
db = db.getSiblingDB("judiciariodb");
```

em vez de `use judiciariodb`, pois `use` é um comando do shell interativo e pode causar erro em arquivos `.js`.

Para consultas com `$text` e `$search`, a coleção `documentos` precisa ter índice textual:

```javascript
db.documentos.createIndex({ conteudo: "text" });
```

## Recursos utilizados

O projeto cobre a checklist com comandos e operadores como: `find`, `findOne`, `pretty`, `$exists`, `$size`, `$all`, `sort`, `limit`, `$where`, `aggregate`, `$match`, `$project`, `$gte`, `$group`, `$sum`, `$max`, `$avg`, `countDocuments`, `$text`, `$search`, `$filter`, `$cond`, `$lookup`, `updateOne`, `$set`, `$addToSet`, `insertOne`, `upsert`, `mapReduce`, `$function` e `renameCollection`.

Também substitui comandos depreciados:
- `count` por `countDocuments`
- `update` por `updateOne`
- `save` por `insertOne` e `updateOne` com `upsert`

## Resultado esperado

Após executar os scripts, a base terá dados jurídicos organizados em três coleções principais: `usuarios`, `processos` e `documentos`. O projeto também gera um relatório por status dos processos na coleção `relatorio_final_status`.
