"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Comentario extends Model {
    static associate(models) {
      Comentario.belongsTo(models.Usuario, {
        foreignKey: "usuario_id",
        targetKey: "id_user",
        as: "usuario",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      Comentario.belongsTo(models.Postagem, {
        foreignKey: "postagem_id",
        as: "postagem",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }

  Comentario.init(
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
      conteudo: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Comentario",
      tableName: "comentarios",
      timestamps: true,
    }
  );

  return Comentario;
};
