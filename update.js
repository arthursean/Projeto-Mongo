// Função auxiliar para organizar a saída no terminal
function printTitulo(titulo) {
    print("\n==============================");
    print(titulo);
    print("==============================");
}

//  UPDATE, SET e ADDtoSet. muda o status do processo de ID 1 para "em recurso"
// e adiciona a tag de "instânia superior", caso já não exista, evitando duplicatas
printTitulo("UPDATEONE + SET + ADDTOSET: atualizando processo 1");
printjson(db.processos.updateOne(
    { _id: 1 },
    {
        $set: { status: "Em Recurso" },
        $addToSet: { tags_processo: "instância superior" }
    }
));

print("Processo 1 após atualização:");
printjson(db.processos.findOne({ _id: 1 }));

// SAVE(atual insertOne/updateOne). Adiciona um novo documento ao processo 1
printTitulo("INSERTONE: adicionando novo documento ao processo 1");
printjson(db.documentos.insertOne({
    _id: getProximoId("documentoId"),
    processo_id: 1,
    tipo: "Despacho",
    conteudo: "Intime-se a parte ré para apresentar contrarrazões.",
    confidencial: false
}));

// SAVE moderno: atualiza se já existir; insere se não existir.
// Neste exemplo, usamos updateOne com upsert para simular o comportamento do antigo save.
printTitulo("SAVE MODERNO: updateOne com upsert");
printjson(db.documentos.updateOne(
    {
        processo_id: 1,
        tipo: "Certidão"
    },
    {
        $set: {
            conteudo: "Certidão gerada para demonstrar comportamento semelhante ao save.",
            confidencial: false
        },
        $setOnInsert: {
            _id: getProximoId("documentoId"),
            processo_id: 1,
            tipo: "Certidão"
        }
    },
    { upsert: true }
));

print("Certidão após upsert:");
printjson(db.documentos.findOne({ processo_id: 1, tipo: "Certidão" }));


// Aggregate, Match, GTE, Group, Sum, Max e Avg
/* 
Analisa os processos de um juiz utilizando os valores das causas,
filtrando a partir de causas maiores ou iguais a 10000, agrupa os processos 
pelo id do juiz, o sum serve para contar a quantidade de processos, o max 
encontra a causa de maior valor do juiz e o avg retorna o valor médio
das causas maiores/iguais a 10000 desse juiz */

printTitulo("AGGREGATE + MATCH + GTE + GROUP + SUM + MAX + AVG");
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
]).forEach(printjson);

// Project, Filter, Cond. projeta uma visualização personalizada 
/* dos processos, o cond cria um campo de prioridade a partir do valor
da causa, o filter serve para mostrar apenas os advogados ativos no processo*/
printTitulo("PROJECT + FILTER + COND: prioridade e advogados ativos");
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
]).forEach(printjson);

// Lookup. Junta os processos e usuários para exibir os dados do juiz responsável
// por ambos
printTitulo("LOOKUP: processos com dados do juiz responsável");
db.processos.aggregate([
    {
        $lookup: {
            from: "usuarios",
            localField: "juiz_id",
            foreignField: "_id",
            as: "dados_do_juiz"
        }
    }
]).forEach(printjson);

// FUNCTION: classifica o valor da causa usando função JavaScript dentro do aggregate
printTitulo("FUNCTION: classificação do valor da causa");
db.processos.aggregate([
    {
        $project: {
            _id: 0,
            numero: 1,
            valor_causa: 1,
            classificacao_valor: {
                $function: {
                    body: function(valor) {
                        if (valor >= 1000000) return "Muito alto";
                        if (valor >= 100000) return "Alto";
                        return "Baixo";
                    },
                    args: ["$valor_causa"],
                    lang: "js"
                }
            }
        }
    }
]).forEach(printjson);

// Count. conta quantos documentos confidenciais existem no sistema
printTitulo("COUNTDOCUMENTS: quantidade de documentos confidenciais");
print("Total de documentos confidenciais: " + db.documentos.countDocuments({ confidencial: true }));

// Mapreduce. cria um relatório que conta a quantidade de processos de cada status
printTitulo("MAPREDUCE: relatório de processos por status");
print("Aviso: mapReduce é depreciado em versões recentes do MongoDB. Ele foi mantido porque está presente na checklist do projeto.");

var mapFunction = function () {
    emit(this.status, 1);
};

var reduceFunction = function (keyStatus, valuesCount) {
    return Array.sum(valuesCount);
};

printjson(db.processos.mapReduce(
    mapFunction,
    reduceFunction,
    { out: "temp_relatorio_status" }
));

// 27. RENAMECOLLECTION
// Renamecollection. Muda a coleção gerada pelo MapReduce para o nome final
printTitulo("RENAMECOLLECTION: renomeando relatório final");
printjson(db.temp_relatorio_status.renameCollection("relatorio_final_status", true));

print("Conteúdo da coleção relatorio_final_status:");
db.relatorio_final_status.find().forEach(printjson);

// Remove o documento de ID 6 (Despacho de suspensão) pois foi revogado
printTitulo("DELETEONE: removendo documento de ID 6");
printjson(db.documentos.deleteOne({ _id: 6 }));

print("Busca pelo documento ID 6 após remoção:");
printjson(db.documentos.findOne({ _id: 6 }));

// Remove todos os documentos de um processo específico que foi anulado
printTitulo("DELETEMANY: removendo documentos do processo 2");
printjson(db.documentos.deleteMany({ processo_id: 2 }));

print("Documentos restantes do processo 2:");
db.documentos.find({ processo_id: 2 }).forEach(printjson);
