import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder} from '@angular/forms';

import { HttpClient} from '@angular/common/http';

import { PostService } from '../post.service';
import { UserService } from '../user.service';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})

export class PostsComponent implements OnInit {

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
      date: Date,
      tags:string,
  }

  constructor(private formBuilder: FormBuilder,private postService:PostService,private httpClient:HttpClient,
    public userService:UserService,private  router:Router,private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRouter.queryParams.subscribe((params) => {
      if (params.hashtag) {
        this.getPostBasedOnTags()
      } else {
        this.getAllPosts()
      }
    })
  }

  getPostBasedOnTags(){
    const hashtag = this.activatedRouter.snapshot.queryParamMap.get("hashtag");
    this.postService.getPostsByHashTags(hashtag).subscribe((data:any) =>  {
      if(data.success){
        this.posts = data.message;
        this.postsFlag = true;
      }
      else{
        alert("No Posts with this HashTag has been published by ADMIN")
      }
      console.log(data.message)
    });
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
