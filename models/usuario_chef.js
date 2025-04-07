// models/usuario_chef.js
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UsuarioChef extends Model {
    static associate(models) {
      UsuarioChef.belongsTo(models.Usuario, { foreignKey: "id_user_chef" });
    }
  }

  UsuarioChef.init(
    {
      id_user_chef: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "usuario",
          key: "id_user",
        },
        onDelete: "CASCADE",
      },
      especialidade: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      certificacoes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "UsuarioChef",
      tableName: "usuario_chef",
    },
  );

  return UsuarioChef;
};
