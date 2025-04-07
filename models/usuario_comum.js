// models/usuario_comum.js
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UsuarioComum extends Model {
    static associate(models) {
      UsuarioComum.belongsTo(models.Usuario, { foreignKey: "id_comum" });
    }
  }

  UsuarioComum.init(
    {
      id_comum: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "usuario",
          key: "id_user",
        },
        onDelete: "CASCADE",
      },
      pref_alimnt: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "UsuarioComum",
      tableName: "usuario_comum",
    },
  );

  return UsuarioComum;
};
