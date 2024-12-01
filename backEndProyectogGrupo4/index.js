import express from 'express'
import Usuario from './modelos/usuarioModelo.js'
import cors from 'cors'
import scrapingColonia from './scraping/lacolonia.js'
import scrapingWalmart from './scraping/walmart.js'


const app = express()

app.use(express.json())
app.use(cors())

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