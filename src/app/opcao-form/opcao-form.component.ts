import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OpcaoService } from '../opcao/opcao.service';
import { Opcao } from '../models/opcao';
import { Router } from '@angular/router';

@Component({
  selector: 'app-opcao-form',
  templateUrl: './opcao-form.component.html',
  styleUrls: ['./opcao-form.component.css']
})
export class OpcaoFormComponent implements OnInit{

 opcaoForm: FormGroup = new FormGroup({});

 constructor(
  private formbuilder: FormBuilder,
  private opcaoService: OpcaoService,
  private router: Router){

 }

 
 ngOnInit(): void {
    this.opcaoForm = this.formbuilder.group({
    nome: ['', Validators.required],
    tipo: ['', Validators.required],
    valor: ['', Validators.required],
    area: ['', Validators.required],
    quarto: ['', Validators.required],
    suite: ['', Validators.required],
    banheiro: ['', Validators.required],
    vagaGaragem: ['', Validators.required],
    sala: ['', Validators.required],
    cozinha: ['', Validators.required],
    dependencia: ['', Validators.required],
    varanda: ['', Validators.required],
    areaServico: ['', Validators.required],
    andar: ['', Validators.required],  
    cep: ['', Validators.required],
    pais: ['', Validators.required],
    estado: ['', Validators.required],
    cidade: ['', Validators.required],
    bairro: ['', Validators.required],
    rua: ['', Validators.required],
    numero: ['', Validators.required],
    complemento: ['', Validators.required]
   })

 }



 onSubmit(){
    if(this.opcaoForm.valid){
      let opcao: Opcao = this.opcaoForm.value;
      const result =  this.opcaoService.addOpcao(opcao).subscribe(response => {  
        alert("Opção criada com sucesso!" )  
        this.router.navigate(['listaopcao']);
      }, error => {
        console.error(error);
        alert("Erro ao criar opção" )
      });   
    }
  }
}