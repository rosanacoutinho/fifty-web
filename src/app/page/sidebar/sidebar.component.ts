import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserDataService } from '../../account/user-data.service';
import { AccountService } from '../../account/accountService';
import { Authority } from '../../models/authority';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
    private router: Router, 
    private userDataService: UserDataService,
    private accountService:AccountService) { }

  authority: string =""

  user= {
    id:'',
    creci: '',
    nome : '', 
    telefone: '',
    email: '',
    senha: '',
    token:'',
    authorities: [{authority:''}]
  };


  logOut(): void{
    window.localStorage.clear();
    this.userDataService.changeData({id:'', creci: '', nome : '', telefone: '', email: '',  senha: '', token:'', authorities:[]});
    this.router.navigate(['/login'])
  }


  ngOnInit(): void {
    this.userDataService.currentData.subscribe(user => {this.user.creci = user.creci});
    this.accountService.getAccount(this.user.creci).subscribe({
      next: (response) => {
        console.log("response")
        this.user = response
        console.log(this.user)
      },
      error: (err: any) => console.error("Erro ao carregar usuário", err)
    })
  }

  ehAdmin(): boolean{
    for(let authorityObj of this.user.authorities){
      console.log("ehadmin")
      console.log(authorityObj.authority)
      if (authorityObj.authority === 'ROLE_ADMIN'){
        console.log("true")
        return true;
        
      }
    }
    console.log("false")
    return false;
  }
}
