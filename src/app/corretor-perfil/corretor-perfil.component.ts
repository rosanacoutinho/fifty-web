import { Component, OnInit } from '@angular/core';
import { Corretor } from '../models/corretor';
import { ActivatedRoute, Router } from '@angular/router';
import { CorretorService } from '../corretor/corretor.service';
import { OpcaoService } from '../opcao/opcao.service';
import { PerfilService } from '../perfil/perfil.service';
import { Opcao } from '../models/opcao';
import { Perfil } from '../models/perfil';

@Component({
  selector: 'app-corretor',
  templateUrl: './corretor-perfil.component.html',
  styleUrls: ['./corretor-perfil.component.css']
})
export class CorretorPerfilComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute,
    private corretorService: CorretorService,
    private opcaoService: OpcaoService,
    private perfilService: PerfilService) { }

  corretor: Corretor = { id:"", nome:"", email:"", telefone:0 }
  opcoes: Opcao[] = []
  perfis: Perfil[] = []

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (response) => {
      const id_corretor = response.get('id_corretor')
      if(id_corretor){
        this.corretorService.getCorretor(id_corretor).subscribe({
          next: (response) => {this.corretor = response, console.log(response) },
          error: (err) => console.error("Erro ao carregar corretor", err)
        }),
        this.opcaoService.getOpcoes(id_corretor).subscribe({
          next: (response) => {this.opcoes = response, console.log(response)},
          error: (err) => console.error("Erro ao carregar opcoes", err)
        }),
        this.perfilService.getPerfis(id_corretor).subscribe({
          next: (response) => {this.perfis = response, console.log(response)},
          error: (err) => console.error("Erro ao carregar perfis", err)
        })
      } 
    }});
  }

  voltar(){
    this.router.navigate(['/parceiros'])
  }
}
