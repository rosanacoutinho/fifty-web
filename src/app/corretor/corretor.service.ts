import { Injectable } from '@angular/core';
import { Perfil } from '../models/perfil';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CorretorService {
  
  constructor(private http: HttpClient){}

  getCorretores(): Observable<any>{
    const url = `${environment.api}/corretores`;
    return this.http.get<any>(url);
  }

  getCorretor(id_corretor:string): Observable<any>{
    const url = `${environment.api}/corretores/${id_corretor}`;
    return this.http.get<any>(url);
  }

  getFoto(creci: string): Observable<any>{
    const url =`${environment.api}/foto/${creci}`;
    return this.http.get<{ imagem: string }>(url);
  }

}
