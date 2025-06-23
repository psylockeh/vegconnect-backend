import { DataTypes } from "sequelize";
import { sequelize } from "../config/conexao";

export const Comentario = sequelize.define(
  "Comentario",
  {
    id_comentario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    postagem_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    conteudo: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "comentarios",
    timestamps: true,
  }
);
