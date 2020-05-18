import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {AuthGuard} from "./helpers/auth.guard";
import {HomeComponent} from "./home/home.component";
import {ListUserSearchComponent} from "./list-user-search/list-user-search.component";
import {ShowProfileComponent} from "./show-profile/show-profile.component";
import {PeopleProfileComponent} from "./people-profile/people-profile.component";


const routes: Routes = [
  {
    path : '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'list-user-search',
    component: ListUserSearchComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'my-profile',
    component: ShowProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile/:id',
    component: PeopleProfileComponent,
    canActivate: [AuthGuard]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
