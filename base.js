// select the database (avoids 'use' keyword errors in some JS environments)
db = db.getSiblingDB("judiciariodb");

// o mongo n tem um sistema próprio de chaves incrementadas(eles utilizam o objectId como forma de identificação padrão), ou seja,
// é necessária a função e um "documento" para registrar os ids dos documentos dos N tipos
db.contadores.insertMany([
    { _id: "usuarioId", valor_sequencia: 0 },
    { _id: "processoId", valor_sequencia: 0 },
    { _id: "documentoId", valor_sequencia: 0 }
]);

function getProximoId(nomeDaSequencia) {
    var retorno = db.contadores.findOneAndUpdate(
        { _id: nomeDaSequencia },
        { $inc: { valor_sequencia: 1 } },
        { returnNewDocument: true }
    );
    return retorno.valor_sequencia;
}
// a criação de "tables" também é criada a partir da inserção do documento em si, já que é um modelo não relacional, não possuindo a existência
// do conceito de table propriamente dito
db.usuarios.insertMany([
    {
        _id: getProximoId("usuarioId"), 
        nome: "Leonardo Portela Chiu",
        tipo: "Juiz",
        comarca: "Recife",
        email: "leonardo.chiu@tjpe.jus.br",
        anos_experiencia: 15
    },
    {
        _id: getProximoId("usuarioId"), 
        nome: "Felipe Almeida",
        tipo: "Advogado",
        oab: "PE12345",
        tags: ["cível", "imobiliário"]
    },
    {
        _id: getProximoId("usuarioId"), 
        nome: "Roberto Xavier",
        tipo: "Advogado",
        oab: "PE67890",
        tags: ["criminal", "trabalhista"]
    },
    {
        _id: getProximoId("usuarioId"), 
        nome: "Betuca Construções",
        tipo: "Parte",
        cnpj: "11.222.333/0001-44",
        endereco: "Rua Isaac Salazar"
    },
    {
        _id: getProximoId("usuarioId"), 
        nome: "Gabriel Brandt",
        tipo: "Parte",
        cpf: "123.456.789-00"
    },
    {
        _id: getProximoId("usuarioId"), 
        nome: "Arthur Sean",
        tipo: "Parte",
        cpf: "987.654.321-00"
    },
    {
        _id: getProximoId("usuarioId"), 
        nome: "Isabela Possídio",
        tipo: "Parte",
        cpf: "676.676.676-67"
    },
    {
        _id: getProximoId("usuarioId"), // Será o ID 8
        nome: "Helena Carreiro",
        tipo: "Advogado",
        oab: "PE99999",
        tags: ["família", "sucessões"]
    }   
]);

db.processos.insertMany([
    {
        _id: getProximoId("processoId"),
        numero: "0001234-56.2023.8.17.0001",
        status: "Em Andamento",
        data_abertura: new Date("2023-01-15T00:00:00Z"),
        valor_causa: 150000,
        juiz_id: 1,
        partes: [4, 5],
        advogados: [
            { id: 2, status: "ativo" },
            { id: 3, status: "inativo" }
        ],
        tags_processo: ["urgente", "recurso"]
    },
    {
        _id: getProximoId("processoId"), 
        numero: "0009876-54.2023.8.17.0001",
        status: "Concluído",
        data_abertura: new Date("2023-03-10T00:00:00Z"),
        valor_causa: 5000,
        juiz_id: 1,
        partes: [5],
        advogados: [
            { id: 2, status: "ativo" }
        ],
        tags_processo: ["pequenas causas"]
    },
    {
        _id: getProximoId("processoId"), // Será o ID 3
        numero: "0005555-44.2026.8.17.0001",
        status: "Em Andamento",
        data_abertura: new Date("2026-06-01T10:00:00Z"),
        valor_causa: 750000,
        juiz_id: 1,
        partes: [7, 4], // Isabela Possídio (7) e Betuca Construções (4)
        advogados: [
            { id: 8, status: "ativo" }, // Helena defendendo a Isabela
            { id: 2, status: "ativo" }  // Felipe defendendo a Betuca Construções
        ],
        tags_processo: ["segredo de justiça", "divórcio", "partilha de bens"],
        
        // CAMPOS EXCLUSIVOS: Perfeito para demonstrar o esquema flexível (Schemaless)
        detalhes_familia: {
            regime_bens: "Comunhão Parcial",
            possui_filhos_menores: false,
            pensao_pleiteada: 0
    }}
]);

db.documentos.insertMany([
    {
        _id: getProximoId("documentoId"), 
        processo_id: 1, 
        tipo: "Petição Inicial",
        conteudo: "O autor requer o pagamento de danos materiais devido a atraso na obra e liminar deferida para bloqueio de bens.",
        confidencial: false
    },
    {
        _id: getProximoId("documentoId"), 
        processo_id: 1, 
        tipo: "Sentença",
        conteudo: "Julgo procedente o pedido formulado.",
        confidencial: true
    },
    {
        _id: getProximoId("documentoId"), 
        processo_id: 2, 
        tipo: "Acordo",
        conteudo: "As partes entraram em acordo amigável, encerrando a lide.",
        confidencial: false
    },
    {
        _id: getProximoId("documentoId"), // ID 4
        processo_id: 3,
        tipo: "Decisão Interlocutória",
        conteudo: "Defiro o pedido liminar de arrolamento de bens para evitar a dilapidação do patrimônio até a partilha.",
        confidencial: true
    },
    {
        _id: getProximoId("documentoId"), // ID 5
        processo_id: 3,
        tipo: "Contestação",
        conteudo: "A parte ré alega que os bens listados foram adquiridos antes da constância da união, impugnando o pedido de partilha integral.",
        confidencial: true
    },
    {
        _id: getProximoId("documentoId"), // ID 6
        processo_id: 1,
        tipo: "Despacho",
        conteudo: "Mantenha-se os autos suspensos aguardando a manifestação do perito engenheiro.",
        confidencial: false
    }
]);
