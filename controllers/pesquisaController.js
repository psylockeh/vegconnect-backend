const { Postagem, Usuario } = require("../models");
const { Op, Sequelize } = require("sequelize");
const geolocalizarCep = require("../utils/geolocalizarCep");

const PesquisaController = {
  //Pesquisa Geral(Perfil e Usuario)
  async pesquisaGeral(req, res) {
    try {
      const { tipo, pesquisa } = req.query;

      if (!pesquisa || !tipo) {
        return res
          .status(400)
          .json({ msg: "📌 Digite o que deseja pesquisar!!" });
      }

      let results = [];

      if (tipo === "usuario") {
        results = await Usuario.findAll({
          where: {
            [Op.or]: [
              { nome: { [Op.like]: `%${pesquisa}%` } },
              { nickname: { [Op.like]: `%${pesquisa}%` } },
              { tp_user: { [Op.like]: `%${pesquisa}%` } },
            ],
          },
          attributes: { exclude: ["senha"] },
        });
      } else if (
        ["recado", "receita", "evento", "estabelecimento", "promocao"].includes(
          tipo
        )
      ) {
        const filtros = {
          recado: [{ conteudo: { [Op.like]: `%${pesquisa}%` } }],
          receita: [
            { nome_receita: { [Op.like]: `%${pesquisa}%` } },
            { ingredientes: { [Op.like]: `%${pesquisa}%` } },
            { dificuldade: { [Op.like]: `%${pesquisa}%` } },
          ],
          evento: [
            { titulo: { [Op.like]: `%${pesquisa}%` } },
            { localizacao: { [Op.like]: `%${pesquisa}%` } },
            { tp_evento: { [Op.like]: `%${pesquisa}%` } },
          ],
          estabelecimento: [
            { nome_comercio: { [Op.like]: `%${pesquisa}%` } },
            { endereco: { [Op.like]: `%${pesquisa}%` } },
            { tp_comida: { [Op.like]: `%${pesquisa}%` } },
            { tipo_comercio: { [Op.like]: `%${pesquisa}%` } },
          ],
          promocao: [
            { titulo: { [Op.like]: `%${pesquisa}%` } },
            { descricao_resumida: { [Op.like]: `%${pesquisa}%` } },
            { nome_comercio: { [Op.like]: `%${pesquisa}%` } },
          ],
        };

        results = await Postagem.findAll({
          where: {
            tp_post: tipo,
            [Op.or]: filtros[tipo],
          },
          include: [
            {
              model: Usuario,
              as: "autor",
              attributes: [
                "id_user",
                "nome",
                "tp_user",
                "foto_perfil",
                "nickname",
              ],
            },
          ],
        });
      } else {
        return res.status(400).json({ msg: "❌ Erro ao realizar pesquisa!!" });
      }

      if (results.length === 0) {
        return res.status(404).json({ msg: "🌱 Nenhum resultado encontrado." });
      }

      return res.status(200).json(results);
    } catch (error) {
      console.error("Erro ao pesquisar:", error);
      return res
        .status(500)
        .json({ msg: "❌ Erro interno no servidor ao realizar a pesquisa!!" });
    }
  },
};

module.exports = PesquisaController;