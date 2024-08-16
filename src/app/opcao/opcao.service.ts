import { Injectable } from '@angular/core';
import { Opcao } from '../models/opcao';

@Injectable({
  providedIn: 'root'
})
export class OpcaoService {

  private opcoes: Opcao[] = []

  constructor(){
    let savedOpcoes = localStorage.getItem("Opcoes");
    this.opcoes = savedOpcoes? JSON.parse(savedOpcoes) : [];
  }

  getOpcoes(): Opcao[]{
    return this.opcoes;
  }

  getOpcao(id:string): Opcao | undefined {
    return this.opcoes.find(o => o.id === id);
  }

  addOpcao(Opcao: Opcao): void{
    this.opcoes.push(Opcao);
    localStorage.setItem("opcoes", JSON.stringify(this.opcoes));
  }

  deleteOpcao(id: string): void{
    let index = this.opcoes.findIndex(o => o.id === id);
    this.opcoes.splice(index,1);
    localStorage.setItem("opcoes", JSON.stringify(this.opcoes));
  }

  updateOpcao(updateOpcao: Opcao): void{
    let index = this.opcoes.findIndex(o => o.id === updateOpcao.id);
    this.opcoes[index] = updateOpcao;
    localStorage.setItem("opcoes", JSON.stringify(this.opcoes));
  }
}
