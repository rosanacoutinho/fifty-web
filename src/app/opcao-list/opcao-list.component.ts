import { Component, OnInit } from '@angular/core';
import { OpcaoService } from '../opcao/opcao.service';
import { Opcao } from '../models/opcao';

@Component({
  selector: 'app-opcao-list',
  templateUrl: './opcao-list.component.html',
  styleUrls: ['./opcao-list.component.css']
})
export class OpcaoListComponent implements OnInit {

 opcoes: Opcao[] = [];

 constructor(private opcaoService: OpcaoService){}

 ngOnInit(): void {
   this.opcoes = this.opcaoService.getOpcoes();
 }

}
