const { Postagem } = require("../models");

const PostagemController = {
  async criar(req, res) {
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
      } = req.body;

      const { id_user, tipo_usuario } = req.user;

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

      if (!permissoes[tipo_usuario]?.includes(tp_post)) {
        return res.status(403).json({
          erro: `Usuário do tipo ${tipo_usuario} não pode criar postagens do tipo ${tp_post}.`,
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
        selo_confiança: false,
      };

      // 3. Preenchimento condicional conforme o tipo da postagem
      switch (tp_post) {
        case "receita":
          Object.assign(dadosBase, {
            temp_prep,
            instrucoes,
            ingredientes,
            nome_receita,
          });
          break;

        case "evento":
          Object.assign(dadosBase, {
            data,
            localizacao,
          });
          break;

        case "estabelecimento":
          Object.assign(dadosBase, {
            nome_comercio,
            descricao_comercio,
            tp_comida,
            hora_abertura,
            hora_fechamento,
            cep,
            endereco,
          });
          break;
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
