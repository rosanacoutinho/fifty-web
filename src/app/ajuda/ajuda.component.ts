import { Component } from '@angular/core';
import { AccountService } from '../account/accountService';
import { Ajuda } from '../models/ajuda';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserDataService } from '../account/user-data.service';

@Component({
  selector: 'app-ajuda',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ajuda.component.html',
  styleUrl: './ajuda.component.css'
})
export class AjudaComponent {

  constructor(
    private accountService: AccountService,
    private location: Location,
    private userDataService: UserDataService
  ) { }

  ajuda: Ajuda = {creci: '', nome:'', email:'', telefone:'', mensagem:''}
  mensagemResposta : string = ''
  usuarioLogado : boolean = false 

  ngOnInit(): void {
    this.userDataService.currentData.subscribe((user) => {
      this.ajuda.creci = user.creci,
      this.ajuda.nome = user.nome
    });
    if (this.ajuda.creci) {
      this.usuarioLogado = true
    }
  }  

  async onSubmit(){
      this.accountService.askForHelp(this.ajuda).subscribe({
        next: (response) => {
          console.log(response)
          this.ajuda = {creci: '', nome:'', email:'', telefone:'', mensagem:''}
          this.mensagemResposta = response.message
        },
        error: (err: any) => {
          console.error(err),
          this.mensagemResposta = err.error.message
        }
      });
  }

  voltar(): void {
    this.location.back();
  }
}
