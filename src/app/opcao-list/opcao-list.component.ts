import { Component, OnInit } from '@angular/core';
import { OpcaoService } from '../opcao/opcao.service';
import { Opcao } from '../models/opcao';
import { Router } from '@angular/router';

@Component({
  selector: 'app-opcao-list',
  templateUrl: './opcao-list.component.html',
  styleUrls: ['./opcao-list.component.css']
})
export class OpcaoListComponent implements OnInit {

 opcoes: Opcao[] = [];

 constructor(
   private opcaoService: OpcaoService,
   private router: Router){}

 ngOnInit(): void {
  this.buscarOpcoes();
}

  deleteOpcao(id: string): void {
    this.opcaoService.deleteOpcao(id).subscribe({
      next: () => {
        console.log(`Item com ID ${id} deletado com sucesso`);
        alert("Opção excuída com sucesso!");
        this.buscarOpcoes();
      },
      error: (err) => {
        console.error('Erro ao deletar item:', err);
      },
      complete: () => {
        console.log('Requisição de deleção completa');
      }
  });
}

  buscarOpcoes():void{
    this.opcaoService.getOpcoes().subscribe({
      next: (response) => {
        this.opcoes = response;
        console.log(this.opcoes);
      },
      error: (err) => {
        console.error('Erro ao obter dados:', err);
      },
      complete: () => {
        console.log('Requisição completa');
      }
    });
  }

}
