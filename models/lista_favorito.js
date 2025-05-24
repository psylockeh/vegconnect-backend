module.exports = (sequelize, DataTypes) => {
  const ListaFavorito = sequelize.define(
    "ListaFavorito",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      nome: { type: DataTypes.STRING, allowNull: false },
      usuario_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      tableName: "listas_favoritos",
      timestamps: true,
    }
  );

  ListaFavorito.associate = (models) => {
    ListaFavorito.belongsTo(models.Usuario, {
      foreignKey: "usuario_id",
      targetKey: "id_user",
      as: "usuario", 
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    ListaFavorito.hasMany(models.Favorito, {
      foreignKey: "lista_id",
      as: "favoritos", 
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return ListaFavorito;
};
