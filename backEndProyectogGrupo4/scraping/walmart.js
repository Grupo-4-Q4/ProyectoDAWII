import puppeteer from "puppeteer";
import Producto_Walmart from "../modelos/productoWalmart.js";


async function scrapingWalmart() {
  const browser = await puppeteer.launch({
    headless: false,
  });
  
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1280, height: 800 });
  
  const categorias = [
    "abarrotes",
    "articulos-para-el-hogar",
    "higiene-y-belleza",
    "bebes-y-ninos",
    "jugos-y-bebidas",
    "limpieza",
    "electronica",
    "farmacia",
    "lacteos",
    "carnes-y-pescados",
    "cervezas-vinos-y-licores",
    "mascota",
    "embutidos",
    "panaderia-y-tortilleria",
    "alimentos-congelados",
    "juguetes",
    "frutas-y-verduras",
    "deportes",
    "ropa-y-zapateria",
  ];
  let Productos = [];
  
  for (let i = 0; i < categorias.length; i++) {
    let categoriaSigue = true;
    let numeroPagina = 1;
    const categoriaActual = categorias[i];
    while (categoriaSigue) {
      await page.goto(
        `https://www.walmart.com.hn/${categorias[i]}?page=${numeroPagina}`
      );
  
      categoriaSigue = await page.evaluate(() => {
        if (
          document.querySelectorAll(".vtex-search-result-3-x-searchNotFoundOops")
            .length == 0
        ) {
          resultado = true;
        } else {
          resultado = false;
        }
        return resultado;
      });
  
      if (categoriaSigue) {
        numeroPagina = numeroPagina + 1;
  
        try {
          let productos = await page.evaluate((categoria) => {
            const items = Array.from(
              document.querySelectorAll(".vtex-product-summary-2-x-container")
            );
            return items.map((item) => {
              const hayPrecio = item.querySelectorAll(
                ".vtex-store-components-3-x-currencyContainer"
              );
              const nombre = item.querySelector(
                ".vtex-product-summary-2-x-brandName"
              ).innerText;
              const imagen = item.getElementsByTagName("img")[0].src;
              if (hayPrecio.length != 0) {
                estatus = true;
                const precio = item
                  .querySelector(".vtex-store-components-3-x-currencyContainer")
                  .innerText.substring(2);
                return { nombre, precio, imagen, estatus, categoria };
              } else {
                estatus = false;
                const precio = 0;
                return { nombre, precio, imagen, estatus, categoria, origen: 'walmart'};
              }
            });
          }, categoriaActual);
  
          Productos = [...Productos, ...productos];
        } catch (error) {
          console.log("Ha ocurrido un error", error);
          console.log(
            "La pagina:",
            numeroPagina,
            "de la categoria",
            categoriaActual,
            "no se pudo capturar"
          );
        }
      }
    }
    console.log("Scraping de la categoria:", categoriaActual, "terminado");
    console.log("Tenemos:", Productos.length, "productos en el arreglo");
  }
  
  await Productos.forEach(async (producto) => {
    const productoExiste = await Producto_Walmart.findAll({
      where: { nombreProducto: producto.nombre },
    });
    if (productoExiste.length > 0) {
      console.log("el producto:", producto);
      const product = await Producto_Walmart.update(
        {
          nombreProducto: producto.nombre,
          precioProducto: parseFloat(producto.precio),
          imagenProducto: producto.imagen,
          disponible: producto.estatus,
          categoria: producto.categoria,
          origen: producto.origen,

        },
        { where: { nombreProducto: producto.nombre } }
      );
    } else {
      const product = await Producto_Walmart.create({
        nombreProducto: producto.nombre,
        precioProducto: parseFloat(producto.precio),
        imagenProducto: producto.imagen,
        disponible: producto.estatus,
        categoria: producto.categoria,
        origen: producto.origen,

      });
    }
  });
  await console.log("Se agregaron:", Productos.length, "Productos");
  await browser.close();
}

export default scrapingWalmart