import { Component, OnInit } from '@angular/core';
import { OpcaoService } from '../opcao.service';
import { Opcao } from '../../models/opcao';
import { Router, ActivatedRoute } from '@angular/router';
import { TipoImovel } from '../../models/tipoImovel';
import { TipoNegocio } from '../../models/tipoNegocio';
import { UserDataService } from '../../account/user-data.service';
import { GeralService } from '../../services/geral.services';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-opcao-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './opcao-form.component.html',
  styleUrl: './opcao-form.component.css'
})
export class OpcaoFormComponent implements OnInit{

  id_corretor=''

 opcao: Opcao = {
  id:'' ,
  corretor: {id:'', nome:'', email:'',telefone:0, instagram: '', site: '', frase: '', creci: '', urlPhoto:''},
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
  andar:'',
  sol:'MANHA',
  descricao:'',
  posicao:'FRENTE',
  numeroMatchings: 0,
  urls:[]
 }

 tiposImoveis: TipoImovel[] = []; 
 tiposNegocios: TipoNegocio[] = []; 
 isEditing: boolean = false;
 posicoes: string[] =  ["FRENTE", "FUNDOS"]; 
 sois: string[] = ["MANHA", "TARDE"]; 

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
    next: (response: TipoImovel[]) => {this.tiposImoveis = response,
      console.log(this.tiposImoveis)
    },
    error: (err: any) => console.error("Erro ao carregar tipos", err)
  })

     //traz tipo de negocios
     this.geralService.getTiposNegocios().subscribe({
      next: (response: TipoNegocio[]) => {this.tiposNegocios = response,
        console.log(this.tiposNegocios)
      },
      error: (err: any) => console.error("Erro ao carregar tipos", err)
    })
    
    this.route.paramMap.subscribe({
    next: (response) => {
    const id = response.get('id');
    if(id){
      this.isEditing = true;
      this.opcaoService.getOpcao(id).subscribe({
        next: (response: any) => this.opcao = response,
        error: (err: any) => console.error("Erro ao carregar opção", err)
      })
    } else{
    }
  }});

  }

 onSubmit(){
  if(this.isEditing){
    this.opcao.corretor =  {id:'', nome:'', email:'',telefone:0, instagram: '', site: '', frase: '', creci: '', urlPhoto:''},
    this.opcao.corretor.id = this.id_corretor
    this.opcaoService.updateOpcao(this.opcao)
    .subscribe({
      next: () => {
        this.router.navigate(['/listaopcao']);
      },
      error: (err: any) => {
        console.error(err);
      }
    });}
    else{
      this.opcao.corretor.id= this.id_corretor
      this.opcaoService.addOpcao(this.opcao).subscribe({
      next: () => { this.router.navigate(['/listaopcao'])},
      error: (err: any) =>{
        console.error(err);
      }
    });}
}

      buscarCEP(){   
        this.opcaoService.getCEP(this.opcao.endereco.cep).subscribe({
          next: (response: { estado: any; uf: any; bairro: any; logradouro: any; }) => {
            this.opcao.endereco.estado=response.estado,
            this.opcao.endereco.cidade=response.uf,
            this.opcao.endereco.bairro=response.bairro,
            this.opcao.endereco.rua=response.logradouro},
          error: (err: any) => { console.error("CEP nao encontrado", err),
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

      setPosicao(posicao: string){
        this.opcao.posicao = posicao
      }

      setSol(sol: string){
        this.opcao.sol = sol
      }
}