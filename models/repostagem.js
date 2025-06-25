"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Repostagem extends Model {
    static associate(models) {
      Repostagem.belongsTo(models.Postagem, {
        foreignKey: "postagem_id",
        as: "postagem",
      });

      Repostagem.belongsTo(models.Usuario, {
        foreignKey: "usuario_id",
        as: "usuario",
      });
    }
  }

  Repostagem.init(
    {
      repost_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      repost_de: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      postagem_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Repostagem",
      tableName: "repostagens",
      timestamps: true,
    }
  );

  return Repostagem;
};
