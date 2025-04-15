const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");

describe("POST /auth/signup", () => {
  afterAll(async () => {
    await sequelize.close();
  });

  it("deve cadastrar um novo usuário com sucesso", async () => {
    const response = await request(app)
      .post("/auth/signup")
      .send({
        nome: "Usuário Teste",
        email: `test${Date.now()}@email.com`,
        senha: "Teste@123",
        tp_user: "Comum",
        data_nascimento: "2000-01-01",
        pref_alim: "Vegano",
        nickname: `nick${Date.now()}`,
        telefone: "11999999999",
        especialidade: "",
        certificacoes: "",
        tipo_prod: "",
        tipo_com: "",
        nome_comercio: "",
        endereco_comercio: "",
        cnpj: "",
        cep_comercio: "",
        telefone_comercio: "",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("msg");
  });
});
