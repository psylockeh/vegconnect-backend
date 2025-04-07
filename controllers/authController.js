const { Usuario } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const transporter = require("../config/mail.Config");
const { Op } = require("sequelize");
require("dotenv").config();

// Recuperação de senha
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

// Redefine a senha
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

// Login
exports.signin = async (req, res) => {
  const { email, senha } = req.body;

  try {
    if (!email || !senha) {
      return res
        .status(400)
        .json({ msg: "Preencha todos os campos obrigatórios." });
    }

    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(404).json({ msg: "E-mail não cadastrado." });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ msg: "Senha incorreta." });
    }

    const token = jwt.sign(
      { id_user: usuario.id_user, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" },
    );

    res.json({
      msg: "Login efetuado com sucesso!",
      token,
      usuario: {
        id_user: usuario.id_user,
        nome: usuario.nome,
        email: usuario.email,
        tp_user: usuario.tp_user,
      },
    });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).json({ msg: "Erro interno no servidor." });
  }
};

exports.signup = async (req, res) => {
  const {
    nome,
    email,
    senha,
    telefone,
    data_nascimento,
    tp_user,
    nickname,
    bio,
    foto_perfil,
    nome_com,
    tel_com,
    especialidade,
    tipo_prod,
    tipo_com,
    ender_com,
    cnpj,
    cep_com,
    certificacoes,
    cargo,
    matricula,
    pref_alim,
  } = req.body;

  if (!nome || !email || !senha || !data_nascimento || !tp_user) {
    return res
      .status(400)
      .json({ msg: "Preencha todos os campos obrigatórios." });
  }

  try {
    const usuarioExistente = await Usuario.findOne({ where: { email } });

    if (usuarioExistente) {
      return res.status(400).json({ msg: "E-mail já cadastrado." });
    }

    // Validação dos campos de acordo com o tipo de usuário
    if (tp_user === "comerciante") {
      if (!nome_com || !tel_com || !cnpj || !cep_com) {
        return res.status(400).json({
          msg: "Campos do comerciante obrigatórios: nome do comércio, telefone, CNPJ e CEP.",
        });
      }
    } else if (tp_user === "chef") {
      if (!especialidade) {
        return res.status(400).json({
          msg: "Campo de especialidade obrigatório para chef.",
        });
      }
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha: senhaCriptografada,
      telefone,
      data_nascimento,
      tp_user,
      nickname,
      bio,
      foto_perfil,
      nome_comercio: nome_com,
      tel_com,
      especialidade,
      tipo_prod,
      tipo_com,
      ender_com,
      cnpj,
      cep_com,
      certificacoes,
      cargo,
      matricula,
      pref_alim,
    });

    return res.status(201).json({
      msg: "Usuário cadastrado com sucesso!",
      usuario: {
        id_user: novoUsuario.id_user,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
        tp_user: novoUsuario.tp_user,
        telefone: novoUsuario.telefone,
        data_nascimento: novoUsuario.data_nascimento,
        nickname: novoUsuario.nickname,
      },
    });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    return res.status(500).json({ msg: "Erro interno ao cadastrar usuário." });
  }
};
