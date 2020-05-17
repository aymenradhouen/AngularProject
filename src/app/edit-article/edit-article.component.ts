import { Component, OnInit } from '@angular/core';
import {Article} from "../models/Article";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ArticleService} from "../services/article.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {

  public id: number;
  title: String;
  content: String;
  postForm: FormGroup;
  submitted = false;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder, private articleService: ArticleService, public router: Router, private route: ActivatedRoute) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {

  }



  editPost(title, content) {
    let article: any;
    article = {title: title, content: content};
    this.submitted = true;


    this.articleService.updateArticle(article, this.id)
      .subscribe(
        res => console.log(res),
        err => this.errorMessage= <any>err
      )
    this.router.navigate(['/my-profile']);
  }
}
