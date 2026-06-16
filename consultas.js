// Função auxiliar para organizar a saída no terminal
function printTitulo(titulo) {
    print("\n==============================");
    print(titulo);
    print("==============================");
}

// usa o pretty para formatar e o find para listar todos os processos
printTitulo("FIND + PRETTY: listando todos os processos");
db.processos.find().forEach(printjson);

// retorna o primeiro juiz registrado findOne
printTitulo("FINDONE: primeiro juiz registrado");
printjson(db.usuarios.findOne({ tipo: "Juiz" }));

//// retorna todos os usuários que possuem o campo oab (exists)
printTitulo("EXISTS: usuários que possuem o campo OAB");
db.usuarios.find({ oab: { $exists: true } }).forEach(printjson);

// seleção e projeção: lista advogados mostrando apenas nome, oab e tags
printTitulo("SELEÇÃO E PROJEÇÃO: advogados com nome, OAB e tags");
db.usuarios.find(
    { tipo: "Advogado" },
    { _id: 0, nome: 1, oab: 1, tags: 1 }
).forEach(printjson);

// retorna todos os processos que tenham exatamente as tags de "urgente"
// e "recurso". size e all
printTitulo("SIZE + ALL: processos com exatamente as tags urgente e recurso");
db.processos.find({
    tags_processo: { $size: 2, $all: ["urgente", "recurso"] }
}).forEach(printjson);

// SORT e Limit. retorna o processo com maior valor.
printTitulo("SORT + LIMIT: processo com maior valor de causa");
db.processos.find().sort({ valor_causa: -1 }).limit(1).forEach(printjson);

// Where e Function(já utilizamos na inserção da base). Filtra os processos
// que possuem o valor maior que 100000
printTitulo("WHERE: processos com valor da causa maior que 100000");
db.processos.find({
    $where: function () {
        return this.valor_causa > 100000;
    }
}).forEach(printjson);

// Encontra processos cujo regime de bens da partilha seja "Comunhão Parcial"
printTitulo("CAMPO ANINHADO: processos com regime de bens Comunhão Parcial");
db.processos.find({ "detalhes_familia.regime_bens": "Comunhão Parcial" }).forEach(printjson);

//multiplos 
printTitulo("IN: documentos do tipo Petição Inicial ou Contestação");
db.documentos.find({ 
    tipo: { $in: ["Petição Inicial", "Contestação"] } 
}).forEach(printjson);

// Busca o processo de ID 3 e junta seus documentos relacionados"
printTitulo("AGGREGATE + MATCH + LOOKUP: processo 3 com documentos relacionados");
db.processos.aggregate([
    { $match: { _id: 3 } },
    {
        $lookup: {
            from: "documentos",
            localField: "_id",
            foreignField: "processo_id",
            as: "historico_documentos"
        }
    }
]).forEach(printjson);

// Busca todos os documentos que contenham a palavra "liminar" em seu conteúdo
printTitulo("TEXT + SEARCH: documentos que contêm a palavra liminar");
db.documentos.find(
    { $text: { $search: "liminar" } }
).forEach(printjson);
