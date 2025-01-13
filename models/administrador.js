const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('administrador', {
    id_user_adm: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'usuario',
        key: 'id_user'
      }
    }
  }, {
    sequelize,
    tableName: 'administrador',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_user_adm" },
        ]
      },
    ]
  });
};
