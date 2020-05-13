import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {Article} from "../models/Article";
import {ArticleService} from "../services/article.service";
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import {Subject} from "rxjs";



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
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private articleService: ArticleService) {
  }


  ngOnInit() {
    this.getArticle();
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 5,
        processing: true
      };
    }


  getArticle()
  {
    this.loading = true;
    this.articleService.profileArticle(localStorage.getItem('username')).subscribe(
      articles => {
        this.articles = articles['result'];
        this.loading = false;
        this.dtTrigger.next();
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

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }



}
