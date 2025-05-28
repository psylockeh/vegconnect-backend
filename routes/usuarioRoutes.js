const express = require("express");
const { atualizarPerfil } = require("../controllers/usuarioController");
const authMiddleware = require("../middlewares/authMiddleware");
const { getPerfil } = require("../controllers/usuarioController");
const { criar } = require("../controllers/postagemController");
const postagemController = require("../controllers/postagemController");

const router = express.Router();

router.use(authMiddleware);

// atualiza perfil do usuário
router.put("/perfil", authMiddleware, atualizarPerfil);

// busca perfil do usuário
router.get("/perfil", authMiddleware, getPerfil);

router.get("/perfil/:id_user", authMiddleware, getPerfil);

// cria postagem
router.post("/postagens", authMiddleware, criar);

// busca postagens
router.get("/postagens", postagemController.listar);

// busca postagem por id
router.get("/postagens/:id", postagemController.detalhar);

// Listar postagens de cada usuário no perfil
router.get("/:id_user/postagens", postagemController.listarPostagensDoUsuario);

//Pesquisa Geral(Perfil e Usuario)
router.get("/pesquisaGeral", postagemController.pesquisaGeral);

//Deletar Perfil
router.delete("/deletarPerfil/:id", postagemController.deletarPerfil);

//Deletar Postagem
router.delete("/deletarPostagem/:id", postagemController.deletarPostagem);

router.get("/estabelecimentos", postagemController.buscarEstabelecimentos);

router.post(
  "/receitas/:id/selo-confianca",
  authMiddleware,
  postagemController.atribuirSelo
);

// Favoritar postagem
router.post("/listas/:lista_id/postagens/:postagem_id",  postagemController.favoritar);

// Desfavoritar postagem
router.delete("/listas/:lista_id/postagens/:postagem_id", postagemController.desfavoritar);

//Listar as postagens dentro de uma lista específica
router.get("/listas/:lista_id", postagemController.listarFavoritosDaLista);

//Criar lista de favorito
router.post("/listas", postagemController.criarListaFavoritos);

//Listar as listas criadas
router.get("/listas", postagemController.listarListasFavoritos);

//Editar o nome da lista
router.put("/listas/:lista_id", postagemController.editarListaFavoritos);

//Excluir lista de favorito e conteúdo
router.delete("/listas/:lista_id", postagemController.excluirListaFavoritos);

module.exports = router;
