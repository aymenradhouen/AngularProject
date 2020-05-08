import { Component, OnInit } from '@angular/core';
import {ArticleService} from "../services/article.service";
import {Article} from "../models/Article";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  articles: Article[] = [];
  loading = false;
  errorMessage: string;
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
    this.getArticles();
  }

}
