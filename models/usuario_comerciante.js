// models/usuario_comerciante.js
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UsuarioComerciante extends Model {
    static associate(models) {
      UsuarioComerciante.belongsTo(models.Usuario, {
        foreignKey: "id_user_estab",
      });
    }
  }

  UsuarioComerciante.init(
    {
      id_user_estab: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "usuario",
          key: "id_user",
        },
        onDelete: "CASCADE",
      },
      tipo_produto: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tipo_comercio: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nome_comercio: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      endereco_comercio: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cnpj: {
        type: DataTypes.STRING(18),
        allowNull: false,
        unique: true,
      },
      cep_comercio: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      telefone_comercio: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "UsuarioComerciante",
      tableName: "usuario_comerciante",
    },
  );

  return UsuarioComerciante;
};
