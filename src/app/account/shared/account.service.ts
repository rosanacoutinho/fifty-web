import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserDataService } from '../create-account/user-data.service';
import { jwtDecode } from "jwt-decode";



@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient,
    private userDataService: UserDataService
  ) { }
 
  creciValido: boolean = false;

  async login(user: any) {
    try{
      const body = { creci: user.creci, senha: user.senha};
      const result = await this.http.post<any>(`${environment.api}/auth/login`, body).toPromise();
    if (result && result.token){
      this.getAccount(user.creci).subscribe({
        next: (response) => {
          window.localStorage.setItem('nome', response.nome);
          window.localStorage.setItem('id', response.id);
          user.nome = response.nome,
          user.id = response.id
          console.log(user)
        },
        error: (err) => console.error("Erro ao carregar usuario", err)
      })
      this.userDataService.changeData(user);
      window.localStorage.setItem('token', result.token);
      
      return true;
    }
    } catch (err){
      console.log(err)
    }
    
    
    return false;
  }


  verificaCreci(creci : string) : Observable<any> {
    const result = this.http.post<any>(`${environment.api}/corretores/creci/${creci}`,null);
    return result;
  }

  async createAccount(user: User) {
    const url = `${environment.api}/corretores`;   
    return await this.http.post<any>(url, user).toPromise();
  }

  getAccount(creci:string): Observable<any>{
    const url = `${environment.api}/corretores/${creci}`;
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
    const decoded: any = jwtDecode(token);
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

