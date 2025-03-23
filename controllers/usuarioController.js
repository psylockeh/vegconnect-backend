const {
  Usuario,
  UsuarioComerciante,
  UsuarioChef,
  UsuarioComum,
} = require("../models");

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
    pref_alim,
  } = req.body;

  try {
    const usuario = await Usuario.findByPk(id_user);

    if (!usuario)
      return res.status(404).json({ msg: "Usuário não encontrado" });

    // atualiza perfil
    await usuario.update({
      nome,
      telefone,
      nickname,
      bio,
      foto_perfil,
    });

    // atualiza dados conforme tipo
    if (usuario.tp_user === "Comerciante") {
      await UsuarioComerciante.update(
        { nome_comercio, tel_com },
        { where: { id_user_comerciante: id_user } }
      );
    }

    if (usuario.tp_user === "Chef") {
      await UsuarioChef.update(
        { especialidade },
        { where: { id_user_chef: id_user } }
      );
    }

    if (usuario.tp_user === "Comum") {
      await UsuarioComum.update(
        { pref_alim },
        { where: { id_comum: id_user } }
      );
    }

    return res.status(200).json({ msg: "Perfil atualizado com sucesso!" });
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error);
    return res.status(500).json({ msg: "Erro interno no servidor." });
  }
};
