import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../account/user-data.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private userDataService: UserDataService) { }

  nome: string = ''
  
  ngOnInit(): void {
    this.userDataService.currentData.subscribe(user => {
      this.nome = user.nome
    });
    console.log("user" + this.nome)
  }

}
