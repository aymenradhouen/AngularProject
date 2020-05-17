import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ArticleComponent} from "./article/article.component";
import {EditArticleComponent} from "./edit-article/edit-article.component";
import {AuthGuard} from "./helpers/auth.guard";
import {HomeComponent} from "./home/home.component";
import {ProfileComponent} from "./profile/profile.component";
import {ListUserSearchComponent} from "./list-user-search/list-user-search.component";
import {ShowProfileComponent} from "./show-profile/show-profile.component";


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
    path: 'articles',
    component: ArticleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-article/:id',
    component: EditArticleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
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
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
