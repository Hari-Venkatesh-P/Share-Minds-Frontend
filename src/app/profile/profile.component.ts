import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {FormGroup,FormControl,FormBuilder ,Validators} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  updateForm: FormGroup;
  
  dataFlag:Boolean = false;

  user:{
    username:"",
    firstname:"",
    lastname:"",
    mobile:"",
    dob:"",
    email:"",
    gender:"",
    profileimageid:"",
  }

  profileImage : string;

  constructor(private fb:FormBuilder,private userService:UserService) { }

  ngOnInit(): void {
    this.updateForm  = this.fb.group({  
      profileimage:  ['',[Validators.required]],
    });
    this.getUser()
  }

  getUser(){
    this.userService.getUser(sessionStorage.getItem('user')).subscribe((data:any)=>{
      if(data.success)
      {
        console.log(data.message)
        this.user = data.message;
        this.dataFlag = true;
        //console.log(this.user)
        
      }else{
          console.log("Unable to fetch user details")
      }
    })
  }

  updateProfile(){
    if(this.updateForm.valid)
    {
      console.log(this.updateForm.value)
      const formData = new FormData();
      formData.append('profileimage', this.updateForm.get('profileimage').value);
      formData.append('username', sessionStorage.getItem('user'));
      this.userService.updateProfile(formData).subscribe((data:any)=>{
        if(data.success)
        {
          alert(data.message)
          this.updateForm.get('profileimage').setValue(' ');
          this.getUser()
        }else{
          alert(data.message)
        }
      })
    }else{
      alert("Please select an image..!!")
    }
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.updateForm.get('profileimage').setValue(file);
    }
  } 

}
