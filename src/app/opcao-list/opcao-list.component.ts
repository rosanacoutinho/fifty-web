import { Component, OnInit } from '@angular/core';
import { OpcaoService } from '../opcao/opcao.service';
import { Opcao } from '../models/opcao';
import { Router } from '@angular/router';
import { UserDataService } from '../account/create-account/user-data.service';
import { OpcaoMatch } from '../models/opcaoMatch';

@Component({
  selector: 'app-opcao-list',
  templateUrl: './opcao-list.component.html',
  styleUrls: ['./opcao-list.component.css']
})
export class OpcaoListComponent implements OnInit {

 opcoes: Opcao[] = [];
 matches: OpcaoMatch[] = [];

 id_corretor= ''

 constructor(
   private opcaoService: OpcaoService,
   private router: Router,
   private userDataService: UserDataService){}

 ngOnInit(): void {
  this.userDataService.currentData.subscribe(user => this.id_corretor = user.id);
  console.log("lista")
  console.log(this.id_corretor)
  this.buscarOpcoes(this.id_corretor);
    
}

  deleteOpcao(id: string): void {
    this.opcaoService.deleteOpcao(id).subscribe({
      next: () => {
        console.log(`Item com ID ${id} deletado com sucesso`);
        alert("Opção excuída com sucesso!");
        this.buscarOpcoes(this.id_corretor);
      },
      error: (err) => {
        console.error('Erro ao deletar item:', err);
      },
      complete: () => {
        console.log('Requisição de deleção completa');
      }
  });
}

buscarOpcoes(id_corretor: string):void{
    this.opcaoService.getOpcoes(this.id_corretor).subscribe({
      next: (response) => {
        this.opcoes = response;
      },
      error: (err) => {
        console.error('Erro ao obter dados:', err);
      },
      complete: () => {        
        this.opcoes.forEach( opcao => { 
          console.log(opcao.nomeOpcao),
            this.buscaQuantidadeMatchings(opcao)
        });

      }
    });
  }

  buscaQuantidadeMatchings(opcao: Opcao): any{
    this.opcaoService.getOpcoesMatch(opcao.id).subscribe({
      next: (response) => {
        this.matches = response;
        opcao.numeroMatchings = response.length
      },
      error: (err) => {
        console.error('Erro ao obter dados:', err);
      },
      complete: () => {
        console.log('Requisição completa')
      }
    });
  }
}
