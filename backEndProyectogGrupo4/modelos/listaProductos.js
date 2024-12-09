import { DataTypes } from "sequelize";
import sequelize from "../db/coneccion.js";
import DetalleLista from "./detallelistas.js";

const ListaProductos = sequelize.define('listaproductos',{
    idLista:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idUsuario:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    origen:{
        type: DataTypes.STRING,
        allowNull: false
    },
    numeroProductos:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    totalProducto:{
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    totalComparacion:{
        type: DataTypes.DECIMAL,
        allowNull: false
    }
},
    {
        tableName:'listasproductos',
        timestamps: false
    }
)

ListaProductos.hasMany(DetalleLista,{
    foreignKey: 'idLista'
})

export default ListaProductos