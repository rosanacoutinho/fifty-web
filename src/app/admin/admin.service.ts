import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserDataService } from "../account/user-data.service";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })

  export class AdminService {
  
    constructor(private http: HttpClient
    ) { }

    getSolicitacoesSenha(): Observable<any>{
        const url = `${environment.api}/admin/solicitacoes-senha`;   
        return this.http.get<any>(url);
      }

      geraSenhaProvisoria(creci: string): Observable<any>{
        const body = { creci: creci, siglaEstado: ""};
        const url = `${environment.api}/admin/senha-provisoria`;   
        return this.http.put<any>(url, body);
      }

      resolveSolicitacao(id: string): Observable<any>{
        const url = `${environment.api}/admin/resolver-solicitacao/${id}`;   
        return this.http.put<any>(url, null, { responseType: 'text' as 'json'});
      }


}