import { Endereco } from "./endereco"

export interface Perfil {
        nomePerfil: string,
        id: string,
        idCorretor: string,
        tipo: string,  
        negocio: string,    
        enderecos: Array<Endereco>, 
        valorMinimo: number, 
        valorMaximo: number, 
        areaMinima: number, 
        areaMaxima: number, 
        quantidadeVagaMinima: number, 
        quantidadeQuartoMinimo: number,
        quantidadeSuiteMinima: number, 
        quantidadeBanheiroMinimo: number, 
        varanda: boolean,
        valorMaximoIptu: number,
        valorMaximoCondominio: number
 }