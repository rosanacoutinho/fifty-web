import { Component, OnInit } from '@angular/core';
import { Corretor } from '../models/corretor';
import { ActivatedRoute, Router } from '@angular/router';
import { CorretorService } from '../corretor/corretor.service';
import { OpcaoService } from '../opcao/opcao.service';
import { PerfilService } from '../perfil/perfil.service';
import { Opcao } from '../models/opcao';
import { Perfil } from '../models/perfil';
import { DomSanitizer } from '@angular/platform-browser';

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
    private perfilService: PerfilService,
    private sanitizer: DomSanitizer) { }

  corretor: Corretor = { id:'', nome:'', email:'',telefone:0, instagram: '', site: '', frase: '', creci: '', foto: [0]}
  opcoes: Opcao[] = []
  perfis: Perfil[] = []
  imagemUrl: any;

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (response) => {
      const creci = response.get('creci')
      if(creci){
        console.log("if creci")
        this.corretorService.getCorretor(creci).subscribe({
          next: (response) => {this.corretor = response, console.log(response) },
          error: (err) => console.error("Erro ao carregar corretor", err)
        }),
        console.log(this.corretor.id),
        this.opcaoService.getOpcoes(this.corretor.id).subscribe({
          next: (response) => {this.opcoes = response, console.log(response)},
          error: (err) => console.error("Erro ao carregar opcoes", err)
        }),
        this.perfilService.getPerfis(this.corretor.id).subscribe({
          next: (response) => {this.perfis = response, console.log(response)},
          error: (err) => console.error("Erro ao carregar perfis", err)
        })
      } 
    }});

    this.corretorService.getFoto(this.corretor.creci).subscribe((data) => {
      this.imagemUrl = this.sanitizer.bypassSecurityTrustUrl(`data:image/jpeg;base64,${data.imagem}`);
    });
  }

  voltar(){
    this.router.navigate(['/parceiros'])
  }
}
