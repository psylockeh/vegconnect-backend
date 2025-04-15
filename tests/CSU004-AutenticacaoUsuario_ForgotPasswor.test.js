const { criarUsuarioTeste } = require("./setupTestUser");
const app = require("../app");
const request = require("supertest");

it("deve enviar email de recuperação com sucesso", async () => {
  const { email } = await criarUsuarioTeste();

  const response = await request(app)
    .post("/auth/recuperar-senha")
    .send({ email });

  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty("message");
  expect(response.body.message).toBe(
    "E-mail de recuperação enviado com sucesso!"
  );
});
