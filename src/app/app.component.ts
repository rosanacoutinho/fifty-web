import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from './account/create-account/user-data.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private router: Router, 
    private userDataService: UserDataService) {}

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

  logOut(): void{
    this.userDataService.changeData({id:'', creci: '', nome : '', telefone: '', email: '',  senha: ''});
    this.router.navigate(['/login'])
  }

  title = 'fifty-web';
}
