const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Usuario } = require("../models"); // Certifique-se de que o model do usuário está correto
require("dotenv").config();
const {
  solicitarRecuperacaoSenha,
  redefinirSenha,
} = require("../controllers/authController");

const router = express.Router();

// 🔹 Rota para solicitar a recuperação de senha
router.post("/recuperar-senha", solicitarRecuperacaoSenha);

// 🔹 Rota para redefinir a senha usando o token enviado por e-mail
router.post("/redefinir-senha", redefinirSenha);

// 🔹 Rota de Login
router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    // 🔍 Verifica se o usuário existe no banco
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(404).json({ msg: "Usuário não encontrado." });
    }

    // 🔍 Compara a senha com o hash salvo no banco
    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ msg: "Credenciais inválidas." });
    }

    // 🔹 Gera o token JWT
    const token = jwt.sign(
      {
        id: usuario.id_user,
        email: usuario.email,
        nome: usuario.nome,
        tipo: usuario.tp_user, // Inclui o tipo de usuário
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" } // Token válido por 2 horas
    );

    res.json({
      msg: "Login realizado com sucesso!",
      token,
      usuario: {
        id: usuario.id_user,
        nome: usuario.nome,
        email: usuario.email,
        tipo: usuario.tp_user,
      },
    });
  } catch (error) {
    console.error("Erro ao autenticar usuário:", error);
    res.status(500).json({ msg: "Erro interno no servidor." });
  }
});

module.exports = router;
