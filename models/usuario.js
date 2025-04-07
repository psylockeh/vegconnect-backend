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
      telefone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bio: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      foto_perfil: {
        type: DataTypes.STRING,
        allowNull: true,
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
      //comum
      pref_alim: {
        type: DataTypes.ENUM("Vegano", "Vegetariano", "Dieta restritiva"),
        allowNull: false,
      },
      reset_token: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      reset_token_expira: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      //comerciante
      tipo_prod: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tipo_com: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      nome_com: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ender_com: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cnpj: {
        type: DataTypes.STRING(18),
        allowNull: true,
      },
      cep_com: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      tel_com: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },

      //chef
      especialidade: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      certificacoes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      // admin
      cargo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      matricula: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Usuario",
      tableName: "usuario",
    },
  );

  return Usuario;
};
