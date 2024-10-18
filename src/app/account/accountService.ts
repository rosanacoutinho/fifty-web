import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { UserDataService } from './user-data.service';
import { jwtDecode } from 'jwt-decode';
import { Mensagem } from '../models/mensagem';
import { Ajuda } from '../models/ajuda';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient,
    private userDataService: UserDataService
  ) { }
 
  creciValido: boolean = false;
  token: string = "";    
  mensagem: Mensagem = {sucesso: false, detalhe:""}
  error: string = ""

  async login(user: any) {
    try{
      const body = { creci: user.creci, senha: user.senha};
      const result = await this.http.post<any>(`${environment.api}/auth/login`, body).toPromise();

    if (result) {
      if (result.token){  
        user.token = result.token
        this.userDataService.changeData(user);
        this.getAccount(user.creci).subscribe({
          next: (response) => {
            user.nome = response.nome,
            user.id = response.id,
            this.userDataService.changeData(user);
          },
          error: (err) => console.error("Erro ao carregar usuario", err)
        })
        this.mensagem.sucesso = true;
      }
    }
    } catch (err){
      const erro = (err as Error).message ? (err as Error).message : (err as string)
      this.mensagem.detalhe = erro.replace(/["']/g, '');
    }
    return this.mensagem;
  }

//ESTE METODO NAO PRECISA ESTAR LOGADO
  verificaCreci(creci : string, siglaEstado: string) : Observable<any> {
    const body = { creci: creci, siglaEstado: siglaEstado};
    const url = `${environment.api}/auth/creci`;
    console.log(url)
    console.log(body)
    const result = this.http.post<any>(url, body);
    return result;
  }

  async createAccount(user: User) {
    try {
      const url = `${environment.api}/auth/register`;   
      const result = await this.http.post<any>(url, user).toPromise();
      if (result && result.message)
        this.mensagem.sucesso = true
    } catch (err){
      const erro = (err as Error).message ? (err as Error).message : (err as string)
      this.mensagem.detalhe = erro.replace(/["']/g, '');
    }
    return this.mensagem;    
  }

  forgotPassword(creci: string): Observable<any>{  
    const body = { creci: creci, siglaEstado: ""};
    const url = `${environment.api}/auth/forgot-password`;   
    return this.http.post<any>(url, body );
  }

  changePassword(oldPassword: string, newPassword: string): Observable<any>{  
    const body = { oldPassword: oldPassword, newPassword: newPassword};
    const url = `${environment.api}/auth/change-password`;   
    return this.http.post<any>(url, body);
  }

  askForHelp(ajuda:Ajuda){
    const url = `${environment.api}/auth/help`;   
    return this.http.post<any>(url, ajuda );
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
    this.userDataService.currentData.subscribe(user => {
      this.token = user.token
    });
    if(this.token){
      
      return this.token;
    }
    return null;
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
