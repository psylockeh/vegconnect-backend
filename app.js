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

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/curtidas", curtidaRoutes);
app.use("/comentarios", comentarioRoutes);
app.use("/upload", uploadRoutes);
app.use("/externo/google", googleRoutes);
app.use("/usuario", usuarioRoutes);

module.exports = app;
