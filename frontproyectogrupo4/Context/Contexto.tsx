'use client'

import { createContext } from "react"

export const Contexto = createContext({
    idLista: 0 as number,
    idCliente: 0 as number,
    setIdLista: (idLista:number)=>{},
    setIdCliente: (idCliente:number)=>{}
})