import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OpcaoListComponent } from './opcao-list/opcao-list.component';
import { OpcaoFormComponent } from './opcao-form/opcao-form.component';
import { AuthenticationComponent } from './account/authentication/authentication.component';
import { CreateAccountComponent } from './account/create-account/create-account.component';
import { AuthGuard } from './account/shared/auth.guard';
import { LoginComponent } from './account/login/login.component';

const routes: Routes = [
  {
    path:"", component: HomeComponent,
    children: [
      //{path:"listaopcao", component: OpcaoListComponent},
      //{path:"novaopcao", component: OpcaoFormComponent},
    ],
    canActivate: [AuthGuard]
  },
  {
    path:"", component: AuthenticationComponent,
    children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path:"login", component: LoginComponent},
      {path:"home", component: HomeComponent},
      {path:"create-account", component: CreateAccountComponent},
      {path:"listaopcao", component: OpcaoListComponent},
      {path:"novaopcao", component: OpcaoFormComponent},
      {path:"editarOpcao/:id", component: OpcaoFormComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
