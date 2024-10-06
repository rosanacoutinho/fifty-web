import { Component, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AccountService } from './account/accountService';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './page/header/header.component';
import { SidebarComponent } from './page/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, FormsModule, HeaderComponent, SidebarComponent],
  templateUrl: './app.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor( 
    private accountService: AccountService,
    
  ) {}

  title = 'fifty-web';

  isLoading = false;

  isUserLoggedIn(): boolean {
    console.log('Usuario logado: ' + this.accountService.isUserLoggedIn())
    return this.accountService.isUserLoggedIn();
  }
}
