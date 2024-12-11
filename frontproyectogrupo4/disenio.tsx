'use client';

import React, { useEffect, useState } from 'react';
import api from '@/Service/api';
import { useContexto } from '@/Context/ProveedorContexto';
import { useRouter } from 'next/navigation';


interface Producto {
    idProducto: number;
    nombreProducto: string;
    precioProducto: number;      
    precioComparacion: number;   
    origen: string;
    numeroProductos: number;      
    totalProducto: string;        
    totalComparacion: string;     
  }

export default function ComponentMostarListaCompra() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [error, setError] = useState<string>('');
  const { idLista } = useContexto(); 
  const router = useRouter();

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const response = await api.get(`/listaproductosporid/${idLista}`);
        if (Array.isArray(response.data)) {
          setProductos(response.data);
        } else {
          setError('No se recibieron datos válidos.');
        }
      } catch (err) {
        setError(`Error al cargar los productos: ${err.message}`);
        console.error(err);
      }
    };

    if (idLista) {
      cargarProductos();
    } else {
      router.push('/mostrarlistas'); 
    }
  }, [idLista, router]);

  const calcularTotales = () => {
    const totalWalmart = productos.reduce((total, producto) => total + (producto.precioProducto || 0), 0);
    const totalColonia = productos.reduce((total, producto) => total + (producto.precioComparacion || 0), 0);
    return { totalWalmart, totalColonia };
  };


  const { totalWalmart, totalColonia } = calcularTotales();

  return (
    <div className='container mt-5'>
      <h1 className='text-center'>Resumen de la Lista</h1>
      {error && <p className='text-danger'>{error}</p>}
      <h4>Número de Productos: {productos[0].numeroProductos}</h4>
      <h4>Total en Walmart: {productos[0].totalProducto} Lps</h4>
      <h4>Total en La Colonia: {productos[0].totalComparacion} Lps</h4>
      {productos.length === 0 ? (
        <p>No hay productos en esta lista.</p>
      ) : (
        <div className="row mt-4">
          <div className="col-12">
            <ul className="list-group">
              {productos.map((producto) => {
                const precioBajo = Math.min(producto.precioProducto, producto.precioComparacion);
                const proveedorBajo = producto.precioProducto < producto.precioComparacion ? 'Walmart' : 'La Colonia';

                return (
                  <li key={producto.idProducto} className="list-group-item">
                    <h5>{producto.nombreProducto}</h5>
                    <p style={{ color: 'green' }}>Precio en Walmart: {productos[0].totalProducto} Lps</p>
                    <p style={{ color: 'blue' }}>Precio en La Colonia: {productos[0].totalComparacion} Lps</p>
                    <p style={{ fontWeight: 'bold' }}>
                      El precio más bajo es: {precioBajo} Lps en {proveedorBajo}.
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}


























