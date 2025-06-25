const { Postagem, Repostagem } = require("../models");

const RepostController = {
  async criarRepost(req, res) {
    try {
      if (!req.user || !req.user.id_user) {
        return res.status(401).json({ msg: "Usuário não autenticado." });
      }

      const usuario_id = req.user.id_user;
      const { postagemId } = req.params;

      const postagemExistente = await Postagem.findByPk(postagemId);
      if (!postagemExistente) {
        return res.status(404).json({ msg: "Postagem não encontrada." });
      }

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
