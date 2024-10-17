import { Component } from '@angular/core';
import { AccountService } from '../account/accountService';
import { Ajuda } from '../models/ajuda';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
    private location: Location
  ) { }

  ajuda: Ajuda = {email:'', assunto:'', descricao:''}

  async onSubmit(){
    try {
      //const result = await this.accountService.login(this.user);
    } catch (error) {
      alert("Ocorreu um erro ao enviar solicitação" );
      //console.error(error);
    }
  }

  voltar(): void {
    this.location.back();
  }
}
