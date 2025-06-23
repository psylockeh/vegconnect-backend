const express = require("express");
const router = express.Router();
const RepostController = require("../controllers/repostController");
const authMiddleware = require("../middlewares/autenticar");

router.post("/", authMiddleware, RepostController.criarRepost);

module.exports = router;
