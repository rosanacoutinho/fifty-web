import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  user = {
    id:'',
    creci: '',
    nome : '', 
    email: '',
    telefone: '',
    senha: ''
  };

  private dataSource = new BehaviorSubject<User>(this.user);
 
  currentData = this.dataSource.asObservable();

  changeData(user: User) {
    this.dataSource.next(user);

    localStorage.setItem('id', user.id);
    localStorage.setItem('nome', user.nome);
    localStorage.setItem('creci', user.creci )

  }
}
