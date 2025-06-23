const express = require("express");
const router = express.Router();
const RepostController = require("../controllers/repostController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post(
  "/postagens/:postagemId/repostar",
  authMiddleware,
  RepostController.criarRepost
);

module.exports = router;
