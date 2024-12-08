"use client";
import { Producto } from "@/Modelos/Producto";
import api from "@/Service/api";
import React, { useState } from "react";

export default function ComponentCrearListaProductos() {
  const [nombreProducto, setNombreProducto] = useState<string>("");
  const [resultadoBusqueda, setResultadoBusqueda] = useState<Producto[]>([]);
  const [resultadoComparacion, setResultadoComparacion] = useState<Producto[]>([]);
  const [opcionBusqueda, setOpcionBusqueda] = useState<string>('walmart')

  const handleOpcionBusqueda= (value:string)=>{
    setOpcionBusqueda(value)
  }

  async function buscarProducto(nombreProducto: string, origen: string) {
    const resultado = await api.get(`producto/${nombreProducto}&${origen}`);
    for (let i = 0; i < resultado.data.length; i++) {
      if (resultado.data[0].origen == "lacolonia") {
        resultado.data[i].logo = "/img/logolacolonia.webp";
      } else {
        resultado.data[i].logo = "/img/Walmart-Logo.png";
      }
    }
    setResultadoBusqueda(resultado.data);
  }

  async function compararProducto(idProducto: number, origen: string) {
    const resultado = await api.get(`compararProducto/${idProducto}&${origen}`);
    for (let i = 0; i < resultado.data.length; i++) {
      if (resultado.data[0].origen == "lacolonia") {
        resultado.data[i].logo = "/img/logolacolonia.webp";
      } else {
        resultado.data[i].logo = "/img/Walmart-Logo.png";
      }
    }
    setResultadoComparacion(resultado.data);
  }

  return (
    <div className="container mt-5">
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
          Search
        </button>
      </form>
      <div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
            value='walmart'
            checked = {opcionBusqueda === 'walmart'}
            onChange={() => handleOpcionBusqueda('walmart')}
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
            checked = {opcionBusqueda === 'lacolonia'}
            onChange={() =>setOpcionBusqueda('lacolonia')}
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
                    compararProducto(producto.idProducto, producto.origen);
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
                <button className="btn btn-outline-primary">
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
