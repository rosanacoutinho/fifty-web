import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Perfil } from '../models/perfil';
import { PerfilService } from '../perfil/perfil.service';
import { Endereco } from '../models/endereco';
import { UserDataService } from '../account/create-account/user-data.service';

@Component({
  selector: 'app-perfil-form',
  templateUrl: './perfil-form.component.html',
  styleUrls: ['./perfil-form.component.css']
})
export class PerfilFormComponent implements OnInit{

 id_corretor=''

 perfil: Perfil = {
  id:'' ,
  idCorretor: '',
  nomePerfil: '',
  tipo: '',
  valorMinimo: 0,
  valorMaximo: 0,
  areaMinima: 0,
  areaMaxima:0,
  quantidadeVagaMinima: 0, 
	quantidadeQuartoMinimo: 0, 
	quantidadeBanheiroMinimo: 0, 
	varanda: 0,
  enderecos: []}

 isEditing: boolean = false;

 constructor(
  private formbuilder: FormBuilder,
  private perfilService: PerfilService,
  private router: Router,
  private route: ActivatedRoute,
  private userDataService: UserDataService){ }

 
 ngOnInit(): void {

    this.userDataService.currentData.subscribe(user => this.id_corretor = user.id);

    this.perfil.enderecos[0] =
    {
    id:'',
    cep: '',
    pais: '',
    estado: '',
    cidade: '',
    bairro: '',
    rua: '',
    numero: 0,
    complemento: ''
  }

  //falta ajeitar aqui a parte q diz se ta editando ou 
  //adicionando, desculpa a caca, mo! Te amo.
  this.isEditing = false;

    this.route.paramMap.subscribe({
    next: (response) => {
    //const id = response.get('id');
    //if(id){
      
      this.perfilService.getPerfil(this.id_corretor).subscribe({
        next: (response) => {this.perfil = response,
          console.log(this.perfil)
        },
        error: (err) => console.error("Erro ao carregar perfil", err)
      })
    //} else{
    //}
  }});
  }

  adicionarEndereco(){
    const i = this.perfil.enderecos.length
    this.perfil.enderecos[i] =
      {
      id:'',
      cep: '',
      pais: '',
      estado: '',
      cidade: '',
      bairro: '',
      rua: '',
      numero: 0,
      complemento: ''
    }
  }


 onSubmit(){

  if(this.isEditing){
    console.log('ENTROU NA EDICAO')
    this.perfilService.updatePerfil(this.perfil)
    .subscribe({
      next: () => {
        this.router.navigate(['/listaperfil']);
      },
      error: (err) => {
        console.error(err);
      }
    });}
    else{   
      console.log('NTROU NA INCLUSAO') 
      this.perfil.idCorretor = this.id_corretor
      this.perfilService.addPerfil(this.perfil).subscribe({
      next: () => { this.router.navigate(['/listaperfil'])},
      error: (err) =>{
        console.error(err);
      }
    });}
}
}