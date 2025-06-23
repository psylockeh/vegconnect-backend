const { Postagem } = require("../models");

const RepostController = {
  async criarRepost(req, res) {
    const { postagem_id } = req.body;
    const usuario_id = req.usuario.id_user;

    try {
      const original = await Postagem.findByPk(postagem_id);

      if (!original) {
        return res
          .status(404)
          .json({ msg: "Postagem original não encontrada." });
      }

      const repost = await Postagem.create({
        usuario_id,
        tp_post: "repost",
        repost_de: original.id,
        conteudo: original.conteudo,
        midia_urls: original.midia_urls,
        titulo: `Repost de @${original.autor?.nickname || "usuário"}`,
        data: new Date(),
      });

      return res
        .status(201)
        .json({ msg: "Repost criado com sucesso!", repost });
    } catch (error) {
      console.error("Erro ao criar repost:", error);
      return res.status(500).json({ msg: "Erro interno ao repostar." });
    }
  },
};

module.exports = RepostController;
