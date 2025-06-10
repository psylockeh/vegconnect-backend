const { Postagem, Usuario, ListaFavorito, Favorito } = require("../models");
const { Op, Sequelize } = require("sequelize");

const FavoritoController = {
  // Criar lista de favoritos
  async criarListaFavoritos(req, res) {
    try {
      const { nome } = req.body;
      const usuario_id = req.user.id_user;

      const lista = await ListaFavorito.create({ nome, usuario_id });
      return res.status(201).json(lista);
    } catch (error) {
      console.error("Erro ao criar lista:", error);
      return res.status(500).json({ erro: "Erro ao criar lista de favoritos." });
    }
  },

  // Listar listas do usuário
  async listarListasFavoritos(req, res) {
    try {
      const usuario_id = req.user.id_user;

      const listas = await ListaFavorito.findAll({
        where: { usuario_id },
        include: [{ model: Favorito, as: "favoritos" }],
      });

      return res.status(200).json(listas);
    } catch (error) {
      console.error("Erro ao listar listas:", error);
      return res.status(500).json({ erro: "Erro ao buscar listas." });
    }
  },

  // Favoritar uma postagem
  async favoritar(req, res) {
    try {
      const usuario_id = req.user.id_user;
      const { postagem_id } = req.params;
      const { lista_id } = req.body;

      const jaExiste = await Favorito.findOne({
        where: { usuario_id, postagem_id },
      });

      if (jaExiste) {
        return res.status(400).json({ erro: "Postagem já favoritada." });
      }

      const favorito = await Favorito.create({ usuario_id, postagem_id, lista_id });

      return res.status(201).json(favorito);
    } catch (error) {
      console.error("Erro ao favoritar:", error);
      return res.status(500).json({ erro: "Erro ao favoritar." });
    }
  },

  // Desfavoritar uma postagem
  async desfavoritar(req, res) {
    try {
      const usuario_id = req.user.id_user;
      const { postagem_id } = req.params;

      const removido = await Favorito.destroy({
        where: { usuario_id, postagem_id },
      });

      if (!removido) {
        return res.status(404).json({ erro: "Favorito não encontrado." });
      }

      return res.status(200).json({ msg: "Desfavoritado com sucesso." });
    } catch (error) {
      console.error("Erro ao desfavoritar:", error);
      return res.status(500).json({ erro: "Erro ao desfavoritar." });
    }
  },

  // Listar postagens favoritedas de uma lista específica
  async listarFavoritosDaLista(req, res) {
    try {
      const usuario_id = req.user.id_user;
      const { lista_id } = req.params;

      const favoritos = await Favorito.findAll({
        where: { usuario_id, lista_id },
        include: [
          {
            model: Postagem,
            as: "postagem",
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
          },
        ],
      });

      return res.status(200).json(favoritos);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao listar favoritos da lista." });
    }
  },

  // Verifica status de favorito da Postagem
  async statusFavorito(req, res) {
    try {
      const usuario_id = req.user.id_user;
      const postagemId = parseInt(req.params.postagem_id, 10);

      const favorito = await Favorito.findOne({
        where: {
          usuario_id,
          postagem_id: postagemId,
        },
        include: [
          {
            model: ListaFavorito,
            as: "lista"
          }
        ]
      });

      return res.status(200).json({
        favoritado: !!favorito,
        listaId: favorito?.lista_id || null
      });

    } catch (error) {
      console.error("Erro ao verificar status de favorito:", error);
      return res.status(500).json({ erro: "Erro ao verificar status de favorito." });
    }
  },

  // Editar nome da lista de favoritos
  async editarListaFavoritos(req, res) {
    try {
      const usuario_id = req.user.id_user;
      const { lista_id } = req.params;
      const { novo_nome } = req.body;

      if (!novo_nome || novo_nome.trim() === "") {
        return res.status(400).json({ erro: "O novo nome da lista é obrigatório." });
      }

      const lista = await ListaFavorito.findOne({
        where: { id: lista_id, usuario_id },
      });

      if (!lista) {
        return res.status(404).json({ erro: "Lista não encontrada." });
      }

      lista.nome = novo_nome.trim();
      await lista.save();

      return res.status(200).json({ msg: "Nome da lista atualizado com sucesso.", lista });
    } catch (error) {
      console.error("Erro ao editar lista:", error);
      return res.status(500).json({ erro: "Erro ao editar nome da lista de favoritos." });
    }
  },

  // Excluir lista de favoritos e os favoritos relacionados
  async excluirListaFavoritos(req, res) {
    try {
      const usuario_id = req.user.id_user;
      const { lista_id } = req.params;

      const lista = await ListaFavorito.findOne({
        where: { id: lista_id, usuario_id },
      });

      if (!lista) {
        return res.status(404).json({ erro: "Lista não encontrada." });
      }

      await Favorito.destroy({ where: { lista_id } });
      await ListaFavorito.destroy({ where: { id: lista_id } });

      return res.status(200).json({ msg: "Lista e favoritos da lista excluídos com sucesso." });
    } catch (error) {
      console.error("Erro ao excluir lista:", error);
      return res.status(500).json({ erro: "Erro ao excluir lista de favoritos." });
    }
  },
};

module.exports = FavoritoController;
