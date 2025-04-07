"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("usuario_comerciante", {
      id_user_comerciante: {
        // PK específica da especialização
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_user: {
        // FK referente ao usuário pai
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "usuario",
          key: "id_user",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      tipo_prod: { type: Sequelize.STRING(255), allowNull: true },
      tipo_com: { type: Sequelize.STRING(255), allowNull: true },
      nome_com: { type: Sequelize.STRING(255), allowNull: true },
      ender_com: { type: Sequelize.STRING(255), allowNull: true },
      cnpj: { type: Sequelize.STRING(18), allowNull: true, unique: true },
      cep_com: { type: Sequelize.STRING(10), allowNull: true },
      tel_com: { type: Sequelize.STRING(20), allowNull: true },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        ),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("usuario_comerciante");
  },
};
