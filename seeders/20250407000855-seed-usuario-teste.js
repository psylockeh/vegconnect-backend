"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("usuario", [
      {
        id_user: 1,
        nome: "Usuário Teste",
        email: "teste@vegconnect.com",
        senha: "$2b$10$3yp2JwATLbC8KmtP1v6PX.eyqqTEKrh.b1oDPWl.3PSP0fWxEcqpm",
        tp_user: "Comum",
        data_nascimento: "1990-08-12",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(
      "usuario",
      { email: "teste@vegconnect.com" },
      {}
    );
  },
};
