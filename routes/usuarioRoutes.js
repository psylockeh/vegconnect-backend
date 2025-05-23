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

//Pesquisa Geral(Perfil e Usuario)
router.get("/pesquisaGeral", postagemController.pesquisaGeral);

//Deletar Perfil
router.delete("/deletarPerfil/:id", postagemController.deletarPerfil);

//Deletar Postagem
router.delete("/deletarPostagem/:id", postagemController.deletarPostagem);

router.get("/estabelecimentos", postagemController.buscarEstabelecimentos);

router.post("/receitas/:id/selo-confianca", authMiddleware, postagemController.atribuirSelo);

// Favoritar postagem
router.post("/favoritos", postagemController.favoritar);

// Desfavoritar postagem
router.delete("/favoritos", postagemController.desfavoritar);

//Listar as postagem 
router.get("/favoritos", postagemController.listarFavoritos);

//Criar lista de favorito
router.post("/favoritos/lista", postagemController.criarListaFavoritos);

//Listar as listas criadas
router.get("/favoritos/listas", postagemController.listarListasFavoritos);

module.exports = router;
