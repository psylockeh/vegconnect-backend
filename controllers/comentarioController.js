const { Comentario, Usuario } = require("../models");

const ComentarioController = {
  async criarComentario(req, res) {
    try {
      const { postagem_id, conteudo } = req.body;
      const usuario_id = req.user.id_user;

      if (!conteudo || !postagem_id) {
        return res
          .status(400)
          .json({ msg: "Conteúdo e ID da postagem são obrigatórios." });
      }

      const novoComentario = await Comentario.create({
        usuario_id,
        postagem_id,
        conteudo,
      });

      return res.status(201).json(novoComentario);
    } catch (error) {
      console.error("Erro ao criar comentário:", error);
      return res.status(500).json({ msg: "Erro interno ao criar comentário." });
    }
  },

  async listarPorPostagem(req, res) {
    try {
      const postagemId = Number(req.params.postagemId);

      const comentarios = await Comentario.findAll({
        where: { postagem_id: postagemId },
        include: {
          model: Usuario,
          as: "usuario",
          attributes: ["id_user", "nome", "nickname", "foto_perfil"],
        },
        order: [["createdAt", "DESC"]],
      });

      return res.status(200).json(comentarios);
    } catch (error) {
      console.error("Erro ao listar comentários:", error);
      return res
        .status(500)
        .json({ msg: "Erro interno ao buscar comentários." });
    }
  },
};

module.exports = ComentarioController;
