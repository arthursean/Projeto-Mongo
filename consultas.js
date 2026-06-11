// usa o pretty para formatar e o find para listar todos os processos
db.processos.find().pretty();
// retorna o primeiro juiz registrado findOne
db.usuarios.findOne({ tipo: "Juiz" });
//retorna todos os documentos que incluam a seção de oab exists
db.usuarios.find({ oab: { $exists: true } });
// retorna todos os processos que tenham exatamente as tags de "urgente"
// e "recurso". size e all
db.processos.find({
    tags_processo: { $size: 2, $all: ["urgente", "recurso"] }
});
// SORT e Limit. retorna o processo com maior valor.
db.processos.find().sort({ valor_causa: -1 }).limit(1);
// Where e Function(já utilizamos na inserção da base). Filtra os processos
// que possuem o valor maior que 100000
db.processos.find({
    $where: function () {
        return this.valor_causa > 100000;
    }
});
