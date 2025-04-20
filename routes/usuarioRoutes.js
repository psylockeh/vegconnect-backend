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

// cria postagem
router.post("/postagens", authMiddleware, criar);

// busca postagens
router.get("/postagens", postagemController.listar);

// busca postagem por id
router.get("/postagens/:id", postagemController.detalhar);

//Pesquisa Geral(Perfil e Usuario)
router.get("/pesquisaGeral", postagemController.pesquisaGeral);

module.exports = router;
