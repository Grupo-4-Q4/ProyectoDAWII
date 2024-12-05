import { DataTypes } from "sequelize";
import sequelize from "../db/coneccion.js";


const Producto_Walmart = sequelize.define('producto',{
    idProducto:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoincrement: true
    },
    nombreProducto:{
        type: DataTypes.STRING,
        allowNull: false
    },
    precioProducto:{
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    imagenProducto:{
        type: DataTypes.STRING,
        allowNull: true
    },
    disponible:{
        type: DataTypes.BOOLEAN,
        allowNull:true
    },
    categoria:{
        type: DataTypes.STRING,
        allowNull:true
    },
    origen: {
        type: DataTypes.STRING,
        allowNull:false

    }
},
{
    tableName:'productos-walmart',
    timestamps: false
}
)

export default Producto_Walmart