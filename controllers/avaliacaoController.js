const { Postagem, Usuario, AvaliacaoPostagem } = require("../models");
const { Op, Sequelize } = require("sequelize");

const AvaliacaoController = {
  //Avaliação Postagens, exceto "Recado"
  async avaliar(req, res) {
    try {
      const { postagem_id, estrelas, comentario_positivo, comentario_negativo } = req.body;
      const usuario_id = req.user.id_user;

      // Verificar se a postagem existe
      const postagem = await Postagem.findByPk(postagem_id);
      if (!postagem) {
        return res.status(404).json({ erro: "Postagem não encontrada." });
      }

      // Impedir avaliações em postagens do tipo "recado"
      if (postagem.tp_post === "recado") {
        return res.status(400).json({ erro: "Postagens do tipo 'recado' não podem ser avaliadas." });
      }

      // Validar estrelas (supondo que seja uma nota de 1 a 5)
      if (typeof estrelas !== "number" || estrelas < 1 || estrelas > 5) {
        return res.status(400).json({ erro: "A avaliação deve ter entre 1 e 5 estrelas." });
      }

      // Criar avaliação no banco
      const avaliacao = await AvaliacaoPostagem.create({
        postagem_id,
        usuario_id,
        estrelas,
        comentario_positivo: comentario_positivo || null,
        comentario_negativo: comentario_negativo || null,
      });

      return res.status(201).json({ msg: "Avaliação criada com sucesso.", avaliacao });
    } catch (error) {
      console.error("Erro ao avaliar postagem:", error);
      return res.status(500).json({ erro: "Erro ao criar avaliação." });
    }
  },

  //Verificar Status avaliação
  async statusAvaliacao(req, res) {
    try {
      const usuario_id = req.user.id_user;
      const { postagem_id } = req.params;

      const avaliacao = await AvaliacaoPostagem.findOne({
        where: { usuario_id, postagem_id },
      });

      if (!avaliacao) {
        return res.status(200).json({ avaliou: false });
      }

      return res.status(200).json({ avaliou: true, avaliacao });
    } catch (error) {
      console.error("Erro ao verificar avaliação:", error);
      return res.status(500).json({ erro: "Erro ao verificar status da avaliação." });
    }
  },

  // Listar avaliações
  async listarAvaliacoes(req, res) {
    try {
      const { postagem_id } = req.params;

      // Verifica se a postagem existe e não é do tipo "recado"
      const postagem = await Postagem.findByPk(postagem_id);
      if (!postagem) {
        return res.status(404).json({ erro: "Postagem não encontrada." });
      }
      if (postagem.tp_post === "recado") {
        return res.status(400).json({ erro: "Postagens do tipo 'recado' não possuem avaliações listáveis." });
      }

      // Buscar avaliações com dados do usuário 
      const avaliacoes = await AvaliacaoPostagem.findAll({
        where: { postagem_id },
        include: [{
          model: Usuario,
          as: "usuario",
          attributes: [
            "id_user",
            "nome",
            "tp_user",
            "foto_perfil",
            "nickname",
          ],
        }],
        order: [['createdAt', 'DESC']],
      });

      return res.status(200).json({ postagem_id, avaliacoes });
    } catch (error) {
      console.error("Erro ao listar avaliações:", error);
      return res.status(500).json({ erro: "Erro ao listar avaliações." });
    }
  },

  // Media das avaliações
  async mediaAvaliacoes(req, res) {
    try {
      const { postagem_id } = req.params;

      // Verifica se a postagem existe
      const postagem = await Postagem.findByPk(postagem_id);
      if (!postagem) {
        return res.status(404).json({ erro: "Postagem não encontrada." });
      }

      // Postagens do tipo 'recado' não possuem média de avaliações
      if (postagem.tp_post === "recado") {
        return res.status(400).json({ erro: "Postagens do tipo 'recado' não possuem avaliações." });
      }

      // Calcula média e total das avaliações
      const resultado = await AvaliacaoPostagem.findOne({
        where: { postagem_id },
        attributes: [
          [Sequelize.fn("AVG", Sequelize.col("estrelas")), "mediaEstrelas"],
          [Sequelize.fn("COUNT", Sequelize.col("id")), "totalAvaliacoes"],
        ],
        raw: true,
      });

      const media = resultado.mediaEstrelas ? parseFloat(resultado.mediaEstrelas).toFixed(1) : "0.0";
      const total = resultado.totalAvaliacoes || 0;

      return res.status(200).json({ media: parseFloat(media), total });
    } catch (error) {
      console.error("Erro ao calcular média de avaliações:", error);
      return res.status(500).json({ erro: "Erro ao calcular média das avaliações." });
    }
  }
};

module.exports = AvaliacaoController;
