const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usuario', {
    id_user: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "email"
    },
    senha: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    foto_perfil: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    tp_user: {
      type: DataTypes.ENUM('Chef','Estabelecimento','Administrador','UsuarioComum'),
      allowNull: false
    },
    pref_alim: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    dt_nasc: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    dt_cadastro: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'usuario',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_user" },
        ]
      },
      {
        name: "email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
    ]
  });
};
