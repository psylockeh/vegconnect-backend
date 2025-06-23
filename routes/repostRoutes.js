const express = require("express");
const router = express.Router();
const RepostController = require("../controllers/repostController");
const autenticar = require("../middlewares/autenticar");

router.post("/", autenticar, RepostController.criarRepost);

module.exports = router;
