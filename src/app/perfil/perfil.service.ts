import { Injectable } from '@angular/core';
import { Perfil } from '../models/perfil';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  
  constructor(private http: HttpClient){}

  getPerfis(id_corretor:string): Observable<any>{
    const url = `${environment.api}/perfis/corretor/${id_corretor}`;
    return this.http.get<any>(url);
  }

  getPerfil(id:string): Observable<any>{
    const url = `${environment.api}/perfis/${id}`;
    return this.http.get<any>(url);
  }

  addPerfil(perfil: Perfil) : Observable<any>{
    const url = `${environment.api}/perfis`;
  return this.http.post(url, perfil);
  }

  deletePerfil(id: string): Observable<any>{
    const url = `${environment.api}/perfis/${id}`;
    return this.http.delete(url);
  }

  updatePerfil(perfil: Perfil): Observable<Perfil> {
    const url = `${environment.api}/perfis`;
    return this.http.put<Perfil>(url, perfil);
  }

  getPerfisMatch(id_perfil: string): Observable<any> {
    const url = `${environment.api}/matching/perfil/${id_perfil}`;
    return this.http.get<any>(url);
  }


  getEstadosBrasileiros(): Observable<any>{
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados`;
    return this.http.get<any>(url);
  }

  getCidadesPorEstado(siglaEstado:string): Observable<any>{
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${siglaEstado}/municipios`;
    return this.http.get<any>(url);
  }
}
