"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Favorito extends Model {
    static associate(models) {
      Favorito.belongsTo(models.Usuario, {
        foreignKey: "usuario_id",
        targetKey: "id_user",
        as: "autor",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      Favorito.belongsTo(models.Postagem, {
        foreignKey: "postagem_id",
        as: "postagem",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      Favorito.belongsTo(models.ListaFavorito, {
        foreignKey: "lista_id",
        as: "lista",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }

  Favorito.init(
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
      lista_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Favorito",
      tableName: "favoritos",
      timestamps: true,
    }
  );

  return Favorito;
};
