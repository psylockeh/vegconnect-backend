const { Usuario } = require("../models");

exports.atualizarPerfil = async (req, res) => {
  const { id_user } = req.user;

  const {
    nome,
    telefone,
    nickname,
    bio,
    foto_perfil,
    nome_comercio,
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

    await usuario.update({
      nome,
      telefone,
      nickname,
      bio,
      foto_perfil,
      nome_comercio,
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
