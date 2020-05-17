import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {User} from "../models/User";
import {Article} from "../models/Article";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ArticleService} from "../services/article.service";
import {Router} from "@angular/router";
import {finalize} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'app-show-profile',
  templateUrl: './show-profile.component.html',
  styleUrls: ['./show-profile.component.css']
})
export class ShowProfileComponent implements OnInit {

  myData: Article[] = [];
  user : User[] = [];
  users : User[] = [];
  errorMessage: string;
  article: Article;
  postForm: FormGroup;
  submitted = false;
  private url = "http://localhost:8000/articlesUploads/";
  articles: Article[] = [];
  loading = false;
  username = localStorage.getItem('username');
  isShow : boolean;


  constructor(private userService: UserService, private formBuilder: FormBuilder, private articleService: ArticleService, public router: Router) { }

  ngOnInit() {
    this.getUser();
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      image: [null, Validators.required],
      content: ['', Validators.required]
    });
    this.articleService.getRefresh()
      .subscribe(() => {
        this.getArticle();
      })
    this.getArticle();
    this.getAllUsers();
  }

  show(){
    this.isShow = !this.isShow;
  }

  getUser()
  {
    this.userService.getUser(localStorage.getItem('username'))
      .subscribe(
        res =>{
          this.user = res['result']
        },
        error => this.errorMessage = <any> error
      )
  }

  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === "string") {
          this.postForm.get('image').setValue({
            filename: file.name,
            filetype: file.type,
            value: reader.result.split(',')[1]
          })
        }
      };
    }
  }


  get f() { return this.postForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.postForm.invalid) {
      return;
    }

    this.articleService.addArticle(this.postForm.value, localStorage.getItem('username'))
      .pipe(
        finalize(() => this.submitted = false),
      ).subscribe(
        res =>
        {
        this.myData = res['result'];
        this.postForm.reset();
        },
        err => this.errorMessage= <any>err
      )
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

  getAllUsers()
  {
    this.userService.getAllUsers()
      .subscribe(
        res => {
          this.users = res['result']
        },
        error => this.errorMessage = <any> error
      )
  }

}
