'use strict';

require('dotenv').config();

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize'); 
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  dialect: 'mysql',
};

const db = {};

let sequelize; 
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && 
      file !== basename && 
      file.slice(-3) === '.js' 
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model; 
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

sequelize
  .sync({ alter: false, force: false }) 
  .then(() => {
    console.log('Tabelas sincronizadas com sucesso!');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar tabelas:', error);
  });

db.sequelize = sequelize; 
db.Sequelize = Sequelize; 

module.exports = db; 
