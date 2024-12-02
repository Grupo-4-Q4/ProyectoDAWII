import express from 'express'
import Usuario from './modelos/usuarioModelo.js'
import cors from 'cors'
import scrapingColonia from './scraping/lacolonia.js'
import scrapingWalmart from './scraping/walmart.js'
import Producto_Colonia from './modelos/productoColonia.js'
import Producto_Walmart from './modelos/productoWalmart.js'
import stringComparison from 'string-comparison'

let cos = stringComparison.longestCommonSubsequence
const app = express()

app.use(express.json())
app.use(cors())

/* async function cargarProductos(req,res){
    try {
       
    } catch (error) {
        console.log('Error al cargar los Productos:', error)
    }
    
}

cargarProductos() */



app.get('/usuario', async(req,res)=>{
    try {
        const usuarios = await Usuario.findAll()

        res.status(200).json(usuarios)
    } catch (error) {
        res.status(500).json({error: 'Ocurrio un error' + error});
    }
})

app.post('/usuario', async (req,res)=>{
    try {
        const usuario = await Usuario.create(req.body)

        res.status(201).json({'mensaje':'usuario creado con exito'})
    } catch (error) {
        res.status(500).json({error: 'Ocurrio un error' + error});
    }
})

app.get('/producto:nombreProducto', async(req,res)=>{
    try {
        const productosColonia = await Producto_Colonia.findAll()
        const productosWalmart = await Producto_Walmart.findAll()
        let ProductosBusqueda=[]
        console.log(req.params.nombreProducto.substr(1))
        productosColonia.forEach(producto => {
            const nombrePBD = producto.nombreProducto.toLowerCase()
            const nombreBuscado = req.params.nombreProducto.substr(1).toLowerCase()
            const contiene = nombrePBD.includes(nombreBuscado)
            if (contiene){
                ProductosBusqueda = [...ProductosBusqueda, producto]
            }
           /*  const distancia = cos.similarity( producto.nombreProducto.toLowerCase(), req.params.nombreProducto.substr(1).toLowerCase())
            if (distancia >=0.43 && distancia <= 0.46){
                console.log(distancia)
                ProductosBusqueda = [...ProductosBusqueda, producto]
            } */
        });
      /*   productosWalmart.forEach(producto => {
            const distancia = cos.distance(req.params.nombreProducto, producto.nombreProducto)
            if (distancia <= 15){
                ProductosBusqueda = [...ProductosBusqueda, producto]
            }
        }); */

        res.status(200).json(ProductosBusqueda)
    } catch (error) {
        res.status(500).json({error: 'Ocurrio un error' + error});
    }
})

app.put('/usuario:idUsuario', async (req,res)=>{
    try {
        const [updated] = await Usuario.update(red.body,{
            where:{idUsuario: req.params.idUsuario}
        })

        if(updated){
            res.status(201).json({'mensaje': 'Usuario actualizado correctamente'})
        }else{
            res.status(400).json({'mensaje':'no se actualizo'})
        }
    } catch (error) {
        res.status(500).json({error: 'Ocurrio un error' + error});
    }
})

app.delete('/usuario:idUsuario', async (req,res)=>{
    try {
        const deleted = await Usuario.destroy({
            where: {idUsuario: req.params.idUsuario}
        })

        if(deleted){
            res.status(200).send({'mensaje':'usuario eliminado correctamente'})
        }else{
            res.status(404).json({error: 'usuario no encontrado'})
        }
    } catch (error) {
        res.status(500).json({error: 'Ocurrio un error' + error});
    }
})

app.listen(5000,()=>{
    console.log('aplicacion ejecutando en el puerto 5000')
})
