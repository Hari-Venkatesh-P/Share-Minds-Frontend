import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private userService:UserService,private router: Router) { }
  
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.userService.isUserLoggedIn() || this.userService.isAdminLoggedIn())
      return true;

    this.router.navigate(['']);
    return false;
  }
}
