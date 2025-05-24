module.exports = (sequelize, DataTypes) => {
  const Favorito = sequelize.define(
    "Favorito",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      usuario_id: { type: DataTypes.INTEGER, allowNull: false },
      postagem_id: { type: DataTypes.INTEGER, allowNull: false },
      lista_id: { type: DataTypes.INTEGER, allowNull: true },
    },
    {
      tableName: "favoritos",
      timestamps: true,
    }
  );

  Favorito.associate = (models) => {
    Favorito.belongsTo(models.Usuario, {
      foreignKey: "usuario_id",
      targetKey: "id_user",
      as: "usuario", 
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Favorito.belongsTo(models.Postagem, {
      foreignKey: "postagem_id",
      as: "postagem", 
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Favorito.belongsTo(models.ListaFavorito, {
      foreignKey: "lista_id",
      as: "lista",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Favorito;
};
