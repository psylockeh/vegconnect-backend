const { Curtida } = require("../models");

const CurtidaController = {
  async curtirPostagem(req, res) {
    try {
      const usuario_id = req.user?.id_user;
      const { postagemId } = Number(req.params);

      console.log("📥 CurtidaController > req.user:", req.user);
      console.log("📥 CurtidaController > req.params:", req.params);

      if (!req.user?.id_user || !req.params?.postagemId) {
        return res
          .status(400)
          .json({ msg: "ID do usuário ou postagem ausente." });
      }

      /*
      if (!usuario_id || !postagemId) {
        return res
          .status(400)
          .json({ msg: "ID do usuário ou postagem ausente." });
      }
*/
      const curtidaExistente = await Curtida.findOne({
        where: { usuario_id, postagem_id: Number(postagemId) },
      });

      if (curtidaExistente) {
        return res
          .status(400)
          .json({ msg: "Postagem já curtida por este usuário." });
      }

      const novaCurtida = await Curtida.create({
        usuario_id,
        postagem_id: postagemId,
      });

      return res.status(201).json(novaCurtida);
    } catch (error) {
      console.error("Erro ao curtir postagem:", error);
      return res.status(500).json({ msg: "Erro interno ao curtir postagem." });
    }
  },

  async removerCurtida(req, res) {
    try {
      const usuario_id = req.user.id_user;
      const { postagemId } = Number(req.params);

      const deletado = await Curtida.destroy({
        where: { usuario_id, postagem_id: postagemId },
      });

      if (!deletado) {
        return res.status(404).json({ msg: "Curtida não encontrada." });
      }

      return res.status(200).json({ msg: "Curtida removida com sucesso." });
    } catch (error) {
      console.error("Erro ao remover curtida:", error);
      return res.status(500).json({ msg: "Erro interno ao remover curtida." });
    }
  },

  async verificarCurtida(req, res) {
    try {
      const usuario_id = req.user.id_user;
      const { postagemId } = Number(req.params);

      const curtida = await Curtida.findOne({
        where: { usuario_id, postagem_id: postagemId },
      });

      const total = await Curtida.count({
        where: { postagem_id: postagemId },
      });

      return res.status(200).json({ curtido: !!curtida, total });
    } catch (error) {
      console.error("Erro ao verificar curtida:", error);
      return res
        .status(500)
        .json({ msg: "Erro interno ao verificar curtida." });
    }
  },
};

module.exports = CurtidaController;
