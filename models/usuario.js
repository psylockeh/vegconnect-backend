const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
  id_user: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  senha: { type: DataTypes.STRING, allowNull: false },
  tp_user: { type: DataTypes.STRING, allowNull: false },
  pref_alim: { type: DataTypes.STRING, allowNull: false },
  dt_nasc: { type: DataTypes.DATE, allowNull: false }
}, {
  tableName: 'usuario',  
  freezeTableName: true,
  timestamps: true,
});

module.exports = Usuario;
