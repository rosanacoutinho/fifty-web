import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilFormComponent } from '../perfil-form/perfil-form.component';
import { PerfilListComponent } from '../perfil-list/perfil-list.component';
import { Router, RouterModule } from '@angular/router';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    PerfilFormComponent,
    PerfilListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class OpcaoModule { }
