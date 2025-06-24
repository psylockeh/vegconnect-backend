const express = require("express");
const { atualizarPerfil } = require("../controllers/usuarioController");
const authMiddleware = require("../middlewares/authMiddleware");
const { getPerfil } = require("../controllers/usuarioController");
const { deletarPerfil } = require("../controllers/usuarioController");
const { criar } = require("../controllers/postagemController");
const postagemController = require("../controllers/postagemController");
const favoritoController = require("../controllers/favoritoController");
const avaliacaoController = require("../controllers/avaliacaoController");
const pesquisaController = require("../controllers/pesquisaController");

const router = express.Router();

router.use(authMiddleware);

// atualiza perfil do usuário
router.put("/perfil", authMiddleware, atualizarPerfil);

// busca perfil do usuário
router.get("/perfil", authMiddleware, getPerfil);

router.get("/perfil/:id_user", authMiddleware, getPerfil);

// cria postagem
router.post("/postagens", authMiddleware, criar);

//Deletar Perfil
router.delete("/deletarPerfil/:id", authMiddleware, deletarPerfil);

// busca postagens
router.get("/postagens", postagemController.listar);

// busca postagem por id
router.get("/postagens/:id", postagemController.detalhar);

// Listar postagens de cada usuário no perfil
router.get("/:id_user/postagens", postagemController.listarPostagensDoUsuario);

//Atualizar Postagens
router.put("/atualizarpostagem/:id", postagemController.atualizarPostagem);

//Deletar Postagem
router.delete("/deletarPostagem/:id", postagemController.deletarPostagem);

router.get("/estabelecimentos", postagemController.buscarEstabelecimentos);

router.post(
  "/receitas/:id/selo-confianca",
  authMiddleware,
  postagemController.atribuirSelo
);

// Curtir Postagem
router.post("/curtir", postagemController.curtir);

// ComentarioController
router.post(
  "/postagens/:id/repostar",
  authMiddleware,
  postagemController.repostarPostagem
);

// Repostar Postagem
router.post(
  "/postagens/:postagem_id/curtir",
  postagemController.curtirPostagem
);
router.delete(
  "/postagens/:postagem_id/curtir",
  postagemController.descurtirPostagem
);

//PesquisaController
router.get("/pesquisaGeral", pesquisaController.pesquisaGeral);

// FavoritOController
router.post(
  "/listas/:lista_id/postagens/:postagem_id",
  favoritoController.favoritar
);
router.delete(
  "/listas/:lista_id/postagens/:postagem_id",
  favoritoController.desfavoritar
);
router.get("/listas/:lista_id", favoritoController.listarFavoritosDaLista);
router.post("/listas", favoritoController.criarListaFavoritos);
router.get("/listas", favoritoController.listarListasFavoritos);
router.put("/listas/:lista_id", favoritoController.editarListaFavoritos);
router.delete("/listas/:lista_id", favoritoController.excluirListaFavoritos);
router.get(
  "/listas/status/:postagem_id",
  authMiddleware,
  favoritoController.statusFavorito
);

//AvaliaçãoController
router.post("/avaliar", avaliacaoController.avaliar);
router.get(
  "/avaliacao/:postagem_id",
  authMiddleware,
  avaliacaoController.statusAvaliacao
);
router.get(
  "/listaravaliacoes/:postagem_id",
  avaliacaoController.listarAvaliacoes
);
router.get(
  "/avaliacao/media/:postagem_id",
  avaliacaoController.mediaAvaliacoes
);

module.exports = router;
