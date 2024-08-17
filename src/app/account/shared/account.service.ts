import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }
 
  creciValido: boolean = false;

  login(user: any) {

   const url = `${environment.api}/senhas/validar`;
   const body = { creci: user.creci,
                  senha: user.password
    };

   this.http.post(url, body).subscribe(response => { console.log(response); });

  }

  
  verificaCreci(creci : string){
    console.log(creci)
    //const result = this.http.post<any>(`${environment.api}/corretores/creci/${creci}`,null).toPromise();
    //account.nome = 'Rosana Coutinho'
    //account.creci = '96644' 
    return true;


  }

  createAccount(account: any) {
    return true;
  }


 
}
