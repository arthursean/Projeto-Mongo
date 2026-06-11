use judiciariodb;

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
    }
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
    }
]);
