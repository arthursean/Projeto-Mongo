//  UPDATE, SET e ADDtoSet. muda o status do processo de ID 1 para "em recurso"
// e adiciona a tag de "instânia superior", caso já não exista, evitando duplicatas
db.processos.updateOne(
    { _id: 1 },
    {
        $set: { status: "Em Recurso" },
        $addToSet: { tags_processo: "instância superior" }
    }
);

// SAVE(atual insertOne/updateOne). Adiciona um novo documento ao processo 1
db.documentos.insertOne({
    _id: getProximoId("documentoId"),
    processo_id: 1,
    tipo: "Despacho",
    conteudo: "Intime-se a parte ré para apresentar contrarrazões.",
    confidencial: false
});


// Aggregate, Match, GTE, Group, Sum, Max e Avg
/* 
Analisa os processos de um juiz utilizando os valores das causas,
filtrando a partir de causas maiores ou iguais a 10000, agrupa os processos 
pelo id do juiz, o sum serve para contar a quantidade de processos, o max 
encontra a causa de maior valor do juiz e o avg retorna o valor médio
das causas maiores/iguais a 10000 desse juiz */

db.processos.aggregate([
    { $match: { valor_causa: { $gte: 10000 } } },

    {
        $group: {
            _id: "$juiz_id",
            total_processos: { $sum: 1 },
            valor_total: { $sum: "$valor_causa" }, 
            maior_causa: { $max: "$valor_causa" }, 
            media_causa: { $avg: "$valor_causa" }
        }
    }
]);

// Project, Filter, Cond. projeta uma visualização personalizada 
/* dos processos, o cond cria um campo de prioridade a partir do valor
da causa, o filter serve para mostrar apenas os advogados ativos no processo*/
db.processos.aggregate([
    {
        $project: {
            _id: 0,
            numero: 1,
            prioridade: {
                $cond: { if: { $gte: ["$valor_causa", 100000] }, then: "Alta", else: "Normal" }
            },
            advogados_ativos: {
                $filter: {
                    input: "$advogados",
                    as: "adv",
                    cond: { $eq: ["$$adv.status", "ativo"] }
                }
            }
        }
    }
]);

// Lookup. Junta os processos e usuários para exibir os dados do juiz responsável
// por ambos
db.processos.aggregate([
    {
        $lookup: {
            from: "usuarios",
            localField: "juiz_id",
            foreignField: "_id",
            as: "dados_do_juiz"
        }
    }
]).pretty();


// Count. conta quantos documentos confidenciais existem no sistema
db.documentos.countDocuments({ confidencial: true });

// Mapreduce. cria um relatório que conta a quantidade de processos de cada status
var mapFunction = function () {
    emit(this.status, 1);
};

var reduceFunction = function (keyStatus, valuesCount) {
    return Array.sum(valuesCount);
};

db.processos.mapReduce(
    mapFunction,
    reduceFunction,
    { out: "temp_relatorio_status" }
);

// 27. RENAMECOLLECTION
// Renamecollection. Muda a coleção gerada pelo MapReduce para o nome final
db.temp_relatorio_status.renameCollection("relatorio_final_status");
