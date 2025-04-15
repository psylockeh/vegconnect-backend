const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { criarUsuarioTeste } = require("./setupTestUser");

describe("CSU001 - Login", () => {
  afterAll(async () => {
    await sequelize.close();
  });

  it("deve logar com sucesso", async () => {
    const { email } = await criarUsuarioTeste();

    const response = await request(app).post("/auth/signin").send({
      email,
      senha: "Test@123",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });
});
