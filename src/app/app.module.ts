import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OpcaoListComponent } from './opcao-list/opcao-list.component';
import { HomeModule } from './home/home.module';
import { OpcaoModule } from './opcao/opcao.module';
import { LoginComponent } from './account/login/login.component';
import { CreateAccountComponent } from './account/create-account/create-account.component';
import { AuthenticationComponent } from './account/authentication/authentication.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PerfilFormComponent } from './perfil-form/perfil-form.component';
import { PerfilListComponent } from './perfil-list/perfil-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateAccountComponent,
    AuthenticationComponent,
    PerfilFormComponent,
    PerfilListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    OpcaoModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
