const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('comentarios', {
    id_comentario: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    conteudo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    dt_coment: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    id_post: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'postagem',
        key: 'id_post'
      }
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuario',
        key: 'id_user'
      }
    }
  }, {
    sequelize,
    tableName: 'comentarios',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_comentario" },
        ]
      },
      {
        name: "id_post",
        using: "BTREE",
        fields: [
          { name: "id_post" },
        ]
      },
      {
        name: "id_user",
        using: "BTREE",
        fields: [
          { name: "id_user" },
        ]
      },
    ]
  });
};
