import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(private router: Router){}
  
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    var token = null
    if (typeof window !== 'undefined') {
      token = window.localStorage.getItem('token');
    }
    if (token) {
      return true;
    } else {
     this.router.navigate(['login']);
     return false;
    }
  }
}
