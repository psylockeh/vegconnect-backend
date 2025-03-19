const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// 🔹 Rota para buscar perfil do usuário autenticado
router.get("/perfil", authMiddleware, async (req, res) => {
  try {
    // Buscar usuário no banco...
    res.json({ msg: "Perfil do usuário", user: req.user });
  } catch (error) {
    res.status(400).json({ msg: "Erro ao buscar perfil." });
  }
});

module.exports = router;
