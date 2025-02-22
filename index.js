require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database'); 
require('./models/usuario'); 

const app = express();
const port = process.env.PORT || 28147;

// Middleware
app.use(express.json());
app.use(cors());
app.use('/auth', require('./routes/auth'));

// Rota de Teste
app.get('/', (req, res) => {
    res.send('Hello, VegConnect!');
});

// Conectar ao banco e iniciar o servidor
sequelize.authenticate()
  .then(() => {
    console.log('✅ Conexão com o banco de dados estabelecida.');
    app.listen(port, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${port}`);
    });
  })
  .catch((error) => console.error('❌ Erro ao conectar ao banco de dados:', error));
