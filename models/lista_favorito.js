"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class ListaFavorito extends Model {
    static associate(models) {
      ListaFavorito.belongsTo(models.Usuario, {
        foreignKey: "usuario_id",
        targetKey: "id_user",
        as: "autor",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      ListaFavorito.hasMany(models.Favorito, {
        foreignKey: "lista_id",
        as: "favoritos",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }

  ListaFavorito.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ListaFavorito",
      tableName: "listas_favoritos",
      timestamps: true,
    }
  );

  return ListaFavorito;
};
