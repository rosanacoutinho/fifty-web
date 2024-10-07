import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { OpcaoService } from '../opcao.service';
import { Opcao } from '../../models/opcao';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vitrine',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './vitrine.component.html',
  styleUrl: './vitrine.component.css'
})
export class VitrineComponent {

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
  
  constructor(
    private opcaoService: OpcaoService,
    private router: Router,
    private route: ActivatedRoute
  ){ }

    
  ngOnInit(): void {    
      this.route.paramMap.subscribe({
      next: (response) => {
      const id_opcao = response.get('id_opcao');
      if(id_opcao){
        this.opcaoService.getVitrine(id_opcao).subscribe({
          next: (response: any) => this.opcao = response,
          error: (err: any) => console.error("Erro ao carregar opção", err)
        })
      } else{
      }
    }});
  
    }
}
