const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      connectTimeout: 60000,
    },
  }
);

sequelize
  .authenticate()
  .then(() => console.log("✅ Banco conectado com sucesso!"))
  .catch((err) => console.error("❌ Erro ao conectar com o banco:", err));

module.exports = sequelize;

const db = {};

const Usuario = require("./usuario")(sequelize, Sequelize.DataTypes);
db.Usuario = Usuario;

// Adicionar automaticamente os outros models no diretório
fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

// Associar os modelos se existir uma função associate
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Exporta sequelize e Sequelize
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
