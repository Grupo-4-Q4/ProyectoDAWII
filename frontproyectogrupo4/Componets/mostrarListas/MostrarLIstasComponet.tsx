'use client';

import { useContexto } from '@/Context/ProveedorContexto';
import api from '@/Service/api';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";

export default function MostrarLIstasComponet() {
    const [listas, setListas] = useState<any[]>([]);
    const { setIdCliente, setIdLista, idCliente } = useContexto();
    const searchParams = useSearchParams();
    const router = useRouter();

    const navegarListaProducto = (idLista: number) => {
        setIdLista(idLista);
        router.push('/mostarListaCompra'); // Redirige a mostrar la lista de compra
    };

    async function cargarListas(clienteID: number) {
        if (Number.isNaN(clienteID)) {
            clienteID = idCliente;
        }
        try {
            const response = await api.get(`/listaproductosporusuario/${clienteID}`);
            setListas(response.data);
        } catch (error) {
            alert('Ocurrió un error al cargar sus listas: ' + error);
        }
    }

    useEffect(() => {
        const ID = parseInt(searchParams.get('usuarioId') || '0'); // Manejo seguro del ID
        setIdCliente(ID);
        cargarListas(ID);
    }, [searchParams, idCliente, setIdCliente]);

    return (
        <div className='container mt-5'>
            <h3>Estas son tus Listas de Productos</h3>
            <div className="row mt-2">
                <div className="col-12">
                    <ul className="list-group overflow-auto" style={{ maxHeight: "100vh" }}>
                        {listas.map((lista) => (
                            <li key={lista.idLista} className='d-grid'>
                                <button 
                                    type="button" 
                                    className="btn btn-success m-2 p-2 mx-auto"
                                    onClick={() => navegarListaProducto(lista.idLista)} // Navegar a la lista de productos al hacer clic
                                >
                                    <p>Lista de Productos de {lista.origen}. Número de Productos: {lista.numeroProductos}</p>
                                    <p>Total: {lista.totalProducto} Lps.</p>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
