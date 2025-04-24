const { Usuario } = require("../models");
const bcrypt = require("bcryptjs");

exports.atualizarPerfil = async (req, res) => {
  const { id_user } = req.user;
  console.log("Dados recebidos para atualização:", req.body);

  const {
    nome,
    telefone,
    nickname,
    senha,
    bio,
    data_nascimento,
    email,
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

  try {
    const usuario = await Usuario.findByPk(id_user);

    if (!usuario) {
      return res.status(404).json({ msg: "Usuário não encontrado." });
    }

    // Validação dos campos obrigatórios para os tipos de usuário
    if (usuario.tp_user === "comerciante") {
      if (!nome_com || !tel_com || !cnpj || !cep_com) {
        return res.status(400).json({
          msg: "Campos do comerciante obrigatórios: nome do comércio, telefone, CNPJ e CEP.",
        });
      }
    } else if (usuario.tp_user === "chef") {
      if (!especialidade) {
        return res.status(400).json({
          msg: "Campo de especialidade obrigatório para chef.",
        });
      }
    }

    const camposParaAtualizar = {
      nome,
      telefone,
      nickname,
      senha,
      bio,
      data_nascimento,
      email,
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
    };

    if (senha) {
      const salt = await bcrypt.genSalt(10);
      const senhaHash = await bcrypt.hash(senha, salt);
      camposParaAtualizar.senha = senhaHash;
    }

    // Remove os campos com valor undefined
    Object.keys(camposParaAtualizar).forEach(
      (key) =>
        camposParaAtualizar[key] === undefined &&
        delete camposParaAtualizar[key],
    );

    console.log("📥 Campos para update:", camposParaAtualizar);

    await usuario.update(camposParaAtualizar);

    console.log("✅ Atualização executada!");

    const usuarioAtualizado = await Usuario.findByPk(id_user, {
      attributes: { exclude: ["senha"] },
    });

    return res.status(200).json(usuarioAtualizado);
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error);
    return res.status(500).json({ msg: "Erro interno no servidor." });
  }
};

exports.getPerfil = async (req, res) => {
  const { id_user } = req.user;

  try {
    const usuario = await Usuario.findByPk(id_user, {
      attributes: {
        exclude: ["senha"],
      },
    });

    if (!usuario) {
      return res.status(404).json({ msg: "Usuário não encontrado" });
    }

    return res.status(200).json(usuario);
  } catch (error) {
    console.error("Erro ao carregar perfil:", error);
    return res.status(500).json({ msg: "Erro interno no servidor." });
  }
};
