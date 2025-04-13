const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");

router.post("/upload", upload.array("arquivos", 10), async (req, res) => {
  try {
    const urls = req.files.map((file) => file.path);
    return res.status(200).json({ urls });
  } catch (error) {
    console.error("Erro no upload:", error);
    return res.status(500).json({ erro: "Erro ao fazer upload." });
  }
});

module.exports = router;
