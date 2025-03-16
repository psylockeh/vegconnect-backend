const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", require("./routes/authRoutes"));

const PORT = process.env.PORT || 28147;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
