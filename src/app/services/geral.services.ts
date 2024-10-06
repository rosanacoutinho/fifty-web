import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GeralService {
  
  constructor(private http: HttpClient){}

  getTiposImoveis(): Observable<any>{
    const url = `${environment.api}/tipos/imoveis`;
    return this.http.get<any>(url);
  }

  getTiposNegocios(): Observable<any>{
    const url = `${environment.api}/tipos/negocios`;
    return this.http.get<any>(url);
  }

}
