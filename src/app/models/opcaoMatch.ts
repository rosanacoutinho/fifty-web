import { Endereco } from "./endereco"
import { Opcao } from "./opcao"
import { Perfil } from "./perfil"

export interface OpcaoMatch {
        id: string,
        opcao: Opcao,
        perfil: Perfil,
        status: string,    
        data: Date
 }