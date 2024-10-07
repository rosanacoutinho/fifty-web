import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Corretor } from '../models/corretor';


@Injectable({
  providedIn: 'root'
})
export class CorretorService {
  
  constructor(private http: HttpClient){}

  getCorretores(): Observable<any>{
    const url = `${environment.api}/corretores`;
    return this.http.get<any>(url);
  }

  getCorretor(creci:string): Observable<any>{
    const url = `${environment.api}/corretores/${creci}`;
    return this.http.get<any>(url);
  }

  getFoto(creci: string): Observable<any>{
    const url =`${environment.api}/foto/${creci}`;
    return this.http.get<{ imagem: string }>(url);
  }
  
  updateCorretor(corretor: Corretor): Observable<any>{      //validar endpoint e parametros corretos
    const url =`${environment.api}/corretor/${corretor}`;
    return this.http.put<{ imagem: string }>(url, corretor);
  }

}
