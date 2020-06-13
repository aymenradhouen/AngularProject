import { Component, OnInit } from '@angular/core';
import {ArticleService} from "../services/article.service";
import {Article} from "../models/Article";
import {User} from "../models/User";
import {CommentService} from "../services/comment.service";
import {UserService} from "../services/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Comment} from "../models/Comment";
import {finalize} from "rxjs/operators";

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
  public id: number;
  articless : Article[] = [];
  article : Article;
  comments: Comment[] = [];
  private urll = "http://localhost:8000/uploads";
  submitted = false;
  commentForm: FormGroup;
  username = localStorage.getItem('username');



  constructor(private commentService: CommentService, private userService: UserService, private formBuilder: FormBuilder, private articleService: ArticleService, public router: Router, private route: ActivatedRoute) {
    this.id = this.route.snapshot.params['id'];
  }



  ngOnInit() {
    this.commentForm = this.formBuilder.group({
      content: ['', Validators.required]
    });
    this.articleService.getRefresh()
      .subscribe(() => {
        this.getArticles();
        this.getArticlesLikes(this.id);
      })

    this.commentService.getRefresh()
      .subscribe(() => {
        this.getComments(this.id);
      })
    this.getArticles();
  }

  likeArticle(id)
  {
    this.articleService.likeArticle(localStorage.getItem('username'),id)
      .subscribe(res => console.log(res))
  }

  deleteComment(id)
  {
    const oldComment = [...this.comments];
    this.comments = this.comments.filter((comment) => comment.id !== +id);
    this.commentService.deleteComment(id).subscribe(
      comment => {
        console.log(comment);
      },
      error => this.comments = oldComment
    );
  }

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

  showModal(id: number) {
    this.id = id;
    this.getComments(id);
    this.getOneArticle(id);
    this.getArticlesLikes(id);
  }

  getComments(id)
  {
    this.commentService.getComments(id)
      .subscribe(
        res => {
          this.comments = res['result']
        },
        error => this.errorMessage = <any> error
      )
  }

  getOneArticle(id)
  {
    this.articleService.getOneArticles(id)
      .subscribe(
        res => {
          this.article = res['result']
        },
        error => this.errorMessage = <any> error
      )
  }

  getArticlesLikes(id)
  {
    this.articleService.getAllArticleLikes(id)
      .subscribe(
        res => {
          this.articless = res['result']
        },
        error => this.errorMessage = <any> error
      )
  }

  addComment() {
    this.submitted = true;

    if (this.commentForm.invalid) {
      return;
    }

    this.commentService.addComment(this.commentForm.value,localStorage.getItem('username') ,this.id)
      .pipe(
        finalize(() => this.submitted = false),
      ).subscribe(
      res =>
      {
        this.commentForm.reset();
      },
      err => this.errorMessage= <any>err
    )
  }

}
