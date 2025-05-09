'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Adicionando a coluna tipo_serviço à tabela postagens
    await queryInterface.addColumn('postagens', 'tipo_serviço', {
      type: Sequelize.STRING,  // Tipo da coluna
      allowNull: true,         // Definindo como permitido ser nulo
    });
  },

  async down (queryInterface, Sequelize) {
    // Revertendo a adição da coluna tipo_serviço, removendo-a
    await queryInterface.removeColumn('postagens', 'tipo_serviço');
  }
};