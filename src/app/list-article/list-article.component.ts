import { Component, OnInit } from '@angular/core';
import {Article} from "../models/Article";
import {ArticleService} from "../services/article.service";

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.css']
})
export class ListArticleComponent implements OnInit {

  private url = "http://localhost:8000/articlesUploads/";
  articles: Article[] = [];
  loading = false;
  errorMessage: string;

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.getArticle();
  }

  getArticle()
  {
    this.loading = true;
    this.articleService.profileArticle(localStorage.getItem('username')).subscribe(
      articles => {
        this.articles = articles['result'];
        this.loading = false;
      },
      error => this.errorMessage = <any> error
    );
  }

  deleteArticle(id)
  {
    const oldArticle = [...this.articles];
    this.articles = this.articles.filter((article) => article.id !== +id);
    this.articleService.deleteArticle(id).subscribe(
      articles => {
        console.log(articles);
      },
      error => this.articles = oldArticle
    );
  }

}
