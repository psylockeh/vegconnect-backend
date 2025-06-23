const { Repostagem, Postagem } = require("../models");

const RepostController = {
  async criarRepost(req, res) {
    try {
      const usuario_id = req.user.id_user;
      const { postagemId } = req.params;

      const repostExistente = await Repostagem.findOne({
        where: { usuario_id, repost_de: postagemId },
      });

      if (repostExistente) {
        return res
          .status(400)
          .json({ msg: "Postagem já repostada por este usuário." });
      }

      const repost = await Postagem.create({
        usuario_id,
        tp_post: "repost",
        repost_de: postagemId,
      });

      await Repostagem.create({
        usuario_id,
        repost_de: postagemId,
        postagem_id: repost.id,
      });

      return res.status(201).json(repost);
    } catch (error) {
      console.error("Erro ao criar repost:", error);
      return res.status(500).json({ msg: "Erro interno ao criar repost." });
    }
  },

  async listarRepostsPorUsuario(req, res) {
    try {
      const { usuarioId } = req.params;

      const reposts = await Postagem.findAll({
        where: {
          tp_post: "repost",
          usuario_id: usuarioId,
        },
        include: [
          {
            model: Postagem,
            as: "original",
            include: ["autor"],
          },
        ],
        order: [["createdAt", "DESC"]],
      });

      return res.status(200).json(reposts);
    } catch (error) {
      console.error("Erro ao buscar reposts:", error);
      return res.status(500).json({ msg: "Erro interno ao listar reposts." });
    }
  },
};

module.exports = RepostController;
