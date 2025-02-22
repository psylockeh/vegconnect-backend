const express = require('express');
const cors = require('cors');
const sequelize = require('../config/database');
require('../models/usuario');

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors());

// Rotas
app.use('/auth', require('../routes/auth'));


app.get('/', (req, res) => {
    res.send('Hello, VegConnect!');
});

// Inicia o servidor
sequelize.authenticate()
  .then(() => {
    console.log('✅ Conexão com o banco de dados estabelecida.');
    console.log("🚀 Rotas Registradas:");
console.log(app._router.stack.filter(r => r.route).map(r => r.route.path));

    app.listen(port, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${port}`);
    });
  })
  .catch((error) => console.error('❌ Erro ao conectar ao banco de dados:', error));
