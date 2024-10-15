import { Component, OnInit } from '@angular/core';
import { OpcaoService } from '../opcao.service';
import { Opcao } from '../../models/opcao';
import { Router, RouterLink } from '@angular/router';
import { OpcaoMatch } from '../../models/opcaoMatch';
import { UserDataService } from '../../account/user-data.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-opcao-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
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
   private userDataService: UserDataService
  ){}

 ngOnInit(): void {
  this.userDataService.currentData.subscribe((user: { id: string; }) => this.id_corretor = user.id);
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
      error: (err: any) => {
        console.error('Erro ao deletar item:', err);
      },
      complete: () => {
        console.log('Requisição de deleção completa');
      }
  });
}

buscarOpcoes(id_corretor: string):void{
    this.opcaoService.getOpcoes(this.id_corretor).subscribe({
      next: (response: Opcao[]) => {
        this.opcoes = response;
      },
      error: (err: any) => {
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
      next: (response: any) => {
        this.matches = response;
        opcao.numeroMatchings = response.length
      },
      error: (err: any) => {
        console.error('Erro ao obter dados:', err);
      },
      complete: () => {
        console.log('Requisição completa')
      }
    });
  }


  abrirLinkVitrine(idOpcao : string) {
    const url = `http://localhost:4200/vitrine/${idOpcao}`;
    window.open(url, '_blank');
  } 

  
}
