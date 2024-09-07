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

}
