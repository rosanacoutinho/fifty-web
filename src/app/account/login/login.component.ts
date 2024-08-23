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
    password: ''
  };

 

  constructor(
    private accountService: AccountService,
    private router : Router,
    private userDataService: UserDataService
  ) { }

 
  ngOnInit(): void {
   this.userDataService.currentData.subscribe(user => this.user = user);
  }

  onSubmit(){
    const result =  this.accountService.login(this.user).subscribe({
      next: (response) => { this.user= response,
        console.log(this.user),
        this.userDataService.changeData(response);
        this.router.navigate(['/home']);
       }, 
      error: (err) => {
      console.error(err);
      alert("Usuário não cadastrado" );}
    }); 
  }
}
