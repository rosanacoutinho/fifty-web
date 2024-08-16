import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OpcaoListComponent } from './opcao-list/opcao-list.component';
import { OpcaoFormComponent } from './opcao-form/opcao-form.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:"", component: LoginComponent},
  {path:"home", component: HomeComponent},
  {path:"listaopcao", component: OpcaoListComponent},
  {path:"novaopcao", component: OpcaoFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
