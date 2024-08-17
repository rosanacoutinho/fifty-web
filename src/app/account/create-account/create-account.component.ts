import { Component, OnInit } from '@angular/core';
import { AccountService } from '../shared/account.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  account = {
    creci: '',
    nome: '',
    celular: '',
    email: '',
    password: ''
  };

  creciValido: boolean = false;

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
   
  }

  verificaCreci(){
    this.accountService.verificaCreci( this.account.creci ) ; 
    this.creciValido = true;
    this.account.creci='99664'
    this.account.nome= 'ROSANA DE PAULA COUTINNHO BARROS'
    return true;
    
  }

   onSubmit() {
    try {
      const result =  this.accountService.createAccount(this.account);
      // exibir uma msg amigavel aqui
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

}
