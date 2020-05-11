import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {AppComponent} from "./app.component";
import {ArticleComponent} from "./article/article.component";
import {AddArticleComponent} from "./add-article/add-article.component";
import {EditArticleComponent} from "./edit-article/edit-article.component";
import {AuthGuard} from "./helpers/auth.guard";
import {HomeComponent} from "./home/home.component";
import {ProfileComponent} from "./profile/profile.component";
import {ListArticleComponent} from "./list-article/list-article.component";


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
    path: 'add-article',
    component: AddArticleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-article',
    component: EditArticleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profileArticle',
    component: ListArticleComponent,
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
