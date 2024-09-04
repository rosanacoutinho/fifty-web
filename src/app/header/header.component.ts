import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../account/create-account/user-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private userDataService: UserDataService) { }

  user= {
    id:'',
    creci: '',
    nome : '', 
    telefone: '',
    email: '',
    senha: ''
  };
  
  ngOnInit(): void {
    this.userDataService.currentData.subscribe(user => this.user = user);
  }

}
