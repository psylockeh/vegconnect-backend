"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Curtida extends Model {
    static associate(models) {
      Curtida.belongsTo(models.Usuario, {
        foreignKey: "usuario_id",
        targetKey: "id_user",
        as: "usuario",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      Curtida.belongsTo(models.Postagem, {
        foreignKey: "postagem_id",
        as: "postagens",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }

  Curtida.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      postagem_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tipo: {
        type: DataTypes.ENUM("like", "dislike"),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Curtida",
      tableName: "curtidas",
      timestamps: true,
    }
  );

  return Curtida;
};
