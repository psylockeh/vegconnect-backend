"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("postagens", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "usuario",
          key: "id_user",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      tp_post: {
        type: Sequelize.ENUM(
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
        type: Sequelize.STRING,
        allowNull: true,
      },
      conteudo: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      categoria: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      selo_confianca: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      tag: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      qtd_comentario: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      like: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      dislike: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      // Campos de receita
      temp_prep: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      instrucoes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      ingredientes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      nome_receita: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      // Campos de evento
      data: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      localizacao: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      valor: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      links: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      // Campos de estabelecimento
      nome_comercio: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      descricao_comercio: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      tp_comida: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      hora_abertura: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      hora_fechamento: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cep: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      endereco: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("postagens");
  },
};
