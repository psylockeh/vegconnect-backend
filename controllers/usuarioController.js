const { Usuario } = require("../models");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

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

    if (nickname) {
      const jaExiste = await Usuario.findOne({
        where: {
          nickname,
          id_user: { [Op.ne]: req.user.id_user },
        },
      });

      if (jaExiste) {
        return res.status(400).json({ erro: "Nickname já está em uso." });
      }
    }

    if (email) {
      const emailExiste = await Usuario.findOne({
        where: {
          email,
          id_user: { [Op.ne]: req.user.id_user },
        },
      });

      if (emailExiste) {
        return res.status(400).json({ erro: "E-mail já está em uso." });
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
    if (
      !camposParaAtualizar.foto_perfil ||
      camposParaAtualizar.foto_perfil === "null"
    ) {
      camposParaAtualizar.foto_perfil =
        "https://res.cloudinary.com/dyhzz5baz/image/upload/v1746917561/default-avatar_jvqpsg.png";
    }

    if (senha) {
      const salt = await bcrypt.genSalt(10);
      const senhaHash = await bcrypt.hash(senha, salt);
      camposParaAtualizar.senha = senhaHash;
    }

    // Remove os campos com valor undefined
    Object.keys(camposParaAtualizar).forEach(
      (key) =>
        camposParaAtualizar[key] === undefined &&
        delete camposParaAtualizar[key]
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
  const id_user = req.params.id_user || req.user.id_user;

  try {
    const usuario = await Usuario.findByPk(id_user, {
      attributes: {
        exclude: ["senha"],
      },
    });

    return res.status(200).json(usuario);

    if (!usuario) {
      return res.status(404).json({ msg: "Usuário não encontrado" });
    }

    return res.status(200).json(usuario);
  } catch (error) {
    console.error("Erro ao carregar perfil:", error);
    return res.status(500).json({ msg: "Erro interno no servidor." });
  }
};

// Deletar Perfil
exports.deletarPerfil = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ msg: "❌ Usuário não encontrado." });
    }

    await Postagem.destroy({ where: { usuario_id: id } });
    await Usuario.destroy({ where: { id_user: id } });

    return res
      .status(200)
      .json({ msg: "📌 Usuário e postagens excluídos com sucesso." });
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    return res.status(500).json({ erro: "❌ Erro ao deletar usuário." });
  }
};