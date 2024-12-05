'use client'
import { Producto } from '@/Modelos/Producto'
import api from '@/Service/api'
import React, { useState } from 'react'

export default function ComponentCrearListaProductos() {

  const [nombreProducto, setNombreProducto] = useState<string>('')
  const [resultadoBusqueda, setResultadoBusqueda] = useState<Producto[]>([])
  const [resultadoComparacion, setResultadoComparacion] = useState<Producto[]>([])

  async function buscarProducto(nombreProducto:string){
    const resultado = await api.get(`producto/${nombreProducto}`)
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
        <ul className="list-group overflow-auto" style={{maxHeight:'100vh'}} >
          {resultadoBusqueda.map((producto)=>(
            <li className="list-group-item justify-content-center d-flex" key={producto.idProducto}>
               <button className="btn btn-outline-primary" onClick={()=>{compararProducto(producto.idProducto, producto.origen)}}>
               <span className="badge rounded-pill text-bg-light">
               <div className='d-flex justify-content-center' style={{height: '50px', width: 'auto'}}>
                      <img src="https://1000logos.net/wp-content/uploads/2017/05/Walmart-Logo.png"  alt="..."  className='img-fluid'/>
                    </div>  
               </span>
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
        <div className='col-6' >
        <ul className="list-group overflow-auto" style={{maxHeight:'100vh'}}>
          {resultadoComparacion.map((producto)=>(
            <li className="list-group-item justify-content-center d-flex" key={producto.idProducto}>
                <button className="btn btn-outline-primary">
                <span className="badge rounded-pill text-bg-light">
               <div className='d-flex justify-content-center' style={{height: '50px', width: 'auto'}}>
                      <img src="https://lacolonia.vtexassets.com/assets/vtex/assets-builder/lacolonia.theme-lacolonia/2.0.62/header/logo___21f6bc1bbf440d33ab34be9957832b19.png"  alt="..."  className='img-fluid'/>
                    </div>  
               </span>
                  <div className="card" style={{width: '18rem' }}>
                    <div className='d-flex justify-content-center m-5' style={{height: '150px', width: 'auto'}}>
                      <img src={producto.imagenProducto}  alt="..."  className='img-fluid'/>
                    </div>                   
                    <div className="card-body">
                      <h5 className="card-title">{producto.precioProducto}LPS.</h5>
                      <p className="card-text"> {producto.nombreProducto}</p>
                      <p>{producto.origen}</p>
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