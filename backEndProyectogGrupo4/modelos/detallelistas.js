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
    nombreProducto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precioProducto: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    comparacionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nombreComparacion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precioComparacion: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    tableName: "detallelistas",
    timestamps: false,
  }
);

export default DetalleLista