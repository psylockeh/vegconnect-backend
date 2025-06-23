const { Postagem, Repostagem } = require("../models");

const RepostController = {
  async criarRepost(req, res) {
    try {
      const usuario_id = req.user.id_user;
      const { postagemId } = req.params;

      const repostExistente = await Repostagem.findOne({
        where: { usuario_id, repost_de: postagemId },
      });

      if (repostExistente) {
        return res.status(400).json({ msg: "Postagem já repostada." });
      }

      const novaPostagem = await Postagem.create({
        usuario_id,
        tp_post: "repost",
        repost_de: postagemId,
      });

      await Repostagem.create({
        usuario_id,
        repost_de: postagemId,
        postagem_id: novaPostagem.id,
      });

      return res.status(201).json(novaPostagem);
    } catch (error) {
      console.error("Erro ao repostar:", error);
      return res.status(500).json({ msg: "Erro ao repostar." });
    }
  },
};

module.exports = RepostController;
