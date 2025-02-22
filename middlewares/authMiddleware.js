const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || "chave_super_secreta";

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ erro: "Acesso negado! Token não fornecido." });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.userId = decoded.id;
    req.userEmail = decoded.email;
    next();
  } catch (error) {
    res.status(401).json({ erro: "Token inválido!" });
  }
};
