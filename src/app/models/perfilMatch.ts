import { Opcao } from "./opcao"
import { Perfil } from "./perfil"

export interface PerfilMatch {
        id: string,
        opcao: Opcao,
        perfil: Perfil,
        status: string,    
        data: Date
 }