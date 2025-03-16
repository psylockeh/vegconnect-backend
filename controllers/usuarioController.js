const { Usuario } = require("../models");

exports.getPerfilUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.user.id_user, {
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
      return res.status(404).json({ msg: "Usuário não encontrado." });
    }

    res.status(200).json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erro ao obter perfil do usuário." });
  }
};
