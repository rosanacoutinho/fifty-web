import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpcaoFormComponent } from './opcao-form/opcao-form.component';
import { OpcaoListComponent } from './opcao-list/opcao-list.component';
import { Router, RouterModule } from '@angular/router';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    OpcaoFormComponent,
    OpcaoListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class OpcaoModule { }
