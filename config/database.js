const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  port: process.env.DB_PORT || 28147,
  logging: false, 
});

sequelize.authenticate()
  .then(() => console.log("✅ Banco de dados conectado!"))
  .catch(err => console.error("❌ Erro ao conectar ao banco:", err));

module.exports = sequelize;
