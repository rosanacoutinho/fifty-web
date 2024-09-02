import { Endereco } from "./endereco"

export interface Opcao {
        id: string,
        idCorretor: string,
        tipo: string,
        negocio: string,    
        valor: number,
        area: number,
        endereco: Endereco,
        nomeOpcao: string,
        quarto: string,
        suite: string,     
        banheiro: string,
        vagaGaragem: string,
        varanda: boolean,
        iptu: string,
        condominio: string
 }