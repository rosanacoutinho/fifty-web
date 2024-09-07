import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccountService } from '../shared/account.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserDataService } from '../create-account/user-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = {
    id:'',
    creci: '',
    nome : '', 
    senha: ''
  };

 

  constructor(
    private accountService: AccountService,
    private router : Router,
    private userDataService: UserDataService
  ) { }

 
  ngOnInit(): void {

  }

  async onSubmit(){
    try {
      const result = await this.accountService.login(this.user);
      console.log("resultado" + result)
      this.router.navigate(['home']);
    } catch (error) {
      alert("Usuário não cadastrado" );
      //console.error(error);
    }
  }
}
