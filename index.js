const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use("/auth", require("./routes/authRoutes"));
app.use("/usuario", require("./routes/usuarioRoutes"));

// Início do servidor
const PORT = process.env.PORT || 28147;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
