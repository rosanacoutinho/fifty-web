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
  tipo: 'APARTAMENTO',
  valorMinimo: 0,
  valorMaximo: 0,
  areaMinima: 0,
  areaMaxima:0,
  quantidadeVagaMinima: 0, 
	quantidadeQuartoMinimo: 0, 
  quantidadeSuiteMinima: 0, 
	quantidadeBanheiroMinimo: 0, 
	varanda: false,
  valorMaximoIptu: 0,
  valorMaximoCondominio: 0,
  enderecos: []}

 isEditing: boolean = false;

 constructor(
  private formbuilder: FormBuilder,
  private perfilService: PerfilService,
  private router: Router,
  private route: ActivatedRoute,
  private userDataService: UserDataService){ }

 
 ngOnInit(): void {
    //obter o id do corretor via servico
    this.userDataService.currentData.subscribe(user => this.id_corretor = user.id);

    //carregar estados para tela  (em construcao)
    this.perfilService.getEstadosBrasileiros().subscribe({
      next: (response) => {console.log(response) },
      error: (err) => console.error("Erro ao carregar estados", err)
    })

    //adicionando um endereco vazio ao array do Perfil 
    this.adicionarEndereco()

    this.route.paramMap.subscribe({
    next: (response) => {
    const id = response.get('id');
    if(id){
      this.isEditing = true;
      this.perfilService.getPerfil(id).subscribe({
        next: (response) => {this.perfil = response },
        error: (err) => console.error("Erro ao carregar perfil", err)
      })
    } else{
    }
  }});
  }

  adicionarEndereco(){
    const i = this.perfil.enderecos.length
    this.perfil.enderecos[i] =
      {
      id:'',
      cep: '',
      pais: 'Brasil',
      estado: 'RJ',
      cidade: 'Rio de Janeiro',
      bairro: '',
      rua: '',
      numero: '',
      complemento: ''
    }
  }

  removeEndereco(){
    if (this.perfil.enderecos.length > 1){  
    this.perfil.enderecos.pop()
    }
  }


 onSubmit(){

  if(this.isEditing){
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
      this.perfil.idCorretor = this.id_corretor
      this.perfilService.addPerfil(this.perfil).subscribe({
      next: () => { this.router.navigate(['/listaperfil'])},
      error: (err) =>{
        console.error(err);
      }
    });}
}

voltar(){
  this.router.navigate(['/listaperfil'])
}

setTipoImoveis(tipo : string){
  this.perfil.tipo = tipo
}
}