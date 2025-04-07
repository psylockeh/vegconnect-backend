"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.addColumn("postagens", "tp_post", {
        type: Sequelize.ENUM(
          "receita",
          "recado",
          "evento",
          "estabelecimento",
          "promocao",
          "repost",
        ),
        allowNull: false,
      }),
      queryInterface.addColumn("postagens", "tag", { type: Sequelize.STRING }),
      queryInterface.addColumn("postagens", "qtd_comentario", {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      }),
      queryInterface.addColumn("postagens", "like", {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      }),
      queryInterface.addColumn("postagens", "dislike", {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      }),

      // RECEITA
      queryInterface.addColumn("postagens", "temp_prep", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("postagens", "instrucoes", {
        type: Sequelize.TEXT,
      }),
      queryInterface.addColumn("postagens", "ingredientes", {
        type: Sequelize.TEXT,
      }),
      queryInterface.addColumn("postagens", "nome_receita", {
        type: Sequelize.STRING,
      }),

      // EVENTO
      queryInterface.addColumn("postagens", "data", { type: Sequelize.DATE }),
      queryInterface.addColumn("postagens", "localizacao", {
        type: Sequelize.STRING,
      }),

      // COMÉRCIO
      queryInterface.addColumn("postagens", "nome_comercio", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("postagens", "descricao_comercio", {
        type: Sequelize.TEXT,
      }),
      queryInterface.addColumn("postagens", "tp_comida", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("postagens", "hora_abertura", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("postagens", "hora_fechamento", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("postagens", "cep", { type: Sequelize.STRING }),
      queryInterface.addColumn("postagens", "endereco", {
        type: Sequelize.STRING,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.removeColumn("postagens", "tp_post"),
      queryInterface.removeColumn("postagens", "tag"),
      queryInterface.removeColumn("postagens", "qtd_comentario"),
      queryInterface.removeColumn("postagens", "like"),
      queryInterface.removeColumn("postagens", "dislike"),

      queryInterface.removeColumn("postagens", "temp_prep"),
      queryInterface.removeColumn("postagens", "instrucoes"),
      queryInterface.removeColumn("postagens", "ingredientes"),
      queryInterface.removeColumn("postagens", "nome_receita"),

      queryInterface.removeColumn("postagens", "data"),
      queryInterface.removeColumn("postagens", "localizacao"),

      queryInterface.removeColumn("postagens", "nome_comercio"),
      queryInterface.removeColumn("postagens", "descricao_comercio"),
      queryInterface.removeColumn("postagens", "tp_comida"),
      queryInterface.removeColumn("postagens", "hora_abertura"),
      queryInterface.removeColumn("postagens", "hora_fechamento"),
      queryInterface.removeColumn("postagens", "cep"),
      queryInterface.removeColumn("postagens", "endereco"),
    ]);
  },
};
