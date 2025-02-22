const express = require('express');
const { signup, signin } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);

router.post('/signin', signin);

router.get('/test', (req, res) => {
    res.json({ mensagem: "Rota /auth/test funcionando!" });
  });

  
module.exports = router;
