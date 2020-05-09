import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private userService:UserService,private  router:Router) { }
  banner:String;
  ngOnInit(): void {
    if(this.userService.isAdminLoggedIn())
    {
      this.banner="Publish"
    }
    else{
      this.banner="Feeds"
    }
  }

  getUserLoggedIn()
  {
    return this.userService.isUserLoggedIn();
  }

  getAdminLoggedIn()
  {
    return this.userService.isAdminLoggedIn();
  }

  logout() {
    console.log("logging out")
    if(sessionStorage.getItem('user')!==null)
    {
      sessionStorage.removeItem('user');
    }
    if(sessionStorage.getItem('admin')!==null)
    {
      sessionStorage.removeItem('admin');
    }
    sessionStorage.removeItem('jwttoken');
    this.router.navigate(['']);
    alert("Successfully logged out..!!");
  }
}
