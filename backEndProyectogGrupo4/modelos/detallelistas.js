import { DataTypes } from "sequelize";
import sequelize from "../db/coneccion.js";


const DetalleLista = sequelize.define(
  "detallelistas",
  {
    idDetalle: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    idLista: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    origen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "detallelistas",
    timestamps: false,
  }
);

export default DetalleLista