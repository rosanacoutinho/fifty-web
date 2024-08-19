import { Injectable } from '@angular/core';
import { Opcao } from '../models/opcao';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OpcaoService {

  //private opcoes: Opcao[] = []

  constructor(private http: HttpClient){}
  

  getOpcoes(): Observable<any>{
    const url = `${environment.api}/opcoes`;
    return this.http.get<any>(url);
  }

  //getOpcao(id:string): Opcao | undefined {
  //  return this.opcoes.find(o => o.id === id);
 // }

  addOpcao(Opcao: Opcao){
    const url = `${environment.api}/opcoes`;
    
    const body = { 
      idCorretor : "658b5a96-9f28-4e45-b7e7-1c1fa9c52646",
      tipo : Opcao.tipo,
      valor : Opcao.valor,
      area : Opcao.area,
        endereco: {
            cep: Opcao.endereco.cep,
            pais: Opcao.endereco.pais,
            estado: Opcao.endereco.estado,
            cidade: Opcao.endereco.cidade,
            bairro: Opcao.endereco.bairro,
            rua: Opcao.endereco.rua,
            numero: Opcao.endereco.numero,
            complemento: Opcao.endereco.complemento
          },
        nome: Opcao.nomeOpcao,
        quarto: Opcao.quarto,
        suite: Opcao.suite,
        banheiro: Opcao.banheiro,
        vagaGaragem: Opcao.vagaGaragem,
        sala: Opcao.sala,
        cozinha: Opcao.cozinha,
        dependencia: Opcao.dependencia,
        varanda: Opcao.varanda,
        areaServico: Opcao.areaServico,
        andar : Opcao.andar
      };
  
  return this.http.post(url, body);
  }

  deleteOpcao(id: string): Observable<any>{
    const url = `${environment.api}/opcoes/${id}`;
    return this.http.delete(url);
  }

  updateOpcao(updateOpcao: Opcao): void{
   // let index = this.opcoes.findIndex(o => o.id === updateOpcao.id);
  //  this.opcoes[index] = updateOpcao;
  //  localStorage.setItem("opcoes", JSON.stringify(this.opcoes));
  }
}
