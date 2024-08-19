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
        sala: number,
        cozinha: number,
        dependencia: number,
        varanda: number,
        areaServico: number,
        andar: number
 }