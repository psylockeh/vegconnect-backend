const request = require("supertest");
const app = require("../app");

async function criarUsuarioTeste() {
  const email = "testuser@example.com";

  await request(app).post("/auth/signup").send({
    nome: "Test User",
    email,
    senha: "Test@123",
    tp_user: "Comum",
    data_nascimento: "2000-01-01",
    pref_alim: "Vegano",
    nickname: "testezin",
    telefone: "11999999999",
  });

  // Faz login para obter token
  const loginResponse = await request(app).post("/auth/signin").send({
    email,
    senha: "Test@123",
  });

  const token = loginResponse.body.token;

  return { email, token };
}

module.exports = { criarUsuarioTeste };
