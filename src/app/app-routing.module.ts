import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HiddenpostsComponent } from './hiddenposts/hiddenposts.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuardService } from './auth-guard.service';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"home",component:HomeComponent},
  {path:"hidden",component:HiddenpostsComponent,canActivate:[AuthGuardService]},
  {path:"profile",component:ProfileComponent,canActivate:[AuthGuardService]},
  {path:"search",component:SearchComponent,canActivate:[AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
