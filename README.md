# Projeto MongoDB — Sistema Judiciário

Projeto acadêmico em MongoDB que modela um sistema judiciário simplificado, com usuários, processos e documentos. O objetivo é demonstrar inserção, consulta, atualização, agregação e remoção de dados usando recursos da linguagem do MongoDB.

## Arquivos

* `base.js`: cria o banco, limpa dados antigos, define contadores de IDs e insere os dados iniciais.
* `consultas.js`: reúne consultas de seleção, projeção, filtros, busca textual e `lookup`.
* `update.js`: reúne atualizações, inserções adicionais, agregações, `mapReduce`, renomeação de coleção e remoções.
* `teste.js`: executa os scripts na ordem correta e valida os principais resultados.

## Pré-requisitos

Antes de executar o projeto, é necessário ter:

* MongoDB Server instalado e em execução (`mongod`)
* MongoDB Shell (`mongosh`)

Verifique se estão instalados:

```bash
which mongod
which mongosh
```

Caso os comandos retornem um caminho válido, a instalação está correta.

## Instalação (Linux Mint 22 / Ubuntu 24.04)

Instale as dependências:

```bash
sudo apt update
sudo apt install curl gnupg
```

Adicione a chave oficial do MongoDB:

```bash
curl -fsSL https://pgp.mongodb.com/server-8.0.asc | \
sudo gpg --dearmor -o /usr/share/keyrings/mongodb-server-8.0.gpg
```

Adicione o repositório:

```bash
echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] https://repo.mongodb.org/apt/ubuntu noble/mongodb-org/8.0 multiverse" | \
sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list
```

Atualize os repositórios:

```bash
sudo apt update
```

Instale o MongoDB e o Mongo Shell:

```bash
sudo apt install mongodb-org mongodb-mongosh
```

Inicie o serviço:

```bash
sudo systemctl start mongod
sudo systemctl enable mongod
```

Verifique se está rodando:

```bash
sudo systemctl status mongod
```

A saída deve indicar:

```text
Active: active (running)
```

## Como rodar

Faça o download do repositório, entre na pasta do projeto e execute:

```bash
mongosh teste.js
```

O arquivo `teste.js` executa automaticamente:

```javascript
load("base.js");
load("consultas.js");
load("update.js");
```

Também é possível executar manualmente dentro do `mongosh`:

```javascript
load("base.js");
load("consultas.js");
load("update.js");
```

A ordem correta é sempre:

```text
base.js → consultas.js → update.js
```

## Observações importantes

Os scripts utilizam:

```javascript
db = db.getSiblingDB("judiciariodb");
```

em vez de:

```javascript
use judiciariodb
```

porque `use` é um comando do shell interativo e pode gerar erro quando utilizado em arquivos `.js`.

Para a busca textual funcionar corretamente, é criado o índice:

```javascript
db.documentos.createIndex({ conteudo: "text" });
```

## Checklist atendida

O projeto utiliza:

* `find`
* `findOne`
* `pretty`
* `$exists`
* `$size`
* `$all`
* `sort`
* `limit`
* `$where`
* `aggregate`
* `$match`
* `$project`
* `$gte`
* `$group`
* `$sum`
* `$max`
* `$avg`
* `countDocuments`
* `$text`
* `$search`
* `$filter`
* `$cond`
* `$lookup`
* `updateOne`
* `$set`
* `$addToSet`
* `insertOne`
* `upsert`
* `mapReduce`
* `$function`
* `renameCollection`

Comandos depreciados foram substituídos por equivalentes atuais:

* `count` → `countDocuments`
* `update` → `updateOne`
* `save` → `insertOne` e `updateOne` com `upsert`

## Resultado esperado

Após a execução de `base.js`:

* 33 usuários
* 5 processos
* 10 documentos

Após a execução de `update.js`:

* Processo 1 atualizado para status `Em Recurso`
* Adição da tag `instância superior`
* Criação/atualização de uma `Certidão`
* Remoção dos documentos de ID 6
* Remoção dos documentos do processo 2
* Criação da coleção `relatorio_final_status`
