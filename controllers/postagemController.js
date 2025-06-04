const { Postagem, Usuario, ListaFavorito, Favorito, AvaliacaoPostagem } = require("../models");
const { Op, Sequelize } = require("sequelize");
const geolocalizarCep = require("../utils/geolocalizarCep");

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

          // Receita
          "nome_receita",
          "ingredientes",
          "instrucoes",
          "temp_prep",
          "calorias",
          "dificuldade",
          "rendimento_quantidade",
          "tipo_rendimento",

          // Evento
          "data",
          "localizacao",
          "valor",
          "links",
          "tp_evento",
          "categoria_evento",
          "modalidade_evento",

          // Estabelecimento
          "nome_comercio",
          "descricao_comercio",
          "tp_comida",
          "hora_abertura",
          "hora_fechamento",
          "cep",
          "endereco",

          // Comum
          "descricao_resumida",
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
          {
            model: Usuario,
            as: "verificado_por",
            attributes: ["id_user", "nome", "nickname", "foto_perfil"],
          },
        ],
      });

      console.log("Resultado da busca por ID:", postagem);

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
          "calorias",
          "dificuldade",
          "rendimento_quantidade",
          "tipo_rendimento",
          "descricao_resumida",
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
          {
            model: Usuario,
            as: "verificado_por",
            attributes: ["id_user", "nome", "nickname", "foto_perfil"],
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
        descricao_resumida,
        calorias,
        dificuldade,
        tipo_rendimento,
        rendimento_quantidade,
        tp_evento,
        categoria_evento,
        modalidade_evento,
        data_evento,
        localizacao_evento,
        tipo_comercio,
        tipo_produto,
        tipo_servico,
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
        descricao_resumida: descricao_resumida || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // 3. Preenchimento condicional conforme o tipo da postagem
      switch (tp_post) {
        case "receita": {
          if (
            !nome_receita ||
            !ingredientes ||
            !instrucoes ||
            !temp_prep ||
            !midia_urls ||
            !descricao_resumida
          ) {
            return res
              .status(400)
              .json({ msg: "Todos os campos da receita são obrigatórios." });
          }
          if (
            descricao_resumida.length > 200 ||
            descricao_resumida.length < 10
          ) {
            return res.status(400).json({
              msg: "O resumo da receita deve ter entre 10 e 200 caracteres.",
            });
          }
          if (!Array.isArray(JSON.parse(categoria || "[]"))) {
            return res
              .status(400)
              .json({ msg: "Categoria da receita deve ser uma lista." });
          }
          Object.assign(dadosBase, {
            nome_receita: nome_receita.trim(),
            ingredientes,
            instrucoes,
            temp_prep,
            midia_urls,
            descricao_resumida: descricao_resumida.trim(),
            calorias,
            dificuldade,
            tipo_rendimento,
            rendimento_quantidade,
            categoria,
            selo_confianca: tp_user === "Chef",
          });

          break;
        }

        case "evento": {
          if (
            !localizacao ||
            !valor ||
            !descricao_resumida ||
            !tp_evento ||
            !categoria_evento ||
            !modalidade_evento
          ) {
            return res.status(400).json({
              msg: "Todos os campos obrigatórios do evento devem ser preenchidos.",
            });
          }

          if (
            descricao_resumida.length > 200 ||
            descricao_resumida.length < 10
          ) {
            return res.status(400).json({
              msg: "O resumo do evento deve ter entre 10 e 200 caracteres.",
            });
          }

          let modalidades;
          try {
            if (typeof modalidade_evento === "string") {
              modalidades = [modalidade_evento];
            } else if (Array.isArray(modalidade_evento)) {
              modalidades = modalidade_evento;
            } else {
              throw new Error();
            }

            if (modalidades.length === 0) {
              return res.status(400).json({
                msg: "Pelo menos uma modalidade do evento deve ser selecionada.",
              });
            }
          } catch {
            return res
              .status(400)
              .json({ msg: "Modalidade do evento deve ser um array válido." });
          }

          Object.assign(dadosBase, {
            data,
            localizacao: localizacao.trim(),
            valor,
            links,
            descricao_resumida: descricao_resumida.trim(),
            tp_evento,
            categoria_evento,
            modalidade_evento: JSON.stringify(modalidades),
          });

          break;
        }
        case "estabelecimento": {
          if (tp_post === "estabelecimento" && cep) {
            try {
              const { latitude, longitude } = await geolocalizarCep(cep);
              Object.assign(dadosBase, { latitude, longitude });
            } catch (err) {
              console.warn("Erro ao geolocalizar CEP:", err.message);
            }
          }

          if (!tipo_comercio) {
            return res.status(400).json({ msg: "Informe o tipo de comércio." });
          }

          const obrigatorios = {
            restaurante: [tp_comida, hora_abertura, hora_fechamento],
            feira: [tp_comida],
            loja: [tipo_produto],
            servico: [tipo_servico],
          };

          const campos = obrigatorios[tipo_comercio] || [];
          const faltando = campos.some((c) => !c || c === "");

          if (
            !titulo?.trim() ||
            !conteudo?.trim() ||
            !descricao_resumida?.trim() ||
            !cep?.trim() ||
            !endereco?.trim() ||
            faltando
          ) {
            return res.status(400).json({
              msg: "Preencha todos os campos obrigatórios conforme o tipo de comércio.",
            });
          }

          Object.assign(dadosBase, {
            tipo_comercio,
            tipo_produto,
            tipo_servico,
            tp_comida,
            hora_abertura,
            hora_fechamento,
            cep,
            endereco,
            descricao_comercio,
            descricao_resumida,
            nome_comercio: titulo,
          });

          break;
        }

        case "promocao": {
          if (!titulo || !conteudo || !data || !links || !descricao_resumida) {
            return res
              .status(400)
              .json({ msg: "Todos os campos da promoção são obrigatórios." });
          }
          if (
            descricao_resumida.length > 200 ||
            descricao_resumida.length < 10
          ) {
            return res.status(400).json({
              msg: "O resumo da promoção deve ter entre 10 e 200 caracteres.",
            });
          }
          Object.assign(dadosBase, {
            titulo: titulo.trim(),
            conteudo: conteudo.trim(),
            data,
            links,
            descricao_resumida: descricao_resumida.trim(),
          });
          break;
        }

        case "recado": {
          if (!conteudo || conteudo.trim().length < 5) {
            return res
              .status(400)
              .json({ msg: "O recado deve ter pelo menos 5 caracteres." });
          }
          Object.assign(dadosBase, {
            conteudo: conteudo.trim(),
          });
          break;
        }

        default:
          return res.status(400).json({ msg: "Tipo de postagem inválido." });
      }

      // 4. Criar postagem
      const novaPostagem = await Postagem.create(dadosBase);

      return res.status(201).json(novaPostagem);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: "❌ Erro ao criar postagem." });
    }
  },

  // Listar postagens de cada usuário no perfil
  async listarPostagensDoUsuario(req, res) {
    try {
      const { id_user } = req.params;

      const postagens = await Postagem.findAll({
        where: { usuario_id: id_user },
        order: [["createdAt", "DESC"]],
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

      if (!postagens.length) {
        return res.status(404).json({ mensagem: "Nenhuma postagem encontrada para este usuário." });
      }

      return res.status(200).json(postagens);
    } catch (error) {
      console.error("Erro ao buscar postagens do usuário:", error);
      return res.status(500).json({ erro: "Erro ao buscar postagens do usuário." });
    }
  },

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

  async deletarPerfil(req, res) {
    try {
      const { id } = req.params;

      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ msg: "❌ Usuário não encontrado." });
      }

      await Postagem.destroy({ where: { usuario_id: id } });
      await Usuario.destroy({ where: { id_user: id } });

      return res
        .status(200)
        .json({ msg: "📌 Usuário e postagens excluídos com sucesso." });
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      return res.status(500).json({ erro: "❌ Erro ao deletar usuário." });
    }
  },

  async deletarPostagem(req, res) {
    try {
      const { id } = req.params;

      const postagem = await Postagem.findByPk(id);
      if (!postagem) {
        return res.status(404).json({ msg: "❌ Postagem não encontrada." });
      }

      await Postagem.destroy({ where: { id } });

      return res.status(200).json({ msg: "📌 Postagem excluída com sucesso." });
    } catch (error) {
      console.error("Erro ao deletar postagem:", error);
      return res.status(500).json({ erro: "❌ Erro ao deletar postagem." });
    }
  },

  async buscarEstabelecimentos(req, res) {
    try {
      const { lat, lng } = req.query;

      const estabelecimentos = await Postagem.findAll({
        where: {
          tp_post: "estabelecimento",
          latitude: { [Op.not]: null },
          longitude: { [Op.not]: null },
        },
        attributes: [
          "id",
          "nome_comercio",
          "descricao_comercio",
          "latitude",
          "longitude",
          "tipo_comercio",
        ],
        order: [["createdAt", "DESC"]],
      });

      return res.status(200).json(estabelecimentos);
    } catch (error) {
      console.error("Erro ao buscar estabelecimentos:", error);
      return res.status(500).json({ erro: "Erro ao buscar estabelecimentos." });
    }
  },

  async atribuirSelo(req, res) {
    const { id } = req.params;
    const { id_user, tp_user } = req.user;
    const { descricao_teste, evidencias_urls, aprovado } = req.body;

    if (tp_user !== "Chef") {
      return res
        .status(403)
        .json({ msg: "Apenas chefs podem validar receitas." });
    }

    const receita = await Postagem.findByPk(id);
    if (!receita || receita.tp_post !== "receita") {
      return res.status(404).json({ msg: "Receita não encontrada." });
    }

    if (receita.selo_confianca) {
      return res
        .status(400)
        .json({ msg: "Essa receita já possui selo de confiança." });
    }

    if (
      !descricao_teste?.trim() ||
      !Array.isArray(evidencias_urls) ||
      typeof aprovado !== "boolean"
    ) {
      return res
        .status(400)
        .json({ msg: "Preencha todos os campos obrigatórios do formulário." });
    }

    if (!aprovado) {
      return res
        .status(200)
        .json({ msg: "Receita não aprovada. Nenhuma alteração feita." });
    }

    try {
      receita.selo_confianca = true;
      receita.descricao_teste = descricao_teste;
      receita.evidencias_urls = evidencias_urls;
      receita.aprovador_id = id_user;
      receita.verificado_por_id = id_user;
      await receita.save();

      return res
        .status(200)
        .json({ msg: "Selo de confiança atribuído com sucesso!" });
    } catch (error) {
      console.error("Erro ao atribuir selo:", error);
      return res
        .status(500)
        .json({ msg: "Erro interno ao atribuir selo de confiança." });
    }
  },


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
          attributes: [
            "id_user",
            "nome",
            "tp_user",
            "foto_perfil",
            "nickname",]
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

module.exports = PostagemController;
