'use client';

import React, { useEffect, useState } from 'react';
import api from '@/Service/api';
import { useContexto } from '@/Context/ProveedorContexto';
import { useRouter } from 'next/navigation';
import { Detalle } from '@/Modelos/DetalleLista';

interface Lista {
 idLista:number,
 idUsuario:number,
 numeroProductos: number,
 origen: string,
 totalComparacion: number,
 totalProducto:number,
 detallelistas: Detalle[]
}


export default function ComponentMostarListaCompra() {
  const [lista, setLista] = useState<Lista[]>([]);
  const [detalleLista, setDetalleLista]= useState<Detalle[]>([])
  const [error, setError] = useState<string>('');
  const { idLista } = useContexto();
  const router = useRouter();

  useEffect(() => {
    const cargarProductos = async () => {
      try {
         await api.get(`/listaproductosporid/${idLista}`).then((response)=>{
          if (Array.isArray(response.data)) {
            // Para depurar los datos recibidos
             setLista(response.data);
             setDetalleLista(response.data[0].detallelistas)
             console.log(lista); 
           } else {
             setError('No se recibieron datos válidos.');
           }
         });
       
      } catch (err) {
        
        setError(`Error al cargar los productos: ${err}`);
        console.error(err);
      }
    };

    if (idLista) {
      cargarProductos();
    } else {
      router.push('/mostrarlistas'); // Redirigir si no hay idLista
    }
  }, [idLista, router]);

  return (
    <div className='container mt-5'>
      <h1 className='text-center'>Productos de la Lista</h1>
      {error && <p className='text-danger'>{error}</p>}
      {lista.length === 0 ? (
        <p>No hay productos en esta lista.</p>
      ) : (
        <div>
          <h3>Resumen de la Lista</h3>
          <p>Número de Productos: {lista[0].numeroProductos}</p>
          <p>Total en Walmart: {lista[0].totalProducto} Lps</p>
          <p>Total en La Colonia: {lista[0].totalComparacion} Lps</p>
          <div className="row mt-4">
            <div className="col-12">
              <ul className="list-group">
                {detalleLista.map((producto) => {
                  const precioBajo = Math.min(producto.precioProducto, producto.precioComparacion);
                  const precioAlto = Math.max(producto.precioProducto, producto.precioComparacion);

                  return (
                    <li key={`${producto.productoId}`} className="list-group-item">
                      <h5>{producto.nombreProducto}</h5>
                      <p style={{ color: producto.precioProducto === precioBajo ? 'green' : 'red' }}>
                        Precio en Walmart: {producto.precioProducto} Lps
                      </p>
                      <h5>{producto.nombreComparacion}</h5>
                      <p style={{ color: producto.precioComparacion === precioBajo ? 'green' : 'red' }}>
                        Precio en La Colonia: {producto.precioComparacion} Lps
                      </p>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
