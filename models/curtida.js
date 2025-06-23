const express = require("express");
const router = express.Router();
const CurtidaController = require("../controllers/curtidaController");
const autenticar = require("../middlewares/autenticar");

router.post("/", autenticar, CurtidaController.curtir);
router.delete("/:postagem_id", autenticar, CurtidaController.removerCurtir);
router.get("/:postagem_id", CurtidaController.contarCurtidas);

module.exports = router;
