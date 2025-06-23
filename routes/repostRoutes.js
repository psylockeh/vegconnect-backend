const express = require("express");
const {
  criarRepost,
  listarRepostsPorUsuario,
} = require("../controllers/repostController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/:postagemId", authMiddleware, criarRepost);
router.get("/usuario/:usuarioId", listarRepostsPorUsuario);

module.exports = router;
