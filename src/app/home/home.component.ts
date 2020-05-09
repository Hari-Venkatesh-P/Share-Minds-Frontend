import { Component, OnInit, ModuleWithComponentFactories } from '@angular/core';
import {FormGroup,FormControl,FormBuilder ,Validators} from '@angular/forms';

import { HttpClient} from '@angular/common/http';

import { PostService } from '../post.service';
import { UserService } from '../user.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  postForm: FormGroup;
  
  updatedPostContent : String

  commentContent : String

  commentimageid : String

  postsFlag :boolean = false

  uploadForm: FormGroup;  

  posts : {
    postcontent : "",
    posttitle : "",
    likes:0,
    comments:
    [
      {
        username : "",
        commentcontent:"",
        commenttitle: "",
        commentdate:""
      }
    ],
      date: Date
  }

  constructor(private formBuilder: FormBuilder,private postService:PostService,private httpClient:HttpClient,
    public userService:UserService,private  router:Router) { }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      image: [''],
      name:['']
    });
    this.getAllPosts();
  }

  onSubmit() {
    const formData = new FormData();
    console.log(this.uploadForm.value)
    console.log(formData)
    formData.append('image', this.uploadForm.get('image').value);
    this.httpClient.post("http://localhost:3000/upload",formData).subscribe((data:any)=>{
      console.log(data)
    })
  }
//
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('image').setValue(file);
    }
  }

  getAllPosts(){
    this.postService.getPosts().subscribe((data:any) =>  {
      if(data.success){
        this.posts = data.message;
        this.postsFlag = true;
      }
      else{
        alert("No Posts has been published by ADMIN")
      }
      console.log(data.message)
    });
  }

  deletePost(id:any)
  {
    this.postService.deletePost(id).subscribe((data:any) =>  {
          if(data.success)
          {
            alert(data.message)
            this.getAllPosts();
          }else{
            alert(data.message)
          }
      });
  }

  updatePost(id:any)
  {
    this.postService.updatePost(id,this.updatedPostContent).subscribe((data:any) =>  {
      if(data.sucess){
        alert(data.message)
        window.location.reload()
      }else{
        alert(data.message)
      }
  });
  }

  addLikesToPost(id:any)
  {
    console.log(id)
    if(this.userService.isUserLoggedIn()){
      this.postService.addLikes(id).subscribe((data:any) =>  {
        console.log(data)
        if(data.success){
          this.getAllPosts();
        }else{
          console.log(data.message)
        }
      });
    }else{
      alert("User must login to like a post..!!")
      this.router.navigate(['']);
    }
  }

  commentPost(id:any,postCommentContent:any)
  {
    if(this.userService.isUserLoggedIn()){
      if(postCommentContent.value!=""){
        this.userService.getUser(sessionStorage.getItem('user')).subscribe((data:any)=>{
          if(data.success)
          {
            console.log(data.message)
            this.commentimageid = data.message.profileimageid
            console.log(postCommentContent.value)
            const reqbody ={
                "id":id,
                "username":sessionStorage.getItem('user'),
                "commentcontent":postCommentContent.value,
                "commentimageid":this.commentimageid,
            }
            console.log(reqbody)
            this.postService.addComment(reqbody).subscribe((data:any)=>{
            if(data.success){
                alert(data.message);
                  this.getAllPosts();
              }else{
            console.log(data.message)
            }
          });
        }
        })
      }
    }else{
      alert("User must login to comment a post..!!")
      this.router.navigate(['']);
    }
  }

  replyComment(id:any,commentContent:any){
    const reqbody ={
      "commentid":id,
      "commentreply":commentContent.value
    }
    this.postService.replyComment(reqbody).subscribe((data:any)=>{
      if(data.success){
        alert(data.message);
        this.getAllPosts();
      }else
      {
        console.log(data.message)
      }
    });
  }

  deleteComment(postid:any,commentid:any){
    this.postService.deleteComment(postid,commentid).subscribe((data:any)=>{
      if(data.success){
        alert(data.message)
        this.getAllPosts();
      }else
      {
        console.log(data.message)
      }
    });
  }
  hidePost(id:any)
  {
      this.postService.hidePost(id).subscribe((data:any)=>{
        if(data.success){
          alert(data.message)
          this.getAllPosts()
        }else{
          console.log(data.message)
        }
      });
  }
}
