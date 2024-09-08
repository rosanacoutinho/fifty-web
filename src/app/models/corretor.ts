import { Byte } from "@angular/compiler/src/util";

export interface Corretor {
    id: string,
    creci: string,
    nome: string,
    email: string,
    telefone: number,
    instagram: string,
    frase: string,
    site: string,
    foto: Byte[]
}