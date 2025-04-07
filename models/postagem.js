"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Postagem extends Model {
    static associate(models) {
      Postagem.belongsTo(models.Usuario, {
        foreignKey: "usuario_id",
        targetKey: "id_user",
        as: "autor",
      });
    }
  }

  Postagem.init(
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
      tp_post: {
        type: DataTypes.ENUM(
          "receita",
          "recado",
          "evento",
          "estabelecimento",
          "promocao",
          "repost",
        ),
        allowNull: false,
      },
      titulo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      conteudo: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      categoria: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      selo_confiança: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      tag: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      qtd_comentario: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      like: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      dislike: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },

      // Campos específicos de RECEITA
      temp_prep: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      instrucoes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      ingredientes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      nome_receita: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      // Campos específicos de EVENTO
      data: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      localizacao: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      // Campos específicos de COMÉRCIO
      nome_comercio: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      descricao_comercio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      tp_comida: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      hora_abertura: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      hora_fechamento: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cep: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      endereco: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Postagem",
      tableName: "postagens",
      timestamps: true,
    },
  );

  return Postagem;
};
