const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('receita', {
    id_post_receita: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'postagem',
        key: 'id_post'
      }
    },
    categoria: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    ingredientes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    instrucoes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    tempo_prep: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    avaliacao: {
      type: DataTypes.DECIMAL(3,2),
      allowNull: true
    },
    selo_confianca: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'receita',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_post_receita" },
        ]
      },
    ]
  });
};
