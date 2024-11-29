import { DataTypes, STRING } from "sequelize";
import sequelize from "../db/coneccion.js";

const Usuario = sequelize.define(
  "usuario",
  {
    idUsuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombreCompleto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fechaNacimiento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: "usuarios",
    timestamps: false,
  }
);

export default Usuario;
