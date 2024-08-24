import { Endereco } from "./endereco"

export interface Perfil {
        nomePerfil: string,
        id: string,
        idCorretor: string,
        tipo: string,    
        enderecos: Array<Endereco>, 
        valorMinimo: number, 
        valorMaximo: number, 
        areaMinima: number, 
        areaMaxima: number, 
        quantidadeVagaMinima: number, 
        quantidadeQuartoMinimo: number, 
        quantidadeBanheiroMinimo: number, 
        varanda: number
 }