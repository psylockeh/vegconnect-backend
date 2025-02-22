const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');


const SECRET_KEY = process.env.JWT_SECRET || "chave_super_secreta";

exports.signup = async (req, res) => {
  try {
    const { nome, email, senha, tp_user, pref_alim, dt_nasc } = req.body;

    // Verifica se o usuário já existe
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ erro: "Email já cadastrado!" });
    }

    // Criptografa a senha antes de salvar no banco
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    // Cria o novo usuário
    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha: senhaCriptografada,
      tp_user,
      pref_alim,
      dt_nasc
    });

    res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!", usuario: novoUsuario });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao cadastrar usuário", detalhes: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Verifica se o usuário existe
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(401).json({ erro: "Usuário ou senha inválidos!" });
    }

    // Compara a senha 
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ erro: "Usuário ou senha inválidos!" });
    }

    // Gera o token JWT
    const token = jwt.sign({ id: usuario.id_user, email: usuario.email }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ mensagem: "Login realizado com sucesso!", token });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao realizar login", detalhes: error.message });
  }
};
