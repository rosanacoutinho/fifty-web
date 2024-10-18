import { Component, Input, OnInit } from '@angular/core';
import { UserDataService } from '../../account/user-data.service';
import { Router, RouterLink } from '@angular/router';
import { Token } from '@angular/compiler';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,CommonModule],
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
