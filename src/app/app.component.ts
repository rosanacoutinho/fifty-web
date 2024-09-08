import { Component } from '@angular/core';
import { UserDataService } from './account/create-account/user-data.service';
import { AccountService } from './account/shared/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor( 
    private accountService: AccountService) {}

  title = 'fifty-web';  

  isUserLoggedIn(): boolean {
    console.log(this.accountService.isUserLoggedIn())
    return this.accountService.isUserLoggedIn();
  }
}
