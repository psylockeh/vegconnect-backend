"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class AvaliacaoPostagem extends Model {
    static associate(models) {
      // Relacionamento com o usuário
      AvaliacaoPostagem.belongsTo(models.Usuario, {
        foreignKey: "usuario_id",
        as: "usuario",
      });

      // Relacionamento com a postagem
      AvaliacaoPostagem.belongsTo(models.Postagem, {
        foreignKey: "postagem_id",
        as: "postagem",
      });
    }
  }

  AvaliacaoPostagem.init(
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
      estrelas: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      comentario_positivo: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      comentario_negativo: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "AvaliacaoPostagem",
      tableName: "avaliacoes_postagem",
      timestamps: true,
    }
  );

  return AvaliacaoPostagem;
};
