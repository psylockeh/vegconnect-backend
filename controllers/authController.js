const { Usuario } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const transporter = require("../config/mail.Config");
const { Op } = require("sequelize");
require("dotenv").config();

// recuperacao de senha
exports.solicitarRecuperacaoSenha = async (req, res) => {
  const { email } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(404).json({ message: "E-mail não encontrado." });
    }

    const token = crypto.randomBytes(20).toString("hex");
    const expiracao = new Date();
    expiracao.setHours(expiracao.getHours() + 1);

    await usuario.update({
      reset_token: token,
      reset_token_expira: expiracao,
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: usuario.email,
      subject: "Recuperação de Senha - VegConnect",
      html: `
        <p>Olá ${usuario.nome},</p>
        <p>Recebemos um pedido para redefinir sua senha. Clique no link abaixo:</p>
        <p><a href="${process.env.FRONTEND_URL}/reset-password?token=${token}">Redefinir Senha</a></p>
        <p>Este link expira em 1 hora.</p>
        <p>Se não solicitou, ignore este e-mail.</p>
        <p>Equipe VegConnect</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.json({ message: "E-mail de recuperação enviado com sucesso!" });
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    return res.status(500).json({ message: "Erro interno no servidor." });
  }
};

// redefine a senha
exports.redefinirSenha = async (req, res) => {
  const { token, novaSenha } = req.body;

  try {
    const usuario = await Usuario.findOne({
      where: {
        reset_token: token,
        reset_token_expira: { [Op.gt]: new Date() },
      },
    });

    if (!usuario) {
      return res.status(400).json({ message: "Token inválido ou expirado." });
    }

    const senhaHash = await bcrypt.hash(novaSenha, 10);

    await usuario.update({
      senha: senhaHash,
      reset_token: null,
      reset_token_expira: null,
    });

    return res.json({ message: "Senha redefinida com sucesso!" });
  } catch (error) {
    console.error("Erro ao redefinir senha:", error);
    return res.status(500).json({ message: "Erro interno no servidor." });
  }
};
