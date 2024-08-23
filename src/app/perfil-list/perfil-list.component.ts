import { Component, OnInit } from '@angular/core';
import { Perfil } from '../models/perfil';
import { Router } from '@angular/router';
import { PerfilService } from '../perfil/perfil.service';
import { UserDataService } from '../account/create-account/user-data.service';

@Component({
  selector: 'app-perfil-list',
  templateUrl: './perfil-list.component.html',
  styleUrls: ['./perfil-list.component.css']
})
export class PerfilListComponent implements OnInit {

 perfis: Perfil[] = [];



 id_corretor=''

 constructor(
   private perfilService: PerfilService,
   private router: Router,
   private userDataService: UserDataService){}

 ngOnInit(): void {
  this.userDataService.currentData.subscribe(user => this.id_corretor = user.id);
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
        console.log(response)
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
