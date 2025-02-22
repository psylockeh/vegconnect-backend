const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('comerciante', {
    id_post_comerc: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'postagem',
        key: 'id_post'
      }
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    endereco: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    cep: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    tp_comida: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    hora_func: {
      type: DataTypes.TIME,
      allowNull: true
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    avaliacao: {
      type: DataTypes.DECIMAL(3,2),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'comerciante',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_post_comerc" },
        ]
      },
    ]
  });
};
