import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient :HttpClient) { }

  public addUser(user:FormData)
  {
    return this.httpClient.post("https://hari-shareminds-backend.herokuapp.com/user/adduser", user);
  } 

  public loginUser(credentials:any)
  {
    return this.httpClient.post("https://hari-shareminds-backend.herokuapp.com/user/loginuser", credentials);
  } 

  public getUser(username:string)
  {
    return this.httpClient.get("https://hari-shareminds-backend.herokuapp.com/user/getuser/"+username);
  }

  public updateProfile(body:FormData)
  {
    return this.httpClient.post("https://hari-shareminds-backend.herokuapp.com/user/updateprofile",body);
  }

  public setUserLoggedIn(name:string)
  {
    sessionStorage.setItem("user",name)
  }

  public setAdminLoggedIn()
  {
    sessionStorage.setItem("admin","admin")
  }

  isUserLoggedIn() {
    return !(sessionStorage.getItem('user') === null)
  }

  isAdminLoggedIn() {
    return !(sessionStorage.getItem('admin') === null)
  }

  setToken(token:string){
    sessionStorage.setItem("jwttoken",token)
  }
}
