import { Component, OnInit } from '@angular/core';
import { AccountService } from '../shared/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = {
    idUsuario:'',
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
    const result =  this.accountService.login(this.user).subscribe({
      next: (response) => { this.user.idUsuario = response.id,
                    this.router.navigate(['/home']);
       }, 
      error: (err) => {
      console.error(err);
      alert("Usuário não cadastrado" );}
    }); 
  }
}
