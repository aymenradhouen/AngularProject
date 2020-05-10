import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ArticleService} from "../services/article.service";
import {Router} from "@angular/router";
import {Article} from "../models/Article";

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {

  article: Article;
  postForm: FormGroup;
  submitted = false;
  postData= {};
  errorMessage: string;
  selectedFile: File = null;

  constructor(private formBuilder: FormBuilder, private articleService: ArticleService, public router: Router) { }

  ngOnInit() {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      image: [null, Validators.required],
      content: ['', Validators.required]
    });
  }

  onFileChange(event) {
    this.selectedFile = <File>event.target.files[0];
  }


  get f() { return this.postForm.controls; }

  onSubmit() {
    this.submitted = true;


    if (this.postForm.invalid) {
      return;
    }

    let formModel: any = new FormData();
    formModel.append('title', this.postForm.get('title').value);
    formModel.append('content', this.postForm.get('content').value);
    formModel.append('image', this.selectedFile, this.selectedFile.name);
    this.articleService.addArticle(formModel, localStorage.getItem('username'))
      .subscribe(
        res => console.log(res),
        err => this.errorMessage= <any>err
      )
    // this.router.navigate(['/']);
  }


}
