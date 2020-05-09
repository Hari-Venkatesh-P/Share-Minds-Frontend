import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,FormBuilder ,Validators} from '@angular/forms';
import { PostService } from '../post.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css']
})
export class CreatepostComponent implements OnInit {

  postForm: FormGroup;
  
  constructor(private fb:FormBuilder,private postService:PostService,private httpClient:HttpClient,) { }

  ngOnInit(): void {
    this.postForm  = this.fb.group({  
      posttitle:  ['',[Validators.required]],
      postcontent : ['',[Validators.required]],
      emoji : ['',[Validators.required]],
      image: [''],
    });
  }
  
  createPost(){
    if(this.postForm.valid){
      const formData = new FormData();
      console.log(this.postForm.value)
      formData.append('image', this.postForm.get('image').value);
      formData.append('posttitle', this.postForm.get('posttitle').value);
      formData.append('postcontent', this.postForm.get('postcontent').value);
      formData.append('emoji', this.postForm.get('emoji').value);
      console.log(formData)
      this.postService.addPosts(formData).subscribe((data:any)=>{
        console.log(data)
        if(data.message)
        {
          alert(data.message);
          window.location.reload()
        }else{
          alert(data.message);
        }
      })
    }
    else{
      alert("Invalid Post Details");
    }
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.postForm.get('image').setValue(file);
    }
  } 
}
