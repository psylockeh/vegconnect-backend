const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");

// Mock do middleware de autenticação
jest.mock("../middlewares/authMiddleware", () => {
  return (req, res, next) => {
    req.user = {
      id_user: 1,
      tipo_usuario: "Comum",
    };
    next();
  };
});

describe("POST /postagens", () => {
  afterAll(async () => {
    await sequelize.close(); // encerra conexão após os testes
  });

  it("deve criar uma postagem do tipo receita com sucesso", async () => {
    const resposta = await request(app).post("/usuario/postagens").send({
      tp_post: "receita",
      titulo: "Brownie Vegano",
      conteudo: "Essa receita leva cacau, banana e aveia.",
      categoria: "doces",
      temp_prep: "40 minutos",
      instrucoes: "Misture tudo e leve ao forno.",
      ingredientes: "banana, aveia, cacau",
    });

    expect(resposta.status).toBe(201);
    expect(resposta.body).toHaveProperty("id");
    expect(resposta.body.tp_post).toBe("receita");
  });
});
