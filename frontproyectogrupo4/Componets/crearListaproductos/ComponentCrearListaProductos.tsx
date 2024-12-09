"use client";
import { useContexto } from "@/Context/ProveedorContexto";
import { Detalle } from "@/Modelos/DetalleLista";
import { Producto } from "@/Modelos/Producto";
import api from "@/Service/api";
import React, { useState } from "react";

export default function ComponentCrearListaProductos() {
  const [nombreProducto, setNombreProducto] = useState<string>("");
  const [resultadoBusqueda, setResultadoBusqueda] = useState<Producto[]>([]);
  const [resultadoComparacion, setResultadoComparacion] = useState<Producto[]>([]);
  const [opcionBusqueda, setOpcionBusqueda] = useState<string>("walmart");
  const [detalleLista, setDetalleLista] = useState<Detalle[]>([]);
  const [producto, setProducto] = useState<any>();
  const {idCliente} = useContexto()
  function agregarDetalle(productoComparacion: Producto) {
    const nuevo = { 
      productoId:producto.idProducto, 
      nombreProducto: producto.nombreProducto, 
      precioProducto: parseFloat(producto.precioProducto),
      comparacionId: productoComparacion.idProducto,
      nombreComparacion: productoComparacion.nombreProducto,
      precioComparacion: productoComparacion.precioProducto};
      // @ts-ignore
    setDetalleLista([...detalleLista, nuevo]);
    setNombreProducto("");
    setResultadoBusqueda([]);
    setResultadoComparacion([]);
  }
  async function guardarLista() {
    try {
      const numeroProductos = detalleLista.length
      let totalProductos:number = 0
      let totalComparaciones:number = 0
      detalleLista.forEach(detalle => {
              // @ts-ignore
        totalProductos = parseFloat(detalle.precioProducto)  + parseFloat(totalProductos)
              // @ts-ignore
        totalComparaciones = parseFloat(detalle.precioComparacion) + parseFloat(totalComparaciones)
      });
      await api
        .post("/listaproductos", {
          idUsuario: idCliente,
          origen: opcionBusqueda,
          numeroProductos: numeroProductos,
          totalProducto: totalProductos,
          totalComparacion: totalComparaciones
        })
        .then(async (response) => {
          for (let i = 0; i < detalleLista.length; i++) {
            await api.post("detallelista", {
              idLista: response.data.idLista,
              productoId: detalleLista[i].productoId,
              nombreProducto: detalleLista[i].nombreProducto,
              precioProducto: detalleLista[i].precioProducto,
              comparacionId: detalleLista[i].comparacionId,
              nombreComparacion: detalleLista[i].nombreComparacion,              
              precioComparacion: detalleLista[i].precioComparacion,             
            });
          }
        })
        .then(() => {
          setDetalleLista([]);
        });

      alert("lista guardada con exito");
    } catch (error) {
      alert("Error al guardar la Lista: " + error);
    }
  }
  const handleOpcionBusqueda = (value: string) => {
    setOpcionBusqueda(value);
  };

  async function buscarProducto(nombreProducto: string, origen: string) {
    try {
      const resultado = await api.get(`producto/${nombreProducto}&${origen}`);
      for (let i = 0; i < resultado.data.length; i++) {
        if (resultado.data[0].origen == "lacolonia") {
          resultado.data[i].logo = "/img/logolacolonia.webp";
        } else {
          resultado.data[i].logo = "/img/Walmart-Logo.png";
        }
      }
      setResultadoBusqueda(resultado.data);
    } catch (error) {
      alert("Ocurrio un error al buscar el producto: " + error);
    }
  }

  async function compararProducto(producto: Producto) {
    try {
      setProducto(producto);
      const resultado = await api.get(
        `compararProducto/${producto.idProducto}&${producto.origen}`
      );
      for (let i = 0; i < resultado.data.length; i++) {
        if (resultado.data[0].origen == "lacolonia") {
          resultado.data[i].logo = "/img/logolacolonia.webp";
        } else {
          resultado.data[i].logo = "/img/Walmart-Logo.png";
        }
      }
      setResultadoComparacion(resultado.data);
    } catch (error) {
      alert("Ocurrio un erro al buscar productos similares: " + error);
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-end mb-2 ">
        <div className=" col-3">
          <p>Tienes {detalleLista.length} productos en tu lista</p>
        </div>
        <div className="col-2 d-grid">
          <button className="btn btn-outline-success" onClick={guardarLista}>
            Guardar Lista
          </button>
        </div>
      </div>
      <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Ingrese El Nombre de un Producto"
          aria-label="Search"
          value={nombreProducto}
          onChange={(event) => setNombreProducto(event.target.value)}
        />
        <button
          className="btn btn-outline-success"
          type="submit"
          onClick={() => {
            buscarProducto(nombreProducto, opcionBusqueda);
          }}
        >
          Buscar
        </button>
      </form>
      <div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
            value="walmart"
            checked={opcionBusqueda === "walmart"}
            onChange={() => handleOpcionBusqueda("walmart")}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            Buscar en Walmart
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault2"
            checked={opcionBusqueda === "lacolonia"}
            onChange={() => setOpcionBusqueda("lacolonia")}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault2">
            Buscar en La Colonia
          </label>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <ul
            className="list-group overflow-auto"
            style={{ maxHeight: "100vh" }}
          >
            {resultadoBusqueda.map((producto) => (
              <li
                className="list-group-item justify-content-center d-flex"
                key={producto.idProducto}
              >
                <button
                  className="btn btn-outline-primary"
                  onClick={() => {
                    compararProducto(producto);
                  }}
                >
                  <span className="badge rounded-pill text-bg-light">
                    <div
                      className="d-flex justify-content-center"
                      style={{ height: "50px", width: "auto" }}
                    >
                      <img
                        src={producto.logo}
                        alt="..."
                        className="img-fluid"
                      />
                    </div>
                  </span>
                  <div className="card" style={{ width: "18rem" }}>
                    <div
                      className="d-flex justify-content-center m-5"
                      style={{ height: "150px", width: "auto" }}
                    >
                      <img
                        src={producto.imagenProducto}
                        alt="..."
                        className="img-fluid"
                      />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">
                        {producto.precioProducto}LPS.
                      </h5>
                      <p className="card-text"> {producto.nombreProducto}</p>
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-6">
          <ul
            className="list-group overflow-auto"
            style={{ maxHeight: "100vh" }}
          >
            {resultadoComparacion.map((producto) => (
              <li
                className="list-group-item justify-content-center d-flex"
                key={producto.idProducto}
              >
                <button
                  className="btn btn-outline-primary"
                  onClick={() => {
                    agregarDetalle(producto);
                  }}
                >
                  <span className="badge rounded-pill text-bg-light">
                    <div
                      className="d-flex justify-content-center"
                      style={{ height: "50px", width: "auto" }}
                    >
                      <img
                        src={producto.logo}
                        alt="..."
                        className="img-fluid"
                      />
                    </div>
                  </span>
                  <div className="card" style={{ width: "18rem" }}>
                    <div
                      className="d-flex justify-content-center m-5"
                      style={{ height: "150px", width: "auto" }}
                    >
                      <img
                        src={producto.imagenProducto}
                        alt="..."
                        className="img-fluid"
                      />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">
                        {producto.precioProducto}LPS.
                      </h5>
                      <p className="card-text"> {producto.nombreProducto}</p>
                      <p>{producto.origen}</p>
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
