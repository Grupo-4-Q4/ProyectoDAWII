import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    'proyecto',
    'root',
    'Salmeron28',
    {
        host: process.env.host,
        port: process.env.port,
        dialect: 'mysql'
    }
)

sequelize.authenticate()
    .then(()=>console.log('Conexion Realizada con Exito'))
    .catch(err=> console.log('Ocurrio un erro en la conexion'))

export default sequelize