import { afterNextRender, Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AccountService } from '../accountService';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  user = {
    id:'',
    creci: '',
    nome : '', 
    senha: '',
    tokem:''
  };

  creci_: string = ""
  token: string = ""
  responseText: string = ""

  constructor(
    private accountService: AccountService,
    private router : Router,
  ) { }

 
  ngOnInit(): void {

  }

  async onSubmit(){
    try {
      const result = await this.accountService.login(this.user);
      this.router.navigate(['home']);
    } catch (error) {
      alert("Usuário não cadastrado" );
      //console.error(error);
    }
  }

  close(){
    this.creci_=""
    this.responseText = ""
  }

  solicitarSenha(creci: string){
    this.accountService.forgotPassword(creci).subscribe({
      next: (response) => {
        this.responseText = response;
      },
      error: (err: any) => {
        console.error(err),
        alert("Ocorreu um erro ao solicitar nova senha");
      }
    });
  }
}

