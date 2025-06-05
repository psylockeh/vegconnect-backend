'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('avaliacoes_postagem', {
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
          model: 'usuario', // Ajuste se o nome da tabela for diferente
          key: 'id_user',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      postagem_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'postagens',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      estrelas: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      comentario_positivo: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      comentario_negativo: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('avaliacoes_postagem');
  },
};
