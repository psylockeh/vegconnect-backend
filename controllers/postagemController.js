const { Postagem, Usuario } = require("../models");

const PostagemController = {
  async detalhar(req, res) {
    try {
      const { id } = req.params;

      const postagem = await Postagem.findByPk(id, {
        attributes: [
          "id",
          "usuario_id",
          "tp_post",
          "titulo",
          "conteudo",
          "categoria",
          "tag",
          "selo_confianca",
          "createdAt",
          "updatedAt",
          "midia_urls",
        ],
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

      if (!postagem) {
        return res.status(404).json({ erro: "Postagem não encontrada." });
      }

      return res.status(200).json(postagem);
    } catch (error) {
      console.error("Erro ao buscar postagem:", error);
      return res.status(500).json({ erro: "Erro ao buscar postagem." });
    }
  },

  async listar(req, res) {
    try {
      const postagens = await Postagem.findAll({
        order: [["createdAt", "DESC"]],
        attributes: [
          "id",
          "usuario_id",
          "tp_post",
          "titulo",
          "conteudo",
          "categoria",
          "tag",
          "selo_confianca",
          "createdAt",
          "updatedAt",
          "midia_urls",
        ],
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

      return res.status(200).json(postagens);
    } catch (error) {
      console.error("Erro ao listar postagens:", error);
      return res.status(500).json({ erro: "Erro ao buscar postagens." });
    }
  },

  async criar(req, res) {
    console.log("USUÁRIO AUTENTICADO:", req.user);

    try {
      const {
        tp_post,
        titulo,
        conteudo,
        categoria,
        tag,
        temp_prep,
        instrucoes,
        ingredientes,
        nome_receita,
        data,
        localizacao,
        nome_comercio,
        descricao_comercio,
        tp_comida,
        hora_abertura,
        hora_fechamento,
        cep,
        endereco,
        valor,
        links,
        midia_urls,
      } = req.body;

      const { id_user, tp_user } = req.user;

      // 1. Validação de permissão por tipo de usuário
      const permissoes = {
        Comum: ["receita", "recado", "evento"],
        Chef: ["receita", "recado", "evento"],
        Comerciante: [
          "receita",
          "recado",
          "evento",
          "estabelecimento",
          "promocao",
        ],
      };
      console.log("Tipo de usuário:", tp_user, "| Tipo de postagem:", tp_post);
      if (!permissoes[tp_user]?.includes(tp_post)) {
        return res.status(403).json({
          erro: `Usuário do tipo ${tp_user} não pode criar postagens do tipo ${tp_post}.`,
        });
      }

      // 2. Validação de campos obrigatórios por tipo de postagem
      if (!conteudo) {
        return res
          .status(400)
          .json({ erro: 'O campo "conteudo" é obrigatório.' });
      }

      if (
        ["receita", "evento", "estabelecimento"].includes(tp_post) &&
        !titulo
      ) {
        return res.status(400).json({
          erro: 'O campo "titulo" é obrigatório para esse tipo de postagem.',
        });
      }

      const dadosBase = {
        usuario_id: id_user,
        tp_post,
        titulo: titulo || null,
        conteudo,
        categoria: categoria || null,
        tag: tag || null,
        selo_confianca: tp_user === "Chef",
        midia_urls: req.body.midia_urls || null,
      };

      // 3. Preenchimento condicional conforme o tipo da postagem
      switch (tp_post) {
        case "receita":
          if (!nome_receita || !ingredientes || !instrucoes || !temp_prep) {
            return res
              .status(400)
              .json({ msg: "Todos os campos da receita são obrigatórios." });
          }
          Object.assign(dadosBase, {
            nome_receita,
            ingredientes,
            instrucoes,
            temp_prep,
            midia_urls,
          });
          break;

        case "evento":
          if (valor === undefined || isNaN(valor) || !localizacao) {
            return res.status(400).json({
              msg: "Localização e valor numérico são obrigatórios para evento.",
            });
          }
          Object.assign(dadosBase, {
            data,
            localizacao,
            valor,
            links,
            midia_urls,
          });
          break;

        case "estabelecimento":
          if (
            !nome_comercio ||
            !descricao_comercio ||
            !tp_comida ||
            !hora_abertura ||
            !hora_fechamento ||
            !cep ||
            !endereco
          ) {
            return res.status(400).json({
              msg: "Todos os campos de estabelecimento são obrigatórios.",
            });
          }
          Object.assign(dadosBase, {
            nome_comercio,
            descricao_comercio,
            tp_comida,
            hora_abertura,
            hora_fechamento,
            cep,
            endereco,
            midia_urls,
          });
          break;
      }
      if (req.body.midia_urls) {
        dadosBase.midia_urls = req.body.midia_urls;
      }

      // 4. Criar postagem
      const novaPostagem = await Postagem.create(dadosBase);

      return res.status(201).json(novaPostagem);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: "Erro ao criar postagem." });
    }
  },
};

module.exports = PostagemController;
