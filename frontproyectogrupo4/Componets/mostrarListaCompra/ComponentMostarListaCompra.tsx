'use client';

import React, { useEffect, useState } from 'react';
import api from '@/Service/api';
import { useContexto } from '@/Context/ProveedorContexto';
import { useRouter } from 'next/navigation';

interface Producto {
  idProducto: number;
  nombreProducto: string;
  precioProducto: number;      // Precio en Walmart
  precioComparacion: number;   // Precio en La Colonia
  origen: string;
  numeroProductos: number;      // Número total de productos
  totalProducto: string;        // Total en Walmart
  totalComparacion: string;     // Total en La Colonia
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
          console.log(response.data); // Para depurar los datos recibidos
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
      router.push('/mostrarlistas'); // Redirigir si no hay idLista
    }
  }, [idLista, router]);

  return (
    <div className='container mt-5'>
      <h1 className='text-center'>Productos de la Lista</h1>
      {error && <p className='text-danger'>{error}</p>}
      {productos.length === 0 ? (
        <p>No hay productos en esta lista.</p>
      ) : (
        <div>
          <h3>Resumen de la Lista</h3>
          <p>Número de Productos: {productos[0].numeroProductos}</p>
          <p>Total en Walmart: {productos[0].totalProducto} Lps</p>
          <p>Total en La Colonia: {productos[0].totalComparacion} Lps</p>
          <div className="row mt-4">
            <div className="col-12">
              <ul className="list-group">
                {productos.map((producto) => {
                  const precioBajo = Math.min(producto.precioProducto, producto.precioComparacion);
                  const precioAlto = Math.max(producto.precioProducto, producto.precioComparacion);

                  return (
                    <li key={`${producto.idProducto}-${producto.origen}`} className="list-group-item">
                      <h5>{producto.nombreProducto}</h5>
                      <p style={{ color: producto.precioProducto === precioBajo ? 'green' : 'red' }}>
                        Precio en Walmart: {producto.precioProducto} Lps
                      </p>
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
