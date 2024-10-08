import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Corretor } from '../../models/corretor';
import { Opcao } from '../../models/opcao';
import { Perfil } from '../../models/perfil';
import { OpcaoService } from '../../opcao/opcao.service';
import { PerfilService } from '../../perfil/perfil.service';
import { CorretorService } from '../corretor.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-corretor-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './corretor-perfil.component.html',
  styleUrl: './corretor-perfil.component.css'
})
export class CorretorPerfilComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute,
    private corretorService: CorretorService,
    private opcaoService: OpcaoService,
    private perfilService: PerfilService,
    private sanitizer: DomSanitizer) { }

  corretor: Corretor = { id:'', nome:'', email:'',telefone:0, instagram: '', site: '', frase: '', creci: '', urlPhoto:''}
  opcoes: Opcao[] = []
  perfis: Perfil[] = []
  imagemUrl: any;

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (response) => {
      const creci = response.get('creci')
      if(creci){
        this.corretorService.getCorretor(creci).subscribe({
          next: (response: any) => {this.corretor = response, console.log(response) },
          error: (err: any) => console.error("Erro ao carregar corretor", err)
        }),
        this.opcaoService.getOpcoes(this.corretor.id).subscribe({
          next: (response: Opcao[]) => {this.opcoes = response, console.log(response)},
          error: (err: any) => console.error("Erro ao carregar opcoes", err)
        }),
        this.perfilService.getPerfis(this.corretor.id).subscribe({
          next: (response: Perfil[]) => {this.perfis = response, console.log(response)},
          error: (err: any) => console.error("Erro ao carregar perfis", err)
        })
      } 
    }});
  }

  voltar(){
    this.router.navigate(['/parceiros'])
  }
}
