const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('estabelecimento', {
    id_user_estab: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'usuario',
        key: 'id_user'
      }
    },
    nome_com: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    ender_com: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    cep_com: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    tel_com: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    cnpj: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    tp_prod: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    tp_com: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'estabelecimento',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_user_estab" },
        ]
      },
    ]
  });
};
