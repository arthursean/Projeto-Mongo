// execute com: mongosh teste.js
load("base.js");
db = db.getSiblingDB("judiciariodb");

// necessário para consultas com $text/$search.
db.documentos.createIndex({ conteudo: "text" });

function verificar(condicao, mensagem) {
    if (!condicao) {
        throw new Error("[ERRO] " + mensagem);
    }
    print("[OK] " + mensagem);
}

print("\n=== Validando base inicial ===");
verificar(db.usuarios.countDocuments() === 33, "33 usuários inseridos");
verificar(db.processos.countDocuments() === 5, "5 processos inseridos");
verificar(db.documentos.countDocuments() === 10, "10 documentos inseridos");
verificar(db.documentos.countDocuments({ $text: { $search: "liminar" } }) === 2, "busca textual por 'liminar' funcionando");

print("\n=== Executando consultas ===");
load("consultas.js");

print("\n=== Executando updates ===");
load("update.js");

print("\n=== Validando alterações ===");
var processo1 = db.processos.findOne({ _id: 1 });
verificar(processo1.status === "Em Recurso", "processo 1 atualizado para Em Recurso");
verificar(processo1.tags_processo.includes("instância superior"), "tag adicionada com $addToSet");

verificar(db.documentos.countDocuments({ processo_id: 1, tipo: "Certidão" }) === 1, "upsert criou/atualizou uma Certidão");
verificar(db.documentos.countDocuments({ _id: 6 }) === 0, "documento de ID 6 removido");
verificar(db.documentos.countDocuments({ processo_id: 2 }) === 0, "documentos do processo 2 removidos");

verificar(db.relatorio_final_status.countDocuments() > 0, "relatório MapReduce renomeado criado");

print("\nTodos os testes principais passaram.");
