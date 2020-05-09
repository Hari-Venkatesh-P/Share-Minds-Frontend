import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';

@Component({
  selector: 'app-hiddenposts',
  templateUrl: './hiddenposts.component.html',
  styleUrls: ['./hiddenposts.component.css']
})
export class HiddenpostsComponent implements OnInit {

  postsFlag :boolean = false

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
      date:"",
  }

  constructor(private postService:PostService) { }


  ngOnInit(): void {
    this.getAllHiddenPosts()
  }

  getAllHiddenPosts(){
    this.postService.getHiddenPosts().subscribe((data:any) =>  {
      if(data.success){
        this.posts = data.message;
        this.postsFlag = true
      }else{
        alert("No Posts has been currently hidden..!!")
      }
      console.log(data.message);
    });
  }

  add(id:any)
  {
    this.postService.unHidePost(id).subscribe((data:any)=>{
      if(data.success){
        alert(data.message)
        this.getAllHiddenPosts()
      }else{
        console.log(data.message)
      }
    });
  }
}
