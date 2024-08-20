import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OpcaoService } from '../opcao/opcao.service';
import { Opcao } from '../models/opcao';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-opcao-form',
  templateUrl: './opcao-form.component.html',
  styleUrls: ['./opcao-form.component.css']
})
export class OpcaoFormComponent implements OnInit{

 opcao: Opcao = {
  id:'' ,
  idCorretor:"ab125546-8794-4005-81c9-973242db3b42",
  nomeOpcao: '',
  tipo: '',
  valor: 0,
  area: 0,
  quarto: 0,
  endereco: {
    cep: '',
    pais:'',
    estado:'',
    cidade: '',
    bairro:'',
    rua:'',
    numero: 0,
    complemento: '',
  },
  suite: 0,
  banheiro: 0,
  vagaGaragem: 0,
  sala: 0,
  cozinha: 0,
  dependencia: 0,
  varanda: 0,
  areaServico: 0,
  andar: 0
 }

 isEditing: boolean = false;

 constructor(
  private formbuilder: FormBuilder,
  private opcaoService: OpcaoService,
  private router: Router,
  private route: ActivatedRoute){ }

 
 ngOnInit(): void {
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
      
      console.log(this.opcao)
    this.opcaoService.addOpcao(this.opcao).subscribe({
      next: () => { this.router.navigate(['/listaopcao'])},
      error: (err) =>{
        console.error(err);
      }
    });}
}
}