"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("favoritos", {
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
      postagem_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "postagens",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      lista_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "listas_favoritos",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL", 
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("favoritos");
  },
};
