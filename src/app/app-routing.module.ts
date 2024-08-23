import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OpcaoListComponent } from './opcao-list/opcao-list.component';
import { OpcaoFormComponent } from './opcao-form/opcao-form.component';
import { AuthenticationComponent } from './account/authentication/authentication.component';
import { CreateAccountComponent } from './account/create-account/create-account.component';
import { AuthGuard } from './account/shared/auth.guard';
import { LoginComponent } from './account/login/login.component';
import { PerfilListComponent } from './perfil-list/perfil-list.component';
import { PerfilFormComponent } from './perfil-form/perfil-form.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path:"login", component: LoginComponent},
  {path:"create-account", component: CreateAccountComponent},
  {path:"home", component: HomeComponent, canActivate: [AuthGuard]},
  {path:"listaopcao", component: OpcaoListComponent, canActivate: [AuthGuard]},
  {path:"novaopcao", component: OpcaoFormComponent, canActivate: [AuthGuard]},
  {path:"editarOpcao/:id", component: OpcaoFormComponent, canActivate: [AuthGuard]},
  {path:"listaperfil", component: PerfilListComponent, canActivate: [AuthGuard]},
  {path:"novoperfil", component: PerfilFormComponent, canActivate: [AuthGuard]},
  {path:"editarPerfil/:id", component: PerfilFormComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
