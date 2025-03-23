const express = require("express");
const { atualizarPerfil } = require("../controllers/usuarioController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// atualiza perfil do usuário
router.put("/perfil", authMiddleware, atualizarPerfil);

// busca perfil do usuário
router.get("/perfil", authMiddleware, async (req, res) => {
  try {
    res.json({ msg: "Perfil do usuário", user: req.user });
  } catch (error) {
    res.status(400).json({ msg: "Erro ao buscar perfil." });
  }
});

module.exports = router;
