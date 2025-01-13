const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('postagem', {
    id_post: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    titulo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    conteudo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    tp_post: {
      type: DataTypes.ENUM('Receita','Evento','Comercio'),
      allowNull: false
    },
    tp_tag: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    like_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    dislike_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    qtd_comentario: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
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
    tableName: 'postagem',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
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
