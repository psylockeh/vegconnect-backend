"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("postagens", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
      tipo: {
        type: Sequelize.ENUM(
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
      selo_confiança: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
