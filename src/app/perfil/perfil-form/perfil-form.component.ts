import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PerfilService } from '../perfil.service';
import { Estado } from '../../models/estado';
import { Cidade } from '../../models/cidade';
import { Perfil } from '../../models/perfil';
import { TipoImovel } from '../../models/tipoImovel';
import { TipoNegocio } from '../../models/tipoNegocio';
import { UserDataService } from '../../account/user-data.service';
import { GeralService } from '../../services/geral.services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-perfil-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil-form.component.html',
  styleUrls: ['./perfil-form.component.css']
})
export class PerfilFormComponent implements OnInit{

 id_corretor=''

 perfil: Perfil = {
  id:'' ,
  codigo:0,
  corretor:{id:'', nome:'', email:'',telefone:0, instagram: '', site: '', frase: '', creci: '', urlPhoto:''},
  nomePerfil: '',
  tipo: 'APARTAMENTO',
  negocio: 'VENDA',    
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
  enderecos: [],
  numeroMatchings: 0
}

 tiposImoveis: TipoImovel[] = []; 
 tiposNegocios: TipoNegocio[] = []; 
 isEditing: boolean = false;
 estados: Estado[] = []; 
 cidades: Cidade[] =[];
 
 constructor(
  private perfilService: PerfilService,
  private router: Router,
  private route: ActivatedRoute,
  private userDataService: UserDataService,
  private geralService : GeralService){ }

 
 ngOnInit(): void {
  const id = window.localStorage.getItem("id");
  if(id)
    this.id_corretor = id;

   //carrega tipo de imoveis 
   this.geralService.getTiposImoveis().subscribe({
    next: (response: any) => this.tiposImoveis = response,
    error: (err: any) => console.error("Erro ao carregar tipos", err)
    })

       //carrega tipo de negocios
       this.geralService.getTiposNegocios().subscribe({
        next: (response: any) => this.tiposNegocios = response,
        error: (err: any) => console.error("Erro ao carregar tipos", err)
      })

    //carregar estados Brasil 
    this.perfilService.getEstadosBrasileiros().subscribe({
      next: (response) => this.estados=response,
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
    this.perfil.corretor = {id:'', nome:'', email:'',telefone:0, instagram: '', site: '', frase: '', creci: '', urlPhoto:''}
    this.perfil.corretor.id = this.id_corretor    
    this.perfilService.updatePerfil(this.perfil)
    .subscribe({
      next: () => {
        console.log("perfil na edição")
        console.log(this.perfil)
        this.router.navigate(['/listaperfil']);
      },
      error: (err) => {
        console.error(err);
      }
    });}
    else{   
      this.perfil.corretor.id = this.id_corretor
      console.log("perfil na criação")
      console.log(this.perfil)
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

setTipoNegocio(negocio : string){
  this.perfil.negocio = negocio
}

setEstado(i: number, estado : string){
  this.perfil.enderecos[i].estado = estado
  this.perfilService.getCidadesPorEstado(estado).subscribe({
    next: (response) => {
      this.cidades = response
      this.perfil.enderecos[i].cidade =''},
    error: (err) => console.error("Erro ao carregar cidades", err)
  })
}

setCidade(i: number, cidade : string){
  this.perfil.enderecos[i].cidade = cidade
}

}