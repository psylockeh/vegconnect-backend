// models/usuario.js
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      Usuario.hasOne(models.UsuarioChef, { foreignKey: "id_user_chef" });
      Usuario.hasOne(models.UsuarioComerciante, {
        foreignKey: "id_user_comerciante",
      });
      Usuario.hasOne(models.Administrador, { foreignKey: "id_user_adm" });
      Usuario.hasOne(models.UsuarioComum, { foreignKey: "id_comum" });
    }
  }

  Usuario.init(
    {
      id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      senha: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      data_nascimento: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      tp_user: {
        type: DataTypes.ENUM("Chef", "Administrador", "Comerciante", "Comum"),
        allowNull: false,
      },
      pref_alim: {
        type: DataTypes.ENUM("Vegano", "Vegetariano", "Restritivo"),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Usuario",
      tableName: "usuario",
    }
  );

  return Usuario;
};
