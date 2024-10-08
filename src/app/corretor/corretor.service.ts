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

  updatePhotoCorretor( creci : string,  photo : File): Observable<any>{
    const formData: FormData = new FormData();
    formData.append('file', photo , photo.name );
    formData.append('creci', creci  );
   
      const url =`${environment.api}/photos/corretor`;

    return  this.http.post<any>(url, formData );
  }

  //let imagem: HTMLImageElement = new Image();
// imagem.src = "caminho/para/sua/imagem.jpg"

  
  updateCorretor(corretor: Corretor): Observable<any>{    
    const url =`${environment.api}/corretores`;
    return this.http.put<Corretor>(url, corretor);
  }

}
