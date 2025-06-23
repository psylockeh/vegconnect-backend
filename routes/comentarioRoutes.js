import express from "express";
import {
  criarComentario,
  listarPorPostagem,
} from "../controllers/comentarioController.js";
import { autenticar } from "../middleware/autenticar.js";

const router = express.Router();

router.post("/", autenticar, criarComentario);
router.get("/:postagemId", listarPorPostagem);

export default router;
