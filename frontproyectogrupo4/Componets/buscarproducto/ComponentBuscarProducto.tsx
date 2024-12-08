'use client'
import { Producto } from '@/Modelos/Producto'
import api from '@/Service/api'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
export default function ComponentBuscarProducto() {
  const [nombreProducto, setNombreProducto] = useState<string>('')
  const [resultadoBusqueda, setResultadoBusqueda] = useState<Producto[]>([])
  const [resultadoComparacion, setResultadoComparacion] = useState<Producto[]>([])
  const router = useRouter()
  const [opcionBusqueda, setOpcionBusqueda] = useState<string>('walmart')

  const handleOpcionBusqueda= (value:string)=>{
    setOpcionBusqueda(value)
  }

  async function buscarProducto(nombreProducto: string, origen: string) {
    try {
      const resultado = await api.get(`producto/${nombreProducto}&${origen}`)
      
      for(let i = 0; i<resultado.data.length; i++){
        if (resultado.data[0].origen == 'lacolonia'){  
            resultado.data[i].logo = '/img/logolacolonia.webp'
          }else{
            resultado.data[i].logo = '/img/Walmart-Logo.png'
          }
        }
        setResultadoBusqueda(resultado.data)     
    } catch (error) {
      console.error("Error al buscar el producto:", error)
    }
  }

  async function compararProducto(idProducto: number, origen: string) {
    try {
      const resultado = await api.get(`compararProducto/${idProducto}&${origen}`)
      for(let i = 0; i<resultado.data.length; i++){
        if (resultado.data[0].origen == 'lacolonia'){  
            resultado.data[i].logo = '/img/logolacolonia.webp'
          }else{
            resultado.data[i].logo = '/img/Walmart-Logo.png'
          }
        }
      setResultadoComparacion(resultado.data)
    } catch (error) {
      console.error("Error al comparar el producto:", error)
    }
  }

  return (
    <div className='container mt-5'>
      <form className="d-flex mb-4" onSubmit={(e) => e.preventDefault()}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Ingrese el nombre de un producto"
          aria-label="Search"
          value={nombreProducto}
          onChange={event => setNombreProducto(event.target.value)}
        />
        <button className="btn btn-outline-success" type="submit" onClick={() => { buscarProducto(nombreProducto, opcionBusqueda); }}>
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
      <div className='row mt-4'>
        <div className='col-6'>
          <h4>Resultados de Búsqueda</h4>
          <ul className="list-group overflow-auto" style={{maxHeight:'100vh'}}>
            {resultadoBusqueda.map((producto) => (
              <li className="list-group-item justify-content-center d-flex" key={producto.idProducto}>
                <button className="btn btn-outline-success" onClick={() => { compararProducto(producto.idProducto, producto.origen) }}>
                <span className="badge rounded-pill text-bg-light">
               <div className='d-flex justify-content-center' style={{height: '50px', width: 'auto'}}>
                      <img src={producto.logo}  alt="..."  className='img-fluid'/>
                    </div>  
               </span>
                  <div className="card mb-3" style={{ width: '18rem', border: '1px solid #28a745', borderRadius: '5px' }}>
                    <div className='d-flex justify-content-center m-3' style={{ height: '150px', width: 'auto' }}>
                      <img src={producto.imagenProducto} alt={producto.nombreProducto} className='img-fluid' style={{ borderRadius: '5px' }} />
                    </div>
                    <div className="card-body text-center">
                      <h5 className="card-title">{producto.precioProducto} LPS.</h5>
                      <p className="card-text">{producto.nombreProducto}</p>
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-6">
          <h4>Resultados de Comparación</h4>
          <ul className="list-group overflow-auto" style={{maxHeight:'100vh'}}>
            {resultadoComparacion.map((producto) => (
              <li className="list-group-item justify-content-center d-flex" key={producto.idProducto}>
                <button className="btn btn-outline-success">
                <span className="badge rounded-pill text-bg-light">
               <div className='d-flex justify-content-center' style={{height: '50px', width: 'auto'}}>
                      <img src={producto.logo}  alt="..."  className='img-fluid'/>
                    </div>  
               </span>
                  <div className="card mb-3" style={{ width: '18rem', border: '1px solid #28a745', borderRadius: '5px' }}>
                    <div className='d-flex justify-content-center m-3' style={{ height: '200px', width: 'auto' }}>
                      <img src={producto.imagenProducto} alt={producto.nombreProducto} className="img-fluid" style={{ borderRadius: '5px' }} />
                    </div>
                    <div className="card-body text-center">
                      <h5 className="card-title">{producto.precioProducto} LPS.</h5>
                      <p className="card-text">{producto.nombreProducto}</p>
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className='mt-4 text-center'>
        <button className="btn btn-primary me-2" onClick={() => router.push('/login')}>
          Volver a Iniciar Sesión
        </button>
        <button className="btn btn-secondary" onClick={() => router.push('/registro')}>
          Volver a Registro
        </button>
      </div>
    </div>
  )
}
