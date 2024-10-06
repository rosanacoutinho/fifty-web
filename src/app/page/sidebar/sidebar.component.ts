import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserDataService } from '../../account/user-data.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
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
    senha: '',
    token:''
  };


  logOut(): void{
    window.localStorage.clear();
    this.userDataService.changeData({id:'', creci: '', nome : '', telefone: '', email: '',  senha: '', token:''});
    this.router.navigate(['/login'])
  }


  ngOnInit(): void {
    this.userDataService.currentData.subscribe(user => {
      this.user.creci = user.creci
    });
  }
}
