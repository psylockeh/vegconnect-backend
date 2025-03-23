const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Usuario } = require("../models");
const { forgotPassword } = require("../controllers/authController");
const {
  solicitarRecuperacaoSenha,
  redefinirSenha,
} = require("../controllers/authController");

// rota recuperacao de senha

router.post("/recuperar-senha", solicitarRecuperacaoSenha);
router.post("/redefinir-senha", redefinirSenha);

// 🔹 Rota de Cadastro de Usuário
router.post("/signup", async (req, res) => {
  try {
    const { nome, email, senha, tp_user, pref_alim, data_nascimento } =
      req.body;

    // 📌 Verifica se todos os campos obrigatórios foram preenchidos
    if (
      !nome ||
      !email ||
      !senha ||
      !tp_user ||
      !pref_alim ||
      !data_nascimento
    ) {
      return res
        .status(400)
        .json({ msg: "Preencha todos os campos obrigatórios." });
    }

    // 🔍 Verifica se o usuário já existe
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ msg: "E-mail já cadastrado." });
    }

    // 🔑 Criptografa a senha antes de salvar
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    // 📌 Cria o usuário no banco de dados
    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha: senhaCriptografada,
      tp_user,
      pref_alim,
      data_nascimento,
    });

    // 🔹 Gera um token JWT para o usuário recém-cadastrado
    const token = jwt.sign(
      { id: novoUsuario.id, email: novoUsuario.email, nome: novoUsuario.nome },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(201).json({
      msg: "Usuário cadastrado com sucesso!",
      token,
      usuario: {
        id: novoUsuario.id_user,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
        tp_user: novoUsuario.tp_user,
      },
    });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    res.status(500).json({ msg: "Erro interno no servidor." });
  }
});

// 🔹 Exporte as rotas
module.exports = router;
