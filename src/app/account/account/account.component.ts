import { Component } from '@angular/core';
import { AccountService } from '../accountService';
import { UserDataService } from '../user-data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {

 responseText: string = ""
 creci: string = ""
 senhaNova: string = ""
 senhaAtual: string = ""
 confirmaSenha: string = ""

 constructor(
  private accountService: AccountService,
  private userDataService: UserDataService
) { }

close(){
  this.responseText =""
}

 trocarSenha(){
  if (this.senhaNova != this.confirmaSenha){
    this.responseText = "As senhas informadas não correspondem"
  }
  else {
    this.userDataService.currentData.subscribe((user) => this.creci = user.creci);
    this.accountService.changePassword(this.senhaAtual, this.senhaNova).subscribe({
      next: (response) => {
        this.responseText = response,
        this.senhaNova ="",
        this.confirmaSenha ="",
        this.senhaAtual =""
      },
      error: (err: any) => {
        console.error(err),
        alert("Ocorreu um erro ao trocar a senha");
      }
    });
  }
}


}


