const app = require("./app");

const PORT = process.env.PORT || 28147;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Servidor rodando na porta ${PORT}`)
);

app.get("/ping", (req, res) => {
  res.send("pong");
});
