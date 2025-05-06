"use strict";

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Postagem extends Model {
    static associate(models) {
      Postagem.belongsTo(models.Usuario, {
        foreignKey: "usuario_id",
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
          "repost"
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
      midia_urls: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          const rawValue = this.getDataValue("midia_urls");
          return rawValue ? JSON.parse(rawValue) : [];
        },
        set(value) {
          this.setDataValue("midia_urls", JSON.stringify(value));
        },
      },
      categoria: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      descricao_resumida: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      selo_confianca: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
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
        type: DataTypes.JSON,
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
      calorias: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dificuldade: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      rendimento_quantidade: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tipo_rendimento: {
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
      valor: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      links: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      tp_evento: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      categoria_evento: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      modalidade_evento: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          const raw = this.getDataValue("modalidade_evento");
          return raw ? JSON.parse(raw) : [];
        },
        set(value) {
          this.setDataValue("modalidade_evento", JSON.stringify(value));
        },
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
      tipo_comercio: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tipo_produto: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tipo_serviço: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Postagem",
      tableName: "postagens",
      timestamps: true,
    }
  );

  return Postagem;
};
