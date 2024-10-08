import { Corretor } from "./corretor"
import { Endereco } from "./endereco"

export interface OpcaoVitrine {
        id: string,
        corretor: Corretor,
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
        condominio: string,
        descricao: string,
        posicao: string,
        sol: string,
        andar: string,
        numeroMatchings: number,
        urls: string[]
 }