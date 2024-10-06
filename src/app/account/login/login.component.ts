import { afterNextRender, Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AccountService } from '../accountService';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
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

  token: string = ""

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
}

