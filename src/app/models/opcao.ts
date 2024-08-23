import { Endereco } from "./endereco"

export interface Opcao {
        id: string,
        idCorretor: string,
        tipo: string,
        valor: number,
        area: number,
        endereco: Endereco,
        nomeOpcao: string,
        quarto: number,
        suite: number,     
        banheiro: number,
        vagaGaragem: number,
        varanda: number
 }