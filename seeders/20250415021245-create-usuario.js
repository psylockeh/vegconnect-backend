"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("usuario", [
      {
        id_user: 1,
        nome: "Kamala da Silva",
        email: "kamala@email.com",
        senha: "$2b$10$3OJPqWTeOykzmThxj1IvAOsnTfUxz7IFEDH8ny3TjIFOW3eA7nMiG", // '123456' criptografado com bcrypt
        tp_user: "Comum",
        pref_alim: "vegano",
        data_nascimento: "2000-01-01",
        nickname: "kamala",
        telefone: "11999999999",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("usuario", null, {});
  },
};
