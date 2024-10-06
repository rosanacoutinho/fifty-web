import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Perfil } from '../../models/perfil';
import { PerfilService } from '../perfil.service';
import { UserDataService } from '../../account/user-data.service';
import { PerfilMatch } from '../../models/perfilMatch';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil-list',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './perfil-list.component.html',
  styleUrls: ['./perfil-list.component.css']
})
export class PerfilListComponent implements OnInit {

 perfis: Perfil[] = [];
 matches: PerfilMatch[] = [];


 id_corretor=''

 constructor(
   private perfilService: PerfilService,
   private router: Router,
   private userDataService: UserDataService){}

 ngOnInit(): void {
  this.userDataService.currentData.subscribe((user: { id: string; }) => this.id_corretor = user.id);
  this.buscarPerfis(this.id_corretor);
}

  deletePerfil(id: string): void {
    this.perfilService.deletePerfil(id).subscribe({
      next: () => {
        console.log(`Item com ID ${id} deletado com sucesso`);
        alert("Perfil excuído com sucesso!");
        this.buscarPerfis(this.id_corretor);
      },
      error: (err) => {
        console.error('Erro ao deletar item:', err);
      },
      complete: () => {
        console.log('Requisição de deleção completa');
      }
  });
}

  buscarPerfis(id_corretor: string):void{
    this.perfilService.getPerfis(this.id_corretor).subscribe({
      next: (response) => {
        this.perfis = response;
      },
      error: (err) => {
        console.error('Erro ao obter dados:', err);
      },
      complete: () => {        
        this.perfis.forEach(perfil => { 
            this.buscaQuantidadeMatchings(perfil)
        });
      }
  });
}

  buscaQuantidadeMatchings(perfil: Perfil): any{
    this.perfilService.getPerfisMatch(perfil.id).subscribe({
      next: (response) => {
        this.matches = response;
        perfil.numeroMatchings = response.length
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
