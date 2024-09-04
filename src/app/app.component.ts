import { Component } from '@angular/core';
import { UserDataService } from './account/create-account/user-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor( private userDataService: UserDataService) {}

  title = 'fifty-web';

  user= {
    id:'',
    creci: '',
    nome : '', 
    telefone: '',
    email: '',
    senha: ''
  };
  
  isUserLoggedIn(): boolean {
    this.userDataService.currentData.subscribe(user => this.user = user);
    return this.user.id == '';
  }
}
