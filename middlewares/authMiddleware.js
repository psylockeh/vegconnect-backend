const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(403).json({ msg: "Token ausente." });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(403).json({ msg: "Token ausente ou mal formatado." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id_user: decoded.id_user || decoded.id };
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Token inválido." });
  }
};

module.exports = authMiddleware;
