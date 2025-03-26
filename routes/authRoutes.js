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
const { authMiddleware } = require("../middlewares/authMiddleware");

// rota recuperacao de senha

router.post("/recuperar-senha", solicitarRecuperacaoSenha);
router.post("/redefinir-senha", redefinirSenha);

// login usuario
router.post("/signin", async (req, res) => {
  try {
    const { email, senha } = req.body;

    // campos preenchidos
    if (!email || !senha) {
      return res
        .status(400)
        .json({ msg: "Preencha todos os campos obrigatórios." });
    }

    // usuario existe
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(404).json({ msg: "E-mail não cadastrado." });
    }

    // senha correta
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ msg: "Senha incorreta." });
    }

    // gera token
    const token = jwt.sign(
      { id: usuario.id_user, email: usuario.email, nome: usuario.nome },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      msg: "Login efetuado com sucesso!",
      token,
      usuario: {
        id: usuario.id_user,
        nome: usuario.nome,
        email: usuario.email,
        tp_user: usuario.tp_user,
      },
    });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).json({ msg: "Erro interno no servidor." });
  }
});

// cadastro usuario
router.post("/signup", async (req, res) => {
  try {
    const { nome, email, senha, tp_user, pref_alim, data_nascimento } =
      req.body;

    // campos preenchidos
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

    // usuario existe
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ msg: "E-mail já cadastrado." });
    }

    // criptografa
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    // cria usuario
    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha: senhaCriptografada,
      tp_user,
      pref_alim,
      data_nascimento,
    });

    // gera token
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

module.exports = router;
