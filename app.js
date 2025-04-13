const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
app.use(uploadRoutes);

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/usuario", usuarioRoutes);

module.exports = app;
