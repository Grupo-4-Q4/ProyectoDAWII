"use client";

import { useContexto } from "@/Context/ProveedorContexto";
import api from "@/Service/api";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MostrarLIstasComponet() {

  const [listas, setListas] = useState<any[]>([]);
  const { setIdCliente, setIdLista, idCliente } = useContexto();
  const searchParams = useSearchParams();
  const router = useRouter();

  const eliminarLista = async (idLista:Number) =>{
    try {
        await api.delete(`/detallelista/${idLista}`).then(()=>{
            api.delete(`/listaproductos/${idLista}`)
        }).then(()=>{
            cargarListas(idCliente)
            alert("Lista Eliminada con Exito");
            
        })

    } catch (error) {
        alert("Error al guardar la Lista: " + error);
    }
  }

  const navegarListaProducto = (idLista: number) => {
    setIdLista(idLista);
    router.push("/mostarListaCompra"); // Redirige a mostrar la lista de compra
  };

  async function cargarListas(clienteID: number) {
    
    if (Number.isNaN(clienteID)) {
      clienteID = idCliente;
    }
    try {
      const response = await api.get(`/listaproductosporusuario/${clienteID}`);
      setListas(response.data);
    } catch (error) {
      alert("Ocurrió un error al cargar sus listas: " + error);
    }
  }

  useEffect(() => {
    const ID = parseInt(searchParams.get("usuarioId") || "0"); // Manejo seguro del ID
    setIdCliente(ID);
    cargarListas(ID);
  }, [searchParams, idCliente, setIdCliente]);

  return (
    <div className="container mt-5">
      <h3>Estas son tus Listas de Productos</h3>
      <div className="row mt-2">
        <div className="col-12">
          <ul
            className="list-group overflow-auto"
            style={{ maxHeight: "100vh" }}
          >
            {listas.map((lista) => (
              <li key={lista.idLista} className="d-grid">
                <div className="card mt-2">
                  <div className="card-body">
                    <div className="col-12">
                    <p>
                      Lista de Productos de {lista.origen}. Número de Productos:{" "}
                      {lista.numeroProductos}
                    </p>
                    <p>Total: {lista.totalProducto} Lps.</p>
                    </div>
                    <button type="button" className="btn btn-outline-success" onClick={()=>navegarListaProducto(lista.idLista)}>Ver Lista</button>
                    <button type="button" className="btn btn-outline-danger" onClick={()=>eliminarLista(lista.idLista)}>Eliminar</button>                 
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
