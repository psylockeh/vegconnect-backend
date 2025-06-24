const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const googleRoutes = require("./routes/googleRoutes");
const comentarioRoutes = require("./routes/comentarioRoutes");
const curtidaRoutes = require("./routes/curtidaRoutes");
const repostRoutes = require("./routes/repostRoutes");
const postagemRoutes = require("./routes/postagemRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/usuario", usuarioRoutes);
app.use(uploadRoutes);
app.use("/externo/google", googleRoutes);
app.use("/comentarios", comentarioRoutes);
app.use("/curtidas", curtidaRoutes);
app.use("/postagens", postagemRoutes);
app.use("/reposts", repostRoutes);

module.exports = app;
