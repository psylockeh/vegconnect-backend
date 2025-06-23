import express from "express";
import {
  criarComentario,
  listarPorPostagem,
} from "../controllers/comentarioController.js";
import { authMiddleware } from "../middleware/autenticar.js";

const router = express.Router();

router.post("/", authMiddleware, criarComentario);
router.get("/:postagemId", listarPorPostagem);

export default router;
