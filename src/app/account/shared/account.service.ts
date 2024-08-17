import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  async login(user: any) {

   const url = `${environment.api}/senhas/validar`;
   const body = { creci: user.creci ,
                  senha: user.password
    };

   this.http.post(url, body).subscribe(response => {
     console.log(response);
   });

    return false;
  }

  async login2(user: any) {
    const result = await this.http.post<any>(`${environment.api}/auth/login`, user).toPromise(); // Colocar url 
    if (result && result.access_token) {
      window.localStorage.setItem('token', result.access_token);
      return true;
    }

    return false;
  }

  async createAccount(account: any) {
    const result = await this.http.post<any>(`${environment.api}/users`, account).toPromise();
    return result;
  }

  getAuthorizationToken() {
    const token = window.localStorage.getItem('token');
    return token;
  }
}
