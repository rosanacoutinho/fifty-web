import { Component, OnInit } from '@angular/core';
import { AccountService } from '../shared/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  account = {
    id:'',
    creci: '',
    nome: '',
    telefone: '',
    email: '',
    senha: ''
  };

  creciValido: boolean = false;

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
   
  }

  verificaCreci(  ){
     //this.accountService.verificaCreci( this.account.creci ).subscribe(response => { 
     // this.creciValido = true;
     //  this.account.creci=response.creci
     //  this.account.nome= response.nome
     //}, error => {
     //  console.error('Erro:', error);
     //  alert("Ops! Algo deu errado" )
     //});
  
      this.creciValido = true;
      this.account.creci='96644'
      this.account.nome= 'ROSANA DE PAULA COUTINHO BARROS'
    return true;
  }


   onSubmit() {
      this.accountService.createAccount(this.account).subscribe(response => {
        alert("Usuário cadastrado com sucesso!" ),
        this.router.navigate(['/login']);     
        }, error => {
          console.error(error);
          alert("Este usuario ja esta cadastrado" )
        });   
      }
}
