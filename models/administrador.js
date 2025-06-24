const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Administrador extends Model {
    static associate(models) {
      Administrador.belongsTo(models.Usuario, { foreignKey: "id_user_adm" });
    }
  }

  Administrador.init(
    {
      id_user_adm: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "usuario",
          key: "id_user",
        },
        onDelete: "CASCADE",
      },
      cargo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      matricula: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Administrador",
      tableName: "administrador",
    }
  );

  return Administrador;
};
