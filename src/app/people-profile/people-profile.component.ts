import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {User} from "../models/User";
import {Article} from "../models/Article";
import {ArticleService} from "../services/article.service";
import {CommentService} from "../services/comment.service";
import {Comment} from "../models/Comment";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-people-profile',
  templateUrl: './people-profile.component.html',
  styleUrls: ['./people-profile.component.css']
})
export class PeopleProfileComponent implements OnInit {

  articless : Article[] = [];
  commentForm: FormGroup;
  submitted = false;
  article : Article;
  comments: Comment[] = [];
  public id: number;
  user: User;
  articles: Article[] = [];
  errorMessage: string;
  private url = "http://localhost:8000/articlesUploads";
  private urll = "http://localhost:8000/uploads";
  private username = localStorage.getItem('username');

  constructor(private formBuilder: FormBuilder, private commentService: CommentService, private userService: UserService, private articleService: ArticleService, private router: Router, private route: ActivatedRoute) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.getUser();
    this.getArticles();
    this.commentForm = this.formBuilder.group({
      content: ['', Validators.required]
    });
    this.commentService.getRefresh()
      .subscribe(() => {
        this.getComments(this.id);
      })
  }

  likeArticle(id)
  {
    this.articleService.likeArticle(localStorage.getItem('username'),id)
      .subscribe(res => console.log(res))
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

  showModal(id: number) {
    this.id = id;
    this.getComments(id);
    this.getOneArticle(id);
    this.getArticlesLikes(id);
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
