import { Comentario } from "../models/comentario.js";

const criarComentario = async (req, res) => {
  const { texto, postagem_id } = req.body;
  const usuario_id = req.usuario.id_user;

  if (!texto || !postagem_id) {
    return res
      .status(400)
      .json({ msg: "Campos obrigatórios não preenchidos." });
  }

  try {
    const novoComentario = await Comentario.create({
      texto,
      postagem_id,
      usuario_id,
    });
    return res.status(201).json(novoComentario);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Erro ao criar comentário." });
  }
};

const listarPorPostagem = async (req, res) => {
  try {
    const comentarios = await Comentario.findAll({
      where: { postagem_id: req.params.postagemId },
      order: [["createdAt", "DESC"]],
    });
    return res.status(200).json(comentarios);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Erro ao listar comentários." });
  }
};

export default {
  criarComentario,
  listarPorPostagem,
};
