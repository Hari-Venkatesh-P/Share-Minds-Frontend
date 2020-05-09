import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder ,Validators} from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signupForm: FormGroup;

  loginEmail :String;

  loginPassword: String;

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+[.]{1}[a-z]{2,3}";

  passwordPattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,12}$"

  constructor(private fb:FormBuilder,private userService:UserService,private  router:Router) { }

  ngOnInit(): void {

    this.signupForm  = this.fb.group({
      firstname:  ['',Validators.required],
      lastname:  ['',Validators.required],
      username:  ['',[Validators.required]],
      password:  ['',[Validators.required,Validators.pattern(this.passwordPattern)]],
      confirmpassword : ['',[Validators.required]],
      mobile : ['',[Validators.required,Validators.minLength(10), Validators.maxLength(10)]],
      email : ['',[Validators.required,Validators.pattern(this.emailPattern)]],
      dob : ['',[Validators.required]],
      gender : ['',[Validators.required]],
      profileimage : [],
    });
  }

  createUser()
  {
    
    if(this.signupForm.valid)
    {
      if(this.signupForm.get('password').value === this.signupForm.get('confirmpassword').value)
      {
        const formData = new FormData();
        formData.append('firstname', this.signupForm.get('firstname').value);
        formData.append('lastname', this.signupForm.get('lastname').value);
        formData.append('username', this.signupForm.get('username').value);
        formData.append('password', this.signupForm.get('password').value);
        formData.append('mobile', this.signupForm.get('mobile').value);
        formData.append('email', this.signupForm.get('email').value);
        formData.append('dob', this.signupForm.get('dob').value);
        formData.append('gender', this.signupForm.get('gender').value);
        formData.append('profileimage', this.signupForm.get('profileimage').value);
        this.userService.addUser(formData).subscribe((data:any)=>{
        if(data.success){
          alert(data.message);
          window.location.reload();
        }else{
          alert(data.message)
        }
      });
      }else{
        alert("New password and Confirm Password doen't match.")
      }
    }
    else{
      alert("Issue with filling the details of the user")
    }
  }

  loginUser()
  {
    const credentials ={
      username:this.loginEmail,
      password:this.loginPassword,
    }
    console.log(credentials)
    this.userService.loginUser(credentials).subscribe((data:any)=>{
      console.log(data)
      if(data.success)
      {
        if(data.role==="USER")
        {
          this.userService.setUserLoggedIn(data.name);
        }
        else{
          this.userService.setAdminLoggedIn();
        }
        alert(data.message)
        this.userService.setToken(data.jwttoken);
        this.router.navigate(['home']);
      }
      else{
          alert(data.message)
      }
    });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.signupForm.get('profileimage').setValue(file);
    }
  } 

}
