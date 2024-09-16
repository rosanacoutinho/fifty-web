import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { OpcaoService } from '../opcao/opcao.service';
import { Opcao } from '../models/opcao';
import { Router, ActivatedRoute } from '@angular/router';
import { UserDataService } from '../account/create-account/user-data.service';
import { GeralService } from '../services/geral.service';
import { TipoImovel } from '../models/tipoImovel';
import { TipoNegocio } from '../models/tipoNegocio';

@Component({
  selector: 'app-opcao-form',
  templateUrl: './opcao-form.component.html',
  styleUrls: ['./opcao-form.component.css']
})
export class OpcaoFormComponent implements OnInit{

  id_corretor=''

 opcao: Opcao = {
  id:'' ,
  corretor: {id:'', nome:'', email:'',telefone:0, instagram: '', site: '', frase: '', creci: '', foto: [0]},
  nomeOpcao: '',
  tipo: 'APARTAMENTO',
  negocio: 'VENDA',  
  valor: 0,
  area: 0,
  quarto:'',
  endereco: {
    id:'',
    cep: '',
    pais:'Brasil',
    estado:'',
    cidade: '',
    bairro:'',
    rua:'',
    numero: '',
    complemento: '',
  },
  suite: '',
  banheiro: '',
  vagaGaragem: '',
  varanda: false,
  iptu: '',
  condominio: '',
  numeroMatchings: 0
 }

 tiposImoveis: TipoImovel[] = []; 
 tiposNegocios: TipoNegocio[] = []; 
 isEditing: boolean = false;

 constructor(
  private opcaoService: OpcaoService,
  private router: Router,
  private route: ActivatedRoute,
  private userDataService: UserDataService,
  private geralService : GeralService){ }

 
 ngOnInit(): void {
  const id = window.localStorage.getItem("id");
  if(id)
    this.id_corretor = id;

   //traz tipo de imoveis 
   this.geralService.getTiposImoveis().subscribe({
    next: (response) => {this.tiposImoveis = response,
      console.log(this.tiposImoveis)
    },
    error: (err) => console.error("Erro ao carregar tipos", err)
  })

     //traz tipo de negocios
     this.geralService.getTiposNegocios().subscribe({
      next: (response) => {this.tiposNegocios = response,
        console.log(this.tiposNegocios)
      },
      error: (err) => console.error("Erro ao carregar tipos", err)
    })
    
    this.route.paramMap.subscribe({
    next: (response) => {
    const id = response.get('id');
    if(id){
      this.isEditing = true;
      this.opcaoService.getOpcao(id).subscribe({
        next: (response) => this.opcao = response,
        error: (err) => console.error("Erro ao carregar opção", err)
      })
    } else{
    }
  }});

  }

 onSubmit(){
  if(this.isEditing){
    this.opcaoService.updateOpcao(this.opcao)
    .subscribe({
      next: () => {
        this.router.navigate(['/listaopcao']);
      },
      error: (err) => {
        console.error(err);
      }
    });}
    else{
      this.opcao.corretor.id= this.id_corretor
      console.log(this.id_corretor)
      console.log(this.opcao)
      this.opcaoService.addOpcao(this.opcao).subscribe({
      next: () => { this.router.navigate(['/listaopcao'])},
      error: (err) =>{
        console.error(err);
      }
    });}
}

      buscarCEP(){   
        this.opcaoService.getCEP(this.opcao.endereco.cep).subscribe({
          next: (response) => {
            this.opcao.endereco.estado=response.estado,
            this.opcao.endereco.cidade=response.uf,
            this.opcao.endereco.bairro=response.bairro,
            this.opcao.endereco.rua=response.logradouro},
          error: (err) => { console.error("CEP nao encontrado", err),
              alert("CEP nao encontrado")
          }
        });

      }

      cleanCEPinfo(){
        this.opcao.endereco.estado= "",
        this.opcao.endereco.cidade= "",
        this.opcao.endereco.bairro= "",
        this.opcao.endereco.rua= "",
        this.opcao.endereco.cep= ""
      }

      voltar(){
        this.router.navigate(['/listaopcao'])
      }

      setTipoImoveis(tipo : string){
        this.opcao.tipo = tipo
      }

      setTipoNegocio(negocio : string){
        this.opcao.negocio = negocio
      }
}