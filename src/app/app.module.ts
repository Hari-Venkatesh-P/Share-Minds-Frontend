import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {   HttpClientModule,HTTP_INTERCEPTORS  } from '@angular/common/http';

import { InterceptorService } from './interceptor.service';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';
import { CreatepostComponent } from './createpost/createpost.component';
import { HiddenpostsComponent } from './hiddenposts/hiddenposts.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    ProfileComponent,
    SearchComponent,
    HomeComponent,
    CreatepostComponent,
    HiddenpostsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
  ],
  providers: [{  
    provide:HTTP_INTERCEPTORS, useClass:InterceptorService, multi:true 
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
