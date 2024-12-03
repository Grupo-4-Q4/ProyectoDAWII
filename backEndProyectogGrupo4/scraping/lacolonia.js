import puppeteer from "puppeteer";
import Producto_Colonia from "../modelos/productoColonia.js";

async function scrapingColonia(){
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  
  let Productos = [];
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(`https://www.lacolonia.com`);
  
  const botonCategorias = ".vtex-mega-menu-2-x-triggerContainer";
  
  await page.waitForSelector(botonCategorias);
  
  await page.click(botonCategorias);
  
  let categorias = await page.evaluate(() => {
    const categorias = Array.from(
      document.querySelectorAll(".vtex-mega-menu-2-x-menuItem")
    );
    return categorias.map((categoria) => {
      const nombreCategoria = categoria
        .querySelector(".vtex-mega-menu-2-x-styledLinkText")
        .innerText.replaceAll(" ", "-");
      return nombreCategoria;
    });
  });
  
  async function remplazar(arreglo, aSustituir, aColocar) {
    return arreglo.map((elemento) => {
      return elemento.replaceAll(aSustituir, aColocar);
    });
  }
  
  categorias.shift();
  
  categorias = categorias.map((categoria) => {
    return categoria.toLocaleLowerCase();
  });
  
  categorias = await remplazar(categorias, "á", "a");
  categorias = await remplazar(categorias, "é", "e");
  categorias = await remplazar(categorias, "í", "i");
  categorias = await remplazar(categorias, "ó", "o");
  categorias = await remplazar(categorias, "ú", "u");
  categorias = await remplazar(categorias, ",", "");
  categorias = await remplazar(categorias, "cerveza", "cervezas");
  categorias = await remplazar(categorias, "cuidado-hogar", "cuidado-del-hogar");
  categorias = await remplazar(categorias, "tortilla", "tortillas");
  
  for (let i = 0; i < categorias.length; i++) {
    let nroPagina = 1;
    let categoriaSigue = true;
    const categoria = categorias[i];
    while (categoriaSigue) {
      await page.goto(
        `https://www.lacolonia.com/supermercado/${categoria}?page=${nroPagina}`
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
        nroPagina = nroPagina + 1;
  
        let productos = await page.evaluate(() => {
          const items = Array.from(
            document.querySelectorAll(".vtex-search-result-3-x-galleryItem")
          );
          return items.map((item) => {
            const nombre = item.querySelector(".product-name-h2").innerText;
            const imagen = item.getElementsByTagName("img")[0].src;
            const disponible = item.querySelector(
              ".vtex-add-to-cart-button-0-x-buttonText"
            ).innerText;
            let precioEntero = "0";
            let precioDecimal = "0";
            let status = false;
            if (disponible != "NO DISPONIBLE") {
              precioEntero = item.querySelector(
                ".vtex-product-price-1-x-currencyInteger"
              ).innerText;
              precioDecimal = item.querySelector(
                ".vtex-product-price-1-x-currencyFraction"
              ).innerText;
              status = true;
            }
            return { nombre, precioEntero, precioDecimal, imagen, status, origen:'lacolonia' };
          });
        });
        productos = productos.map((producto) => {
          return (producto = {
            nombreProducto: producto.nombre,
            precioEntero: producto.precioEntero,
            precioDecimal: producto.precioDecimal,
            imagenProducto: producto.imagen,
            disponible: producto.status,
            categoria: categoria,
            origen: producto.origen
          });
        });
  
        Productos = [...Productos, ...productos];
      } else {
        console.log(
          "Finalizado scraping para la categoria:",
          categorias[i],
          i + 1,
          "de:",
          categorias.length,
          "categorias"
        );
        console.log(Productos.length, "productos en el arreglo");
      }
    }
  }
  console.log(Productos)
  await Productos.forEach(async (producto) => {
    const precio = parseFloat(
      producto.precioEntero + "." + producto.precioDecimal
    );
    const productoExiste = await Producto_Colonia.findAll({
      where: { nombreProducto: producto.nombreProducto },
    });
  
    if (productoExiste.length == 0) {
      const product = await Producto_Colonia.create({
        nombreProducto: producto.nombreProducto,
        precioProducto: precio,
        imagenProducto: producto.imagenProducto,
        disponible: producto.status,
        categoria: producto.categoria,
        origen: producto.origen
      });
    } else {
      const product = await Producto_Colonia.update(
        {
          nombreProducto: producto.nombreProducto,
          precioProducto: precio,
          imagenProducto: producto.imagenProducto,
          disponible: producto.status,
          categoria: producto.categoria,
          origen: producto.origen
        },
        { where: { nombreProducto: producto.nombreProducto } }
      );
    }
  }); 
  await console.log("Se agregaron:", Productos.length, "Productos");
  await browser.close();
}

export default scrapingColonia