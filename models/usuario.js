
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 
    const User = sequelize.define('Usuario', {
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
      foto_perfil: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tp_user: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pref_alim: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dt_nasc: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dt_cadastro: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      }
    }, {
      tableName: 'usuario', 
      freezeTableName: true,
      timestamps: false,  
    });
  
    module.exports = Usuario;
  
  