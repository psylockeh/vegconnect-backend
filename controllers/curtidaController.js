const { Curtida } = require("../models");

const CurtidaController = {
  async curtir(req, res) {
    const { postagem_id } = req.body;
    const usuario_id = req.usuario.id_user;

    try {
      const [like, created] = await Curtida.findOrCreate({
        where: { usuario_id, postagem_id },
      });

      if (!created) {
        return res
          .status(409)
          .json({ msg: "Usuário já curtiu esta postagem." });
      }

      return res.status(201).json({ msg: "Curtida registrada com sucesso." });
    } catch (error) {
      console.error("Erro ao curtir:", error);
      return res.status(500).json({ msg: "Erro interno ao curtir." });
    }
  },

  async removerCurtir(req, res) {
    const { postagem_id } = req.params;
    const usuario_id = req.usuario.id_user;

    try {
      const deletado = await Curtida.destroy({
        where: { usuario_id, postagem_id },
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

  async contarCurtidas(req, res) {
    const { postagem_id } = req.params;

    try {
      const total = await Curtida.count({
        where: { postagem_id },
      });

      return res.status(200).json({ total });
    } catch (error) {
      console.error("Erro ao contar curtidas:", error);
      return res.status(500).json({ msg: "Erro interno ao contar curtidas." });
    }
  },
};

module.exports = CurtidaController;
