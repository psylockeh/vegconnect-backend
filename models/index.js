const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);

const env = process.env.NODE_ENV || "development";
if (env !== "test") {
  require("dotenv").config();
}

const config = require(__dirname + "/../config/config.js")[env];

console.log("🌱 Ambiente:", env);
console.log("🎯 Usando config:", config.database, config.host);

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
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
