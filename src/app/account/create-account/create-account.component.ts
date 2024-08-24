import { Component, OnInit } from '@angular/core';
import { AccountService } from '../shared/account.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  isEditing: boolean = false;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (response) => {
      const id = response.get('id')
      console.log(id)
      if(id){
        console.log(this.isEditing)
        this.creciValido = true,
        this.isEditing = true,
        this.accountService.getAccount(id).subscribe({
          next: (response) => {this.account = response },
          error: (err) => console.error("Erro ao carregar usuário", err)
        })
      } else{
      }
    }});
   
  }

  verificaCreci(  ){
     this.accountService.verificaCreci( this.account.creci ).subscribe(response => { 
     this.creciValido = true;
      this.account.creci=response.creci
      this.account.nome= response.nome
     }, error => {
      console.error('Erro:', error);
      alert("Ops! Algo deu errado" )
     });
  
      // this.creciValido = true;
      // this.account.creci='96644'
      // this.account.nome= 'ROSANA DE PAULA COUTINHO BARROS'
    return true;
  }


   onSubmit() {
    if(this.isEditing){
      this.accountService.updateAccount(this.account) //no back, update Corretor nao manda a senha. Ta certo assim?
      .subscribe({
        next: () => {
          alert("Dados atualizados com sucesso!")
        },
        error: (err) => {
          console.error(err);
        }
      });}
    else{
      this.accountService.createAccount(this.account).subscribe(response => {
        alert("Usuário cadastrado com sucesso!" ),
        this.router.navigate(['/login']);     
        }, error => {
          console.log(this.account)
          console.error(error);
          alert("Este usuario ja esta cadastrado" )
        });   
      }
    }
      
}
