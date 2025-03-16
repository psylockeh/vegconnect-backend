require("./models");
const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");

app.use(cors());

app.use(express.json());

// Rotas de autenticação
app.use("/auth", authRoutes);

module.exports = app;
