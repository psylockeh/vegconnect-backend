const express = require("express");
const {
  criarComentario,
  listarPorPostagem,
} = require("../controllers/comentarioController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, criarComentario);
router.get("/:postagemId", authMiddleware, listarPorPostagem);

module.exports = router;
