import { Component, Input, OnInit } from '@angular/core';
import { UserDataService } from '../../account/user-data.service';
import { Router } from '@angular/router';
import { Token } from '@angular/compiler';

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
    senha: '',
    token:''
  };

  ngOnInit(): void {
    this.userDataService.currentData.subscribe(user => this.user = user);
  }
}
