import express from "express";
import Usuario from "./modelos/usuarioModelo.js";
import cors from "cors";
import scrapingColonia from "./scraping/lacolonia.js";
import scrapingWalmart from "./scraping/walmart.js";
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

app.get("/producto/:nombreProducto", async (req, res) => {
  try {
    const productosColonia = await Producto_Colonia.findAll();
    const productosWalmart = await Producto_Walmart.findAll();

    const arregloBusqueda = req.params.nombreProducto.split(" ");
    console.log(arregloBusqueda);

    let resultadoColonia = productosColonia;
    arregloBusqueda.forEach((palabra) => {
      resultadoColonia = filtrarProductos(palabra, resultadoColonia);
    });

    let resultadoWalmart = productosWalmart;
    arregloBusqueda.forEach((palabra) => {
      resultadoWalmart = filtrarProductos(palabra, resultadoWalmart);
    });
    const resultado = [...resultadoWalmart, ...resultadoColonia];
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
      if (distancia < 30 && producto.nombreProducto.includes(listaNombreProducto[0])) {
        listadoRespuesta = [...listadoRespuesta, producto];
      }else if(distancia < 30 && producto.nombreProducto.includes(listaNombreProducto[1])){
        listadoRespuesta = [...listadoRespuesta, producto];
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
      if (distancia < 30 && producto.nombreProducto.includes(listaNombreProducto[0])) {
        listadoRespuesta = [...listadoRespuesta, producto];
      } else if(distancia < 30 && producto.nombreProducto.includes(listaNombreProducto[1])){
        listadoRespuesta = [...listadoRespuesta, producto];
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
    const idUsuario = req.body.idUsuario;
    const lista = req.body.lista;
    const nuevalista = await ListaProductos.create({ idUsuario });

    for (let i = 0; i < lista.length; i++) {
      const detalle = await DetalleLista.create({
        idLista: nuevalista.idLista,
        productoId: lista[i].productoID,
        origen: lista[i].origen,
      });
    }

    res.status(200).send({ mensaje: "Lista Guardada con Exito" });
  } catch (error) {
    res.status(500).json({ error: "Ocurrio un error" + error });
  }
});


app.listen(5000, () => {
  console.log("aplicacion ejecutando en el puerto 5000");
});

app.get("/listaproductos", async (req, res) => {
  try {
    const lista = ListaProductos.findAll({
      include: [
        {
          model: DetalleLista,
          required: true,
        },
      ],
    });
    res.status(200).json(lista);
  } catch (error) {
    res.status(500).json({ error: "Ocurrio un error" + error });
  }
});

