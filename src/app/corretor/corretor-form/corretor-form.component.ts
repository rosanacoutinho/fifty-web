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
    private route: ActivatedRoute,
  ) { }


  photo: File = new File(["conteúdo do arquivo"], "nome_do_arquivo.jpg", { type: "image/jpeg" });

  corretor: Corretor = { id:'', nome:'', email:'',telefone:0, instagram: '', site: '', frase: '', creci: '', urlPhoto:''}
  opcoes: Opcao[] = []
  perfis: Perfil[] = []


  updateCorretor(){
    this.corretorService.updateCorretor(this.corretor)
    .subscribe({
      next: () => {
        alert("Dados atualizados com sucesso!")
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  updatePhotoCorretor(){
    this.corretorService.updatePhotoCorretor( this.corretor.creci , this.photo ).subscribe({
      next: () => {
        alert("Foto atualizada com sucesso!")
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  onSubmit(){
  }

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

  
  onFileSelected(event: any): void {
    this.photo =  event.target.files[0];
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader()
      reader.onload = (e:any) => {
        this.corretor.urlPhoto = e.target?.result;
      };
      reader.readAsDataURL(file);
    }
  }
}


