'use client';
import React, { useState } from 'react';


const ComponentBuscarProducto: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!searchTerm) return;

    setLoading(true);
    setError('');
    setProducts([]);

    try {
      // Cambiar la URL para usar el parámetro de ruta
      const response = await fetch(`http://localhost:5000/producto:nombreProducto`);
      if (!response.ok) {
        throw new Error('Error fetching products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError('No se encontraron productos o hubo un error en la búsqueda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Buscar Producto</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar producto..."
        />
        <button type="submit">Buscar</button>
      </form>
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ComponentBuscarProducto;