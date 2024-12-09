'use client'
import React, { ReactNode, useContext, useState } from 'react'
import { Contexto } from './Contexto'

interface VistaComponente{
    children: ReactNode
}

export default function ProveedorContexto({children}: VistaComponente) {
    const [idLista, setIdLista] = useState<number>(0)
    const [idCliente, setIdCliente] = useState<number>(0) 
  return (
    <Contexto.Provider 
    value={{idLista, idCliente, setIdCliente, setIdLista}}
    >
        {children}
    </Contexto.Provider>
  )
}

export function useContexto(){
    return useContext(Contexto)
}