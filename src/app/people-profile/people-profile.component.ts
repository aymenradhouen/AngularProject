import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {User} from "../models/User";
import {Article} from "../models/Article";
import {ArticleService} from "../services/article.service";

@Component({
  selector: 'app-people-profile',
  templateUrl: './people-profile.component.html',
  styleUrls: ['./people-profile.component.css']
})
export class PeopleProfileComponent implements OnInit {

  public id: number;
  user: User;
  articles: Article[] = [];
  errorMessage: string;
  private url = "http://localhost:8000/articlesUploads";
  private urll = "http://localhost:8000/uploads";
  private username = localStorage.getItem('username');

  constructor(private userService: UserService, private articleService: ArticleService, private router: Router, private route: ActivatedRoute) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.getUser();
    this.getArticles();
  }

  getUser()
  {
    this.userService.getUserProfile(this.id)
      .subscribe(
        res =>{
          this.user = res['result']
        },
        error => this.errorMessage = <any> error
      )
  }

  getArticles()
  {
    this.articleService.peopleArticle(this.id)
      .subscribe(
        res =>{
          this.articles = res['result']
        },
        error => this.errorMessage = <any> error
      )
  }

}
