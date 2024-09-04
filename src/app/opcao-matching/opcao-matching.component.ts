import { Component, OnInit } from '@angular/core';
import { OpcaoMatch } from '../models/opcaoMatch';
import { UserDataService } from '../account/create-account/user-data.service';
import { OpcaoService } from '../opcao/opcao.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-opcao-matching',
  templateUrl: './opcao-matching.component.html',
  styleUrls: ['./opcao-matching.component.css']
})
export class OpcaoMatchingComponent implements OnInit {

  constructor(
    private opcaoService: OpcaoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  matches: OpcaoMatch[] = [] 
  
  id_corretor= ''

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (response) => {
      const id_opcao = response.get('id_opcao');
      if(id_opcao){
        this.opcaoService.getOpcoesMatch(id_opcao).subscribe({
          next: (response) => this.matches = response,
          error: (err) => console.error("Erro ao carregar opção", err)
        })
      }
    }
  })};

  voltar(){
    this.router.navigate(['/listaopcao'])
  }

}
