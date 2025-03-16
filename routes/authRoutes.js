const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

// rota publica
router.post("/signup", authController.signup);
router.post("/signin", authController.signin);

// rota privada
router.get("/perfil", authMiddleware, authController.getPerfil);

module.exports = router;
