const { Usuario } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Cadastro (signup)
const signup = async (req, res) => {
  const { nome, email, senha, tp_user, pref_alim, data_nascimento } = req.body;

  if (!nome || !email || !senha || !tp_user || !pref_alim || !data_nascimento) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  try {
    const usuarioExistente = await Usuario.findOne({ where: { email } });

    if (usuarioExistente) {
      return res.status(400).json({ error: "Usuário já existe!" });
    }

    const hashedSenha = await bcrypt.hash(senha, 10);

    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha: hashedSenha,
      tp_user,
      pref_alim,
      data_nascimento,
    });

    return res.status(201).json({
      id_user: novoUsuario.id_user,
      nome: novoUsuario.nome,
      email: novoUsuario.email,
      tp_user: novoUsuario.tp_user,
      pref_alim: novoUsuario.pref_alim,
      data_nascimento: novoUsuario.data_nascimento,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// signin
const signin = async (req, res) => {
  console.log("🔹 Dados recebidos no backend:", req.body); // LOG PARA DEBUG

  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: "Email e senha são obrigatórios." });
  }

  try {
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(404).json({ error: "Email ou senha incorretos." });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ error: "Email ou senha incorretos." });
    }

    const token = jwt.sign(
      { id_user: usuario.id_user },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao realizar login." });
  }
};

// buscar perfil (rota protegida)
const getPerfil = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.userId, {
      attributes: [
        "id_user",
        "nome",
        "email",
        "tp_user",
        "pref_alim",
        "data_nascimento",
      ],
    });

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar perfil." });
  }
};

module.exports = { signup, signin, getPerfil };
