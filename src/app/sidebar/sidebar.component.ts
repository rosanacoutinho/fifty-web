import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../account/create-account/user-data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
    private router: Router, 
    private userDataService: UserDataService) { }

  user= {
    id:'',
    creci: '',
    nome : '', 
    telefone: '',
    email: '',
    senha: ''
  };


  logOut(): void{
    this.userDataService.changeData({id:'', creci: '', nome : '', telefone: '', email: '',  senha: ''});
    this.router.navigate(['/login'])
  }


  ngOnInit(): void {
    this.userDataService.currentData.subscribe(user => this.user = user);
  }

}
