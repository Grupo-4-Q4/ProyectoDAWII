import { Detalle } from "./DetalleLista";

export interface Lista{
    idLista: number,
    idUsuario: number,
    origen: string,
    lista: Detalle[]
}