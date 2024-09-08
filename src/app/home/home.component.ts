import { Component, Input, OnInit } from '@angular/core';
import { UserDataService } from '../account/create-account/user-data.service';
import { Router } from '@angular/router';
import { AccountService } from '../account/shared/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private router : Router,
    private userDataService: UserDataService) { }
 
  user= {
    id:'',
    creci: '',
    nome : '', 
    senha: ''
  };

  ngOnInit(): void {
    this.userDataService.currentData.subscribe(user => this.user = user);
  }
}
