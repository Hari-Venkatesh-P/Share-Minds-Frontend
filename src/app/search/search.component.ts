import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchUserName:string

  user:{
    username:"",
    firstname:"",
    lastname:"",
    mobile:"",
    dob:"",
    email:"",
    gender:"",
  }

  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }

  searchUser()
  {
    console.log(this.searchUserName)
    this.userService.getUser(this.searchUserName).subscribe((data:any)=>{
      if(data.success)
      {
        this.user = data.message;
        console.log(this.user)
      }else{
          alert(data.message)
      }
      console.log(data.message)
    })
  }
}
