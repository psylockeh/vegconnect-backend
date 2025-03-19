const jwt = require("jsonwebtoken");

exports.validarTokenRecuperacao = (req, res, next) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: "Token não fornecido." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.email = decoded.email;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido ou expirado." });
  }
};
