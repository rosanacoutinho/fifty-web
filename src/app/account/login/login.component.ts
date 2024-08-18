import { Component, OnInit } from '@angular/core';
import { AccountService } from '../shared/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login = {
    creci: '',
    password: ''
  };

  constructor(
    private accountService: AccountService,
    private router : Router
  ) { }



  ngOnInit(): void {
  }

  onSubmit(){
     try{
      const result =  this.accountService.login(this.login);
      console.log(result)
      //console.log("Login efetuado:");
      //console.log(result);//os dados do usuario nao estao volta do pra ca! 
      //navego para a rota vazia novamente
      this.router.navigate(['']);
    } catch (error) {
       console.error(error);
     }
  }
}
