const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('evento', {
    id_post_evento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'postagem',
        key: 'id_post'
      }
    },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    localizacao: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    data: {
      type: DataTypes.DATE,
      allowNull: true
    },
    avaliacao: {
      type: DataTypes.DECIMAL(3,2),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'evento',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_post_evento" },
        ]
      },
    ]
  });
};
