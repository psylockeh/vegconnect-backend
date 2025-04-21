const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log("📡 Authorization Header:", authHeader);

  if (!authHeader) {
    console.warn("❌ Token ausente.");
    return res.status(403).json({ msg: "Token ausente." });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    console.warn("⚠️ Token mal formatado.");
    return res.status(403).json({ msg: "Token ausente ou mal formatado." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("🔑 Token decodificado com sucesso:", decoded);
    console.log("🧾 Payload do token:", decoded);
    console.log("🧾 ID do usuário:", decoded.id_user);

    req.user = {
      id_user: decoded.id_user || decoded.id,
      email: decoded.email,
      tp_user: decoded.tp_user,
    };

    next();
  } catch (error) {
    console.error("🚫 Erro ao verificar token:", error.message);
    return res.status(401).json({ msg: "Token inválido ou expirado." });
  }
};

module.exports = authMiddleware;
