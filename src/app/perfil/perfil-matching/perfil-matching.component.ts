import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PerfilService } from '../perfil.service';
import { PerfilMatch } from '../../models/perfilMatch';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-perfil-matching',
  standalone: true,
  templateUrl: './perfil-matching.component.html',
  imports: [CommonModule, FormsModule, RouterLink],
  styleUrls: ['./perfil-matching.component.css']
})
export class PerfilMatchingComponent implements OnInit {

  constructor(
    private perfilService: PerfilService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  matches: PerfilMatch[] = [] 
  
  id_corretor= ''

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (response) => {
      const id_perfil = response.get('id_perfil');
      if(id_perfil){
      this.perfilService.getPerfisMatch(id_perfil).subscribe({
          next: (response: PerfilMatch[]) => {this.matches = response
            console.log(this.matches)
          },
          error: (err: any) => console.error("Erro ao carregar perfil", err)
        })
      }
    }
  })};

  voltar(){
    this.router.navigate(['/listaperfil'])
  }

  abrirLinkVitrine(idOpcao : string) {
    const url = `http://localhost:4200/vitrine/${idOpcao}`;
    window.open(url, '_blank');
  } 
  
}
