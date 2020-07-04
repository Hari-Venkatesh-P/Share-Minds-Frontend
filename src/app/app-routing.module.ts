import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LoginComponent } from './login/login.component';
import { HiddenpostsComponent } from './hiddenposts/hiddenposts.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuardService } from './auth-guard.service';
import { SearchComponent } from './search/search.component';
import { PostsComponent } from './posts/posts.component';

const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"home",component:PostsComponent },
  {path: 'home/:hashtag', component: PostsComponent },
  {path:"hidden",component:HiddenpostsComponent,canActivate:[AuthGuardService]},
  {path:"profile",component:ProfileComponent,canActivate:[AuthGuardService]},
  {path:"search",component:SearchComponent,canActivate:[AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
