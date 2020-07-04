import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  HttpClientModule,HTTP_INTERCEPTORS  } from '@angular/common/http';
import { TagInputModule } from 'ngx-chips';

import { InterceptorService } from './interceptor.service';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { HiddenpostsComponent } from './hiddenposts/hiddenposts.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CreatepostComponent } from './createpost/createpost.component';
import { PostsComponent } from './posts/posts.component';

@NgModule({
  declarations: [
    AppComponent,
    CreatepostComponent,
    LoginComponent,
    ProfileComponent,
    SearchComponent,
    HiddenpostsComponent,
    NavbarComponent,
    PostsComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    TagInputModule,
  ],
  providers: [{  
    provide:HTTP_INTERCEPTORS, useClass:InterceptorService, multi:true 
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
