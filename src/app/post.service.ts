import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient :HttpClient ) { 
  }

  
  public addPosts(post:FormData)
  {
    return this.httpClient.post("https://hari-shareminds-backend.herokuapp.com/post/addpost", post);
  } 

  public deleteComment(postid:any,commentid:any)
  {
    return this.httpClient.delete("https://hari-shareminds-backend.herokuapp.com/post/deletecomment/"+postid+"/"+commentid);
  } 

  public addLikes(id:string)
  {
    return this.httpClient.put("https://hari-shareminds-backend.herokuapp.com/post/putlike/"+id," ")
  }

  public addComment(reqbody:any)
  {
    return this.httpClient.post("https://hari-shareminds-backend.herokuapp.com/post/addcomment",reqbody)
  }

  public replyComment(reqbody:any)
  {
    console.log(reqbody)
    return this.httpClient.post("https://hari-shareminds-backend.herokuapp.com/post/replycomment",reqbody)
  }

  public getPosts()
  {
    return this.httpClient.get("https://hari-shareminds-backend.herokuapp.com/post/getposts");
  }
  
  public getHiddenPosts()
  {
    return this.httpClient.get("https://hari-shareminds-backend.herokuapp.com/post/gethiddenposts");
  } 

  public deletePost(id:any)
  {
    return this.httpClient.delete("https://hari-shareminds-backend.herokuapp.com/post/deletepost/"+id)
  }

  public hidePost(id:any)
  {
    return this.httpClient.put("https://hari-shareminds-backend.herokuapp.com/post/hidepost/"+id," ")
  }

  public unHidePost(id:any)
  {
    return this.httpClient.put("https://hari-shareminds-backend.herokuapp.com/post/unhidepost/"+id," ")
  }

  public updatePost(id:any,content:any)
  {
    return this.httpClient.put("https://hari-shareminds-backend.herokuapp.com/post/updatepost/"+id+"/"+content," ")
  }

  
}
