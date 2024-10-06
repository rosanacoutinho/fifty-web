import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../accountService';
import { Estado } from '../../models/estado';
import { PerfilService } from '../../perfil/perfil.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent implements OnInit {
  account = {
    id:'',
    creci: '',
    nome: '',
    telefone: '',
    email: '',
    senha: '',
    siglaEstado:'',
    token:''
  };

  creciValido: boolean = false;
  isEditing: boolean = false;
  estados: Estado[] = []; 

  constructor(
    private perfilService: PerfilService,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    //carregar estados Brasil 
    this.perfilService.getEstadosBrasileiros().subscribe({
      next: (response: any) => this.estados=response,
      error: (err: any) => console.error("Erro ao carregar estados", err)
    })

    this.route.paramMap.subscribe({
      next: (response) => {
      const creci = response.get('creci')
      if(creci){
        this.creciValido = true,
        this.isEditing = true,
        this.accountService.getAccount(creci).subscribe({
          next: (response: { id: string; creci: string; nome: string; telefone: string; email: string; senha: string; siglaEstado: string; token: string;}) => {this.account = response ,
            console.log(this.account)
          },
          error: (err: any) => console.error("Erro ao carregar usuário", err)
        })
      } else{
      }
    }});
   
  }

  verificaCreci(  ){
    console.log("verificaCreci")
    console.log( this.account)
     this.accountService.verificaCreci( this.account.creci, this.account.siglaEstado ).subscribe({ 
      next: (response: { creci: string; nome: string; }) => {
        if(response){
          console.log("verificacreci subscribe")
        this.creciValido = true;
        this.account.creci=response.creci
        this.account.nome= response.nome
        }
      },
      error: (err: any) => {
      console.error('Erro:', err);
      alert("Ops! Algo deu errado");
     }});
  
      // this.creciValido = true;
      // this.account.creci='96644'
      // this.account.nome= 'ROSANA DE PAULA COUTINHO BARROS'
    return true;
  }


   async onSubmit() {
    if(this.isEditing){
      this.accountService.updateAccount(this.account) //no back, update Corretor nao manda a senha. Ta certo assim?
      .subscribe({
        next: () => {
          alert("Dados atualizados com sucesso!")
        },
        error: (err: any) => {
          console.error(err);
        }
      });}
    else {
      try {
        const result = await this.accountService.createAccount(this.account);
        alert("Usuário cadastrado com sucesso!"); 
      } catch (error){
        console.error(error);
      } 
      }
    }

    setEstado(siglaEstado : string){
      this.account.siglaEstado = siglaEstado
    }
}
