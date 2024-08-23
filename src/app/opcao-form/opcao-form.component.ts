import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OpcaoService } from '../opcao/opcao.service';
import { Opcao } from '../models/opcao';
import { Router, ActivatedRoute } from '@angular/router';
import { UserDataService } from '../account/create-account/user-data.service';

@Component({
  selector: 'app-opcao-form',
  templateUrl: './opcao-form.component.html',
  styleUrls: ['./opcao-form.component.css']
})
export class OpcaoFormComponent implements OnInit{

  id_corretor=''

 opcao: Opcao = {
  id:'' ,
  idCorretor:this.id_corretor,
  nomeOpcao: '',
  tipo: '',
  valor: 0,
  area: 0,
  quarto: 0,
  endereco: {
    id:'',
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
  varanda: 0,
 }

  

 
 isEditing: boolean = false;

 constructor(
  private formbuilder: FormBuilder,
  private opcaoService: OpcaoService,
  private router: Router,
  private route: ActivatedRoute,
  private userDataService: UserDataService){ }

 
 ngOnInit(): void {

   this.userDataService.currentData.subscribe(user => this.id_corretor = user.id);

    this.route.paramMap.subscribe({
    next: (response) => {
    const id = response.get('id');
    if(id){
      this.isEditing = true;
      this.opcaoService.getOpcao(this.id_corretor).subscribe({
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