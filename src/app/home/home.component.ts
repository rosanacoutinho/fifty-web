import { Component, Input, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserDataService } from '../account/create-account/user-data.service';
import { Router } from '@angular/router';

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

    console.log(this.user)
    if(this.user.id == ''){
      this.router.navigate(['/login'])
    }
  }

}
