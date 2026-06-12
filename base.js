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

// ============================ USUÁRIOS ================================

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
    },
    {
        _id: getProximoId("usuarioId"),
        nome: "Erika Hilton",
        tipo: "Advogado",
        oab: "PE11223",
        tags: ["direitos humanos", "constitucional", "família"]
    },
    {
        _id: getProximoId("usuarioId"),
        nome: "Letícia Possídio",
        tipo: "Advogado",
        oab: "PE44556",
        tags: ["cívil", "imobiliário", "empresarial"]
    },
    {
        _id: getProximoId("usuarioId"),
        nome: "Harvey Specter",
        tipo: "Advogado",
        oab: "NY10001",
        tags: ["corporativo", "contratos", "litígios"]
    },
    {
        _id: getProximoId("usuarioId"),
        nome: "Dimsdale De Vil",
        tipo: "Juiz",
        comarca: "Recife",
        email: "dimsdale.devil@tjpe.jus.br",
        anos_experiencia: 25
    },
    {
        _id: getProximoId("usuarioId"),
        nome: "Cléo Dionysio",
        tipo: "Juiz",
        comarca: "Olinda",
        email: "cleo.dionysio@tjpe.jus.br",
        anos_experiencia: 18
    },
    {
        _id: getProximoId("usuarioId"), 
        nome: "Napoleão Stalin",
        tipo: "Juiz",
        email: "napoleao.stalin@tjpe.jus.br",
        anos_experiencia: 34
    },
    {
        _id: getProximoId("usuarioId"), 
        nome: "Arnold Stallone",
        tipo: "Advogado",
        email: "badassmf@gmail.com",
        anos_experiencia: 55
    },
    {
        _id: getProximoId("usuarioId"), 
        nome: "Higuruma Akutame",
        tipo: "Advogado",
        email: "higuruma.akutame@tjpe.jus.br",
        anos_experiencia: 14,
        tags: ["direitos humanos", "constitucional", "criminal"]
    },
    {
        _id: getProximoId("usuarioId"), 
        nome: "Elon Tesla",
        tipo: "Parte",
        cpf: "777.666.420-67"
    },
    {
        _id: getProximoId("usuarioId"), 
        nome: "Pelé Ziko",
        tipo: "Juiz",
        email: "pele.ziko@tjpe.jus.br",
        anos_experiencia: 16
    },
    {
        _id: getProximoId("usuarioId"), 
        nome: "Toni Estrelak",
        tipo: "Advogado",
        oab: "PE30408",
        email: "toni.estrelak@tjpe.jus.br",
        anos_experiencia: 22
    },
    {
        _id: getProximoId("usuarioId"), 
        nome: "Steve Apple",
        tipo: "Parte",
        cpf: "037.833.100-67"
    },
    {
        _id: getProximoId("usuarioId"), 
        nome: "Jair Lula",
        tipo: "Juiz",
        comarca: "Brasilia",
        email: "jair.lula@tjdft.jus.br",
        anos_experiencia: 30
    },
    {
        _id: getProximoId("usuarioId"),
        nome: "Lloyd Fronteira",
        tipo: "Advogado",
        oab: "PE67576",
        tags: ["cívil", "imobiliário", "empresarial"]
    },
    {
        _id: getProximoId("usuarioId"),
        nome: "Harry Jackson",
        tipo: "Advogado",
        oab: "PE35467",
        tags: ["constitucional", "criminal"]
    },
    {
        _id: getProximoId("usuarioId"),
        nome: "Frei de Nassau",
        tipo: "Juiz",
        comarca: "Recife",
        email: "frei.nassau@tjpe.jus.br",
        anos_experiencia: 31
    },
    {
        _id: getProximoId("usuarioId"), 
        nome: "Marco Vencido",
        tipo: "Parte",
        cpf: "147.361.420-67"
    },
    {
        _id: getProximoId("usuarioId"), 
        nome: "Saul Bomhomi",
        tipo: "Advogado",
        oab: "PE32428",
        email: "saul.bomhomi@tjpe.jus.br",
        anos_experiencia: 32
    },
    {
        _id: getProximoId("usuarioId"),
        nome: "Mario Luigi",
        tipo: "Advogado",
        oab: "PE71417",
        tags: ["imobiliário", "empresarial", "criminal"]
    },
    {
        _id: getProximoId("usuarioId"),
        nome: "Saulo Doce",
        tipo: "Juiz",
        comarca: "Recife",
        email: "saulo.doce@tjpe.jus.br",
        anos_experiencia: 19
    },
    {
        _id: getProximoId("usuarioId"),
        nome: "Obama Trump",
        tipo: "Advogado",
        oab: "PE17107",
        tags: ["direitos humanos", "constitucional", "empresarial"]
    },
    {
        _id: getProximoId("usuarioId"), 
        nome: "Michelangelo da Vinci",
        tipo: "Parte",
        cpf: "051.913.100-67"
    },
    {
        _id: getProximoId("usuarioId"),
        nome: "Brites Coelho",
        tipo: "Juiz",
        comarca: "Olinda",
        email: "brites.coelho@tjpe.jus.br",
        anos_experiencia: 43
    },
    {
        _id: getProximoId("usuarioId"), 
        nome: "Felix Jimmy",
        tipo: "Advogado",
        oab: "PE32678",
        email: "felix.jimmy@tjpe.jus.br",
        anos_experiencia: 24
    },
    {
        _id: getProximoId("usuarioId"), 
        nome: "Jack Pernalta",
        tipo: "Parte",
        cpf: "076.763.024-76"
    }
]);

// ============================ PROCESSOS ================================

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
    }},
    {
        _id: getProximoId("processoId"),
        numero: "0012345-67.2026.8.17.0001",
        status: "Em Andamento",
        data_abertura: new Date("2026-05-10"),
        valor_causa: 850000,
        juiz_id: 12,
        partes: [4,7],
        advogados: [
            { id: 9, status: "ativo" },
            { id: 10, status: "ativo" }
        ],
        tags_processo: ["empresarial","urgente"]
    },
    {
        _id: getProximoId("processoId"),
        numero: "0012345-68.2026.8.17.0001",
        status: "Em Recurso",
        data_abertura: new Date("2026-04-20"),
        valor_causa: 2500000,
        juiz_id: 13,
        partes: [5,6],
        advogados: [
            { id: 11, status: "ativo" }
        ],
        tags_processo: ["contratual","alto valor"]
    }
]);

// ============================ DOCUMENTOS ================================

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
    },
    {
        _id: getProximoId("documentoId"),
        processo_id: 4,
        tipo: "Petição Inicial",
        conteudo: "A autora requer indenização por descumprimento contratual.",
        confidencial: false
    },
    {
        _id: getProximoId("documentoId"),
        processo_id: 4,
        tipo: "Contestação",
        conteudo: "A parte ré impugna integralmente os pedidos.",
        confidencial: false
    },
    {
        _id: getProximoId("documentoId"),
        processo_id: 5,
        tipo: "Recurso",
        conteudo: "A parte autora interpõe recurso de apelação.",
        confidencial: true
    },
    {
        _id: getProximoId("documentoId"),
        processo_id: 5,
        tipo: "Acórdão",
        conteudo: "O tribunal manteve parcialmente a sentença.",
        confidencial: true
    }
]);
