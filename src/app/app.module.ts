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
import { OpcaoMatchingComponent } from './opcao-matching/opcao-matching.component';
import { PerfilMatchingComponent } from './perfil-matching/perfil-matching.component';
import { ParceirosComponent } from './parceiros/parceiros.component';
import { CorretorPerfilComponent } from './corretor-perfil/corretor-perfil.component';
import { httpInterceptorProviders } from './http-interceptors';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateAccountComponent,
    AuthenticationComponent,
    OpcaoMatchingComponent,
    PerfilMatchingComponent,
    ParceirosComponent,
    CorretorPerfilComponent,
    PerfilFormComponent,
    PerfilListComponent,
    HeaderComponent,
    SidebarComponent,
    LoaderComponent
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
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
