module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Remover a coluna dt_cadastro
    await queryInterface.removeColumn('usuario', 'dt_cadastro');

    // Adicionar as colunas createdAt e updatedAt
    await queryInterface.addColumn('usuario', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    });

    await queryInterface.addColumn('usuario', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Reverter as mudanças (caso precise desfazer a migration)
    await queryInterface.addColumn('usuario', 'dt_cadastro', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });

    await queryInterface.removeColumn('usuario', 'createdAt');
    await queryInterface.removeColumn('usuario', 'updatedAt');
  }
};
