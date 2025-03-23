"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("usuario", "nickname", {
      type: Sequelize.STRING,
      allowNull: true, // permite nulo por enquanto
      unique: true,
    });

    await queryInterface.addColumn("usuario", "bio", {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("usuario", "nickname");
    await queryInterface.removeColumn("usuario", "bio");
  },
};
