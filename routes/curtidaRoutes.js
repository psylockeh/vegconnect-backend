const express = require("express");
const {
  curtirPostagem,
  removerCurtida,
  verificarCurtida,
} = require("../controllers/curtidaController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/:postagemId", authMiddleware, curtirPostagem);
router.delete("/:postagemId", authMiddleware, removerCurtida);
router.get("/:postagemId", authMiddleware, verificarCurtida);

module.exports = router;
