"use client";
import { Producto } from "@/Modelos/Producto";
import api from "@/Service/api";
import React, { useState } from "react";

export default function ComponentCrearListaProductos() {

  const [nombreProducto, setNombreProducto] = useState<string>('')
  const [resultadoBusqueda, setResultadoBusqueda] = useState<Producto[]>([])
  const [resultadoComparacion, setResultadoComparacion] = useState<Producto[]>([])

  async function buscarProducto(nombreProducto:string){
    const resultado = await api.get(`producto/${nombreProducto}`)
    console.log(nombreProducto)
    setResultadoBusqueda(resultado.data)
  }

  async function compararProducto(idProducto:number, origen:string) {
    const resultado = await api.get(`compararProducto/${idProducto}&${origen}`)
    console.log(idProducto, origen)
    setResultadoComparacion(resultado.data)
  }

  return (
    <div className='container mt-5'>
      <form className="d-flex" onSubmit={(e)=>e.preventDefault()} >
        <input className="form-control me-2" type="search" placeholder="Ingrese El Nombre de un Producto" aria-label="Search" value={nombreProducto} onChange={ event => setNombreProducto(event.target.value) }/>
        <button className="btn btn-outline-success" type="submit" onClick={()=>{buscarProducto(nombreProducto)}}>Search</button>
      </form>

      <div className='row'>
        <div className='col-6'>
        <ul className="list-group" >
          {resultadoBusqueda.map((producto)=>(
            <li className="list-group-item justify-content-center d-flex" key={producto.idProducto}>
               <button className="btn btn-outline-success" onClick={()=>{compararProducto(producto.idProducto, producto.origen)}}>
                  <div className="card" style={{width: '18rem' }}>
                    <div className='d-flex justify-content-center m-5' style={{height: '150px', width: 'auto'}}>
                      <img src={producto.imagenProducto}  alt="..."  className='img-fluid'/>
                    </div>                   
                    <div className="card-body">
                      <h5 className="card-title">{producto.precioProducto}LPS.</h5>
                      <p className="card-text"> {producto.nombreProducto}</p>
                    </div>
                </div>
                </button>
            </li>
          )            
          )}          
        </ul>
        </div>
        <div className='col-6'>
        <ul className="list-group" >
          {resultadoComparacion.map((producto)=>(
            <li className="list-group-item justify-content-center d-flex" key={producto.idProducto}>
                <button className="btn btn-outline-success">
                  <div className="card" style={{width: '18rem' }}>
                    <div className='d-flex justify-content-center m-5' style={{height: '200px', width: 'auto'}}>
                      <img src={producto.imagenProducto}  alt="..."  className='img-fluid'/>
                    </div>                   
                    <div className="card-body">
                      <h5 className="card-title">{producto.precioProducto}LPS.</h5>
                      <p className="card-text"> {producto.nombreProducto}</p>
                    </div>
                </div>
                </button>
            </li>
          )            
          )}          
        </ul>
        </div>
      </div>       
    </div>
  )
}