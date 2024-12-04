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
    }
},
    {
        tableName:'listasproductos',
        timestamps: false
    }
)
ListaProductos.hasMany(DetalleLista)
DetalleLista.belongsTo(ListaProductos)
export default ListaProductos