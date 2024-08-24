import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import * as jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }
 
  creciValido: boolean = false;

  login(user: any) : Observable<any>   {
      const url = `${environment.api}/senhas/validar`;
      const body = { creci: user.creci,
                      senha: user.senha
        };
      
      const result = this.http.post<any>(url, body);
      return result;
  }


  verificaCreci(creci : string) : Observable<any> {
    const result = this.http.post<any>(`${environment.api}/corretores/creci/${creci}`,null);
    return result;
  }

  createAccount(user: User) : Observable<any> {
    const url = `${environment.api}/corretores`;   
    return this.http.post<any>(url, user);
  }

  getAccount(id:string): Observable<any>{
    const url = `${environment.api}/corretores/${id}`;
    return this.http.get<any>(url);
  }
  updateAccount(user: User): Observable<User> {
    const url = `${environment.api}/corretores`;
    return this.http.put<User>(url, user);
  }

  getAuthorizationToken() {
    const token = window.localStorage.getItem('token');
    return token;
  } 

  getTokenExpirationDate(token: string): Date {
    const decoded: any = jwt_decode(token);

    if (decoded.exp === undefined) {
      //return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }

    return !(date.valueOf() > new Date().valueOf());
  }

  isUserLoggedIn() {
    const token = this.getAuthorizationToken();
    if (!token) {
      return false;
    } else if (this.isTokenExpired(token)) {
      return false;
    }

    return true;
  }
}
function jwt_decode(token: string): any {
  throw new Error('Function not implemented.');
}

