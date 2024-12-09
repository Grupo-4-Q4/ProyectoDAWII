'use client'
import { useContexto } from '@/Context/ProveedorContexto'
import api from '@/Service/api'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";

export default function MostrarLIstasComponet() {
    const [listas, setListas] = useState<any[]>([])
    const [origen, setOrigen] = useState<string>('')
    const [comparacion, setComparacion] = useState<string>('')
    const {setIdCliente, setIdLista, idCliente} = useContexto()
    const searchParamns = useSearchParams()
    const router = useRouter();

    function navegarListaProducto(idLista:number){
        setIdLista(idLista)
        router.push('/mostarListaCompra')
    }

    async function cargarListas(clienteID:number){
        if(Number.isNaN(clienteID)){
            clienteID = idCliente
        }
        console.log(idCliente)
        try {
            await api.get(`/listaproductosporusuario/${clienteID}`).then((response)=>{
                setListas(response.data)                            
            })           
        } catch (error) {
            alert('ocurrio un error al cargar sus listas: '+ error)
        }       
    }
    useEffect(()=>{
         // @ts-ignore
        const ID = parseInt(searchParamns.get('usuarioId'))
        setIdCliente(ID)
        cargarListas(ID)

    },[])
  return (
    <div className='container mt-5'>
      <h3>Estas son tus Listas de Productos</h3>
      <div className="row mt-2">
        <div className="col-12">
            <ul  className="list-group overflow-auto"
            style={{ maxHeight: "100vh" }}>
                {
                    listas.map((lista)=>(
                        <li key={lista.idLista} className='d-grid'>
                            <button type="button" className="btn btn-success m-2 p-2 mx-auto">
                            <p>Lista de Productos de {lista.origen} Numero de Productos: {lista.numeroProductos}</p>
                            <p>Total: {lista.origen == 'walmart' ? 'Walmart' : 'La Colonia'} {lista.totalProducto}.Lps Total: {lista.origen == 'walmart' ? 'La Colonia' : 'Walmart'} {lista.totalComparacion}.Lps</p>
                            </button>                           
                        </li>                        
                    ))
                }
           </ul>
        </div>
      </div>
    </div>
  )
}
