import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { OpcaoListComponent } from './opcao/opcao-list/opcao-list.component';
import { OpcaoFormComponent } from './opcao/opcao-form/opcao-form.component';
import { AuthGuard } from './account/auth.guard';
import { LoginComponent } from './account/login/login.component';
import { PerfilListComponent } from './perfil/perfil-list/perfil-list.component';
import { PerfilFormComponent } from './perfil/perfil-form/perfil-form.component';
import { OpcaoMatchingComponent } from './opcao/opcao-matching/opcao-matching.component';
import { PerfilMatchingComponent } from './perfil/perfil-matching/perfil-matching.component';
import { CorretorPerfilComponent } from './corretor/corretor-perfil/corretor-perfil.component';
import { CreateAccountComponent } from './account/create-account/create-account.component';
import { CorretorFormComponent } from './corretor/corretor-form/corretor-form.component';
import { VitrineComponent } from './opcao/vitrine/vitrine.component';
import { AccountComponent } from './account/account/account.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path:"login", component: LoginComponent},
  {path:"create-account", component: CreateAccountComponent},
  {path:"home", component: HomeComponent, canActivate: [AuthGuard]},
  {path:"listaopcao", component: OpcaoListComponent, canActivate: [AuthGuard]},
  {path:"novaopcao", component: OpcaoFormComponent, canActivate: [AuthGuard]},
  {path:"editarOpcao/:id", component: OpcaoFormComponent, canActivate: [AuthGuard]},
  {path:"listaperfil", component: PerfilListComponent, canActivate: [AuthGuard]},
  {path:"novoperfil", component: PerfilFormComponent, canActivate: [AuthGuard]},
  {path:"editarPerfil/:id", component: PerfilFormComponent, canActivate: [AuthGuard]},
  {path:"opcaoMatching/:id_opcao", component: OpcaoMatchingComponent, canActivate: [AuthGuard]},
  {path:"perfilMatching/:id_perfil", component: PerfilMatchingComponent, canActivate: [AuthGuard]},
  {path:"corretor/:creci", component: CorretorPerfilComponent, canActivate: [AuthGuard]},
  {path:"corretorForm/:creci", component: CorretorFormComponent, canActivate: [AuthGuard]},
  {path:"vitrine/:id_opcao", component: VitrineComponent},
  {path:"account/:creci", component: AccountComponent},
  {path:"admin", component: AdminComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

