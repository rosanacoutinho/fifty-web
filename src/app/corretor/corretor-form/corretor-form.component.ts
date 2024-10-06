import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Corretor } from '../../models/corretor';
import { Opcao } from '../../models/opcao';
import { Perfil } from '../../models/perfil';
import { CorretorService } from '../corretor.service';
import { PerfilService } from '../../perfil/perfil.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-corretor-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './corretor-form.component.html',
  styleUrl: './corretor-form.component.css'
})
export class CorretorFormComponent {

  constructor(
    private perfilService: PerfilService,
    private corretorService: CorretorService,
    private route: ActivatedRoute
  ) { }

  corretor: Corretor = { id:'', nome:'', email:'',telefone:0, instagram: '', site: '', frase: '', creci: '', urlPhoto:''}
  opcoes: Opcao[] = []
  perfis: Perfil[] = []

  onSubmit(){}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (response) => {
      const creci = response.get('creci')
      if(creci){
        this.corretorService.getCorretor(creci).subscribe({
          next: (response) => {this.corretor = response ,
            console.log(this.corretor)
          },
          error: (err: any) => console.error("Erro ao carregar usuário", err)
        })
      } else{
      }
    }});
  }
}


