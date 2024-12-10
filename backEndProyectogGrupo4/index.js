import express from "express";
import Usuario from "./modelos/usuarioModelo.js";
import cors from "cors";
import Producto_Colonia from "./modelos/productoColonia.js";
import Producto_Walmart from "./modelos/productoWalmart.js";
import stringComparison from "string-comparison";
import ListaProductos from "./modelos/listaProductos.js";
import DetalleLista from "./modelos/detallelistas.js";

let levenshtein = stringComparison.levenshtein;
const app = express();

app.use(express.json());
app.use(cors());

function filtrarProductos(palabra, productos) {
  let ProductosFiltrados = [];
  productos.forEach((producto) => {
    const nombrePBD = producto.nombreProducto.toLowerCase();
    const contiene = nombrePBD.includes(palabra.toLowerCase());
    if (contiene) {
      ProductosFiltrados = [...ProductosFiltrados, producto];
    }
  });
  return ProductosFiltrados;
}

app.get("/usuario", async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();

    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Ocurrio un error" + error });
  }
});

app.post("/usuario", async (req, res) => {

  try {
    const usuario = await Usuario.create(req.body);
    res.status(201).json({ mensaje: "usuario creado con exito" });
  } catch (error) {
    res.status(500).json({ error: "Ocurrio un error" + error });
  }
});

/*
app.post("/usuario", async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);
    res.status(201).json({ mensaje: "Usuario creado con éxito" });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      // Detectar si el error proviene de la restricción de unicidad
      res.status(400).json({ error: "El correo ya está registrado" });
    } else {
      console.error("Error al crear el usuario:", error);
      res.status(500).json({ error: "Ocurrió un error: " + error.message });
    }
  }
});*/



app.get("/producto/:nombreProducto&:origen", async (req, res) => {
  try {
    let productos = []
    if(req.params.origen == 'walmart'){
      productos = await Producto_Walmart.findAll();
    }else{
      productos = await Producto_Colonia.findAll();
    }    

    const arregloBusqueda = req.params.nombreProducto.split(" ");

    let resultado = productos;
    arregloBusqueda.forEach((palabra) => {
      resultado = filtrarProductos(palabra, resultado);
    });

    res.status(200).json(resultado);
  } catch (error) {
    res.status(500).json({ error: "Ocurrio un error" + error });
  }
});

app.get("/compararProducto/:productoID&:origen", async (req, res) => {
  const origen = req.params.origen;
  const pID = req.params.productoID;
  if (origen == "lacolonia") {
    const Producto = await Producto_Colonia.findAll({
      where: { idProducto: parseInt(pID) },
    });
    const listaNombreProducto = Producto[0].nombreProducto.split(' ')
    const listadoCompletoWalmart = await Producto_Walmart.findAll();
    let listadoRespuesta = [];
    listadoCompletoWalmart.forEach((producto) => {
      const distancia = levenshtein.distance(
        producto.nombreProducto,
        Producto[0].nombreProducto
      );
      if (distancia < 30) {
        const listaNombreComparacion = producto.nombreProducto.split(' ')
        if(listaNombreComparacion[0] == listaNombreProducto[0]){
          listadoRespuesta = [...listadoRespuesta, producto];
        }else if(listaNombreComparacion[1] == listaNombreProducto[0]){
          listadoRespuesta = [...listadoRespuesta, producto];
        }       
      }
    });
    res.status(200).json(listadoRespuesta);
  } else if (origen == "walmart") {
    const Producto = await Producto_Walmart.findAll({
      where: { idProducto: parseInt(pID) },
    });
    const listaNombreProducto = Producto[0].nombreProducto.split(' ')
    const listadoCompletoColonia = await Producto_Colonia.findAll();
    let listadoRespuesta = [];
    listadoCompletoColonia.forEach((producto) => {
      const distancia = levenshtein.distance(
        producto.nombreProducto,
        Producto[0].nombreProducto
      );
      if (distancia < 30) {
        const listaNombreComparacion = producto.nombreProducto.split(' ')
        if(listaNombreComparacion[0] == listaNombreProducto[0]){
          listadoRespuesta = [...listadoRespuesta, producto];
        }else if(listaNombreComparacion[1] == listaNombreProducto[0]){
          listadoRespuesta = [...listadoRespuesta, producto];
        }       
      }
    });
    res.status(200).json(listadoRespuesta);
  }
});

app.put("/usuario/:idUsuario", async (req, res) => {
  try {
    const [updated] = await Usuario.update(req.body, {
      where: { idUsuario: req.params.idUsuario },
    });

    if (updated) {
      res.status(201).json({ mensaje: "Usuario actualizado correctamente" });
    } else {
      res.status(400).json({ mensaje: "no se actualizo" });
    }
  } catch (error) {
    res.status(500).json({ error: "Ocurrio un error" + error });
  }
});

app.delete("/usuario:idUsuario", async (req, res) => {
  try {
    const deleted = await Usuario.destroy({
      where: { idUsuario: req.params.idUsuario },
    });

    if (deleted) {
      res.status(200).send({ mensaje: "usuario eliminado correctamente" });
    } else {
      res.status(404).json({ error: "usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Ocurrio un error" + error });
  }
});

app.post("/listaproductos", async (req, res) => {
  try {
    const nuevalista = await ListaProductos.create(req.body);   
    res.status(200).json(nuevalista);
  } catch (error) {
    res.status(500).json({ error: "Ocurrio un error" + error });
  }
});

app.post("/detallelista", async (req, res) => {
  try {
    console.log(req.body)
      const detalle = await DetalleLista.create(req.body);    

    res.status(200).send({ mensaje: "detalle guardado con exito" });
  } catch (error) {
    res.status(500).json({ error: "Ocurrio un error" + error });
  }
});

app.get("/listaproductosporid/:idLista", async (req, res) => {
const idLista = req.params.idLista
  try {
    const lista = await ListaProductos.findAll({
      include: [{
        model:DetalleLista,
        required: true
      }],
      where:{idLista : idLista}
    });
    res.status(200).json(lista);
  } catch (error) {
    res.status(500).json({ error: "Ocurrio un error" + error });
  }
});

app.get("/listaproductosporusuario/:idUsuario", async (req, res) => {
  const idUsuario = req.params.idUsuario
    try {
      const lista = await ListaProductos.findAll({
        where:{idUsuario : idUsuario}
      });
      res.status(200).json(lista);
    } catch (error) {
      res.status(500).json({ error: "Ocurrio un error" + error });
    }
  });  

app.listen(5000, () => {
  console.log("aplicacion ejecutando en el puerto 5000");
});