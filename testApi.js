const fetch = require("node-fetch");

async function testApi() {
  const payload = {
    email: "anacarolina@email.com",
    password: "AnaSenha123",
  };

  console.log("🔹 Enviando:", payload); // <-- Verificar se os dados estão corretos

  const response = await fetch("http://localhost:28147/auth/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  console.log("🔹 Resposta do servidor:", data);
}

testApi().catch(console.error);
