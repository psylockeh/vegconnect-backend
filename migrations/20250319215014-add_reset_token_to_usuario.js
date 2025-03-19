module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("usuario", "reset_token", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn("usuario", "reset_token_expira", {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn("usuario", "reset_token");
    await queryInterface.removeColumn("usuario", "reset_token_expira");
  },
};
