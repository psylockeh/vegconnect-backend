"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("postagens", [
      {
        usuario_id: 1, // tem que existir na tabela usuario
        tp_post: "receita",
        titulo: "Brownie Vegano",
        conteudo:
          "Essa receita é deliciosa e sem ingredientes de origem animal.",
        categoria: "doces",
        selo_confianca: false,
        tag: "vegano, sobremesa",
        temp_prep: "30 minutos",
        instrucoes: "Misture tudo e leve ao forno",
        ingredientes: "banana, aveia, cacau",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("postagens", null, {});
  },
};
