"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("usuario", {
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      senha: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      telefone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      data_nascimento: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      tp_user: {
        type: Sequelize.ENUM("Administrador", "Comerciante", "Comum", "Chef"),
        allowNull: false,
      },

      // Comum
      pref_alim: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      // Comerciante
      tipo_prod: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      tipo_com: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nome_com: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ender_com: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cnpj: {
        type: Sequelize.STRING(18),
        allowNull: true,
      },
      cep_com: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      tel_com: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },

      // Chef
      especialidade: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      certificacoes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      // Administrador
      cargo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      matricula: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },

      // Metadata
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        ),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("usuario");
  },
};
