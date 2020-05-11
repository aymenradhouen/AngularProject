import { Component, OnInit } from '@angular/core';
import {ArticleService} from "../services/article.service";
import {Article} from "../models/Article";
import {User} from "../models/User";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private url = "http://localhost:8000/articlesUploads/";
  articles: Article[] = [];
  loading = false;
  errorMessage: string;
  user : User;
  constructor(private articleService: ArticleService) { }

  getArticles() {
    this.loading = true;
    this.articleService.getArticles().subscribe(
      articles => {
           this.articles = articles['result'];
           this.loading = false;
           },
      error => this.errorMessage = <any> error
    );
  }

  ngOnInit() {
    this.getArticles();}

}
