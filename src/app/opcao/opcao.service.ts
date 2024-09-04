import { Injectable } from '@angular/core';
import { Opcao } from '../models/opcao';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpcaoService {
  
  constructor(private http: HttpClient){}

  getOpcoes(id_corretor:string): Observable<any>{
    const url = `${environment.api}/opcoes/corretor/${id_corretor}`;
    return this.http.get<any>(url);
  }

  getOpcao(id:string): Observable<any>{
    const url = `${environment.api}/opcoes/${id}`;
    return this.http.get<any>(url);
  }

  addOpcao(opcao: Opcao) : Observable<any>{
    const url = `${environment.api}/opcoes`;
  return this.http.post(url, opcao);
  }

  deleteOpcao(id: string): Observable<any>{
    const url = `${environment.api}/opcoes/${id}`;
    return this.http.delete(url);
  }

  updateOpcao(opcao: Opcao): Observable<Opcao> {
    const url = `${environment.api}/opcoes`;
    return this.http.put<Opcao>(url, opcao);
  }

  getOpcoesMatch(id_opcao: string): Observable<any> {
    const url = `${environment.api}/matching/opcoes/${id_opcao}`;
    return this.http.post<any>(url,null);
  }

  getCEP(cep:string): Observable<any>{
   const url = `https://viacep.com.br/ws/${cep}/json/`;
    return this.http.get<any>(url);
  }

}
