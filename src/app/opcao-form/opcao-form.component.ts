import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OpcaoService } from '../opcao/opcao.service';
import { Opcao } from '../models/opcao';

@Component({
  selector: 'app-opcao-form',
  templateUrl: './opcao-form.component.html',
  styleUrls: ['./opcao-form.component.css']
})
export class OpcaoFormComponent implements OnInit{

 opcaoForm: FormGroup = new FormGroup({});

 constructor(
  private formbuilder: FormBuilder,
  private opcaoService: OpcaoService){

 }

 
 ngOnInit(): void {
    this.opcaoForm = this.formbuilder.group({
    nome: ['', Validators.required],
    quarto: ['', Validators.required],
    banheiro: ['', Validators.required],
    area: ['', Validators.required],
    valor: ['', Validators.required]
   })

 }



 onSubmit(){
  if(this.opcaoForm.valid){
    let opcao: Opcao = this.opcaoForm.value;
    this.opcaoService.addOpcao(opcao);
  }
 }
}

