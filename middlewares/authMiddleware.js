const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(403).json({ erro: 'Acesso negado! Token não fornecido.' });
    }

    const token = authHeader.split(' ')[1]; 

    if (!token) {
        return res.status(403).json({ erro: 'Token inválido ou ausente.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ erro: 'Token inválido!' });
        }
        req.user = decoded;
        next();
    });
};
