import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {User} from "../models/User";
import {Article} from "../models/Article";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ArticleService} from "../services/article.service";
import {ActivatedRoute, Router} from "@angular/router";
import {finalize} from "rxjs/operators";
import {CommentService} from "../services/comment.service";
import {Comment} from "../models/Comment";

@Component({
  selector: 'app-show-profile',
  templateUrl: './show-profile.component.html',
  styleUrls: ['./show-profile.component.css']
})
export class ShowProfileComponent implements OnInit {

  articless : Article[] = [];
  article : Article;
  comments: Comment[];
  user : User;
  users : User[] = [];
  errorMessage: string;
  postForm: FormGroup;
  commentForm: FormGroup;
  submitted = false;
  private url = "http://localhost:8000/articlesUploads";
  private urll = "http://localhost:8000/uploads";
  articles: Article[] = [];
  loading = false;
  username = localStorage.getItem('username');
  isShow : boolean;

  public id: number;
  title: String;
  content: String;

  firstName: String;
  lastName: String;
  about: String;
  hobbies: String;
  image: { filetype: any; filename: any; value: string };
  imageCouverture: { filetype: any; filename: any; value: string };
  facebookLink: String;
  twitterLink: String;
  errors: [];



  constructor(private commentService: CommentService, private userService: UserService, private formBuilder: FormBuilder, private articleService: ArticleService, public router: Router, private route: ActivatedRoute) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.getUser();
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      image: [null, Validators.required],
      content: ['', Validators.required]
    });
    this.commentForm = this.formBuilder.group({
      content: ['', Validators.required]
    });
    this.articleService.getRefresh()
      .subscribe(() => {
        this.getArticle();
      })
    this.userService.getRefresh()
      .subscribe(() => {
        this.getUser();
      })
    this.commentService.getRefresh()
      .subscribe(() => {
        this.getComments(this.id);
      })
    this.articleService.getRefresh()
      .subscribe(() => {
        this.getArticlesLikes(this.id);
      })

    this.getArticle();
    this.getAllUsers();

  }

  showModal(id: number) {
    this.id = id;
    this.getComments(id);
    this.getOneArticle(id);
    this.getArticlesLikes(id);
  }

  likeArticle(id)
  {
    this.articleService.likeArticle(localStorage.getItem('username'),id)
      .subscribe(res => console.log(res))
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



  getAllComment()
  {
    this.commentService.getAllComments()
      .subscribe(
        res => {

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

  editPost(title, content) {
    this.submitted = true;
    let article: any;
    article = {title: title, content: content};
    this.articleService.updateArticle(article, this.id)
      .pipe(
        finalize(() => this.submitted = false),
      ).subscribe(
        res => console.log(res),
        err => this.errorMessage= <any>err
      )
    this.router.navigate(['/my-profile']);
  }

  updateProfile(firstName, lastName, about, hobbies, facebookLink, twitterLink)
  {
    this.submitted = true;
    let userr : any;
    userr = {firstName: firstName, lastName: lastName, about: about, hobbies: hobbies, facebookLink: facebookLink, twitterLink: twitterLink};
    this.userService.updateUser(userr,localStorage.getItem('username'))
      .pipe(
        finalize(() => this.submitted = false),
      ).subscribe((result => {
    }) , editError => this.errors = editError);
  }

  updateImage(image)
  {
    this.submitted = true;
    let userr : any;
    userr = {image: image};
    this.userService.updateUserImage(userr,localStorage.getItem('username'))
      .pipe(
        finalize(() => this.submitted = false),
      ).subscribe((res => {
        console.log(res);
      }),
      editError => this.errors = editError
    );
  }

  updateImageCouverture(imageCouverture)
  {
    this.submitted = true;
    let userr : any;
    userr = {imageCouverture: imageCouverture};
    this.userService.updateUserImageCouverture(userr,localStorage.getItem('username'))
      .pipe(
        finalize(() => this.submitted = false),
      ).subscribe((res => {
        console.log(res);
      }),
      editError => this.errors = editError
    );
  }


  show(id: number){
    this.isShow = !this.isShow;
    this.id = id;
  }

  getUser()
  {
    this.userService.getUser(localStorage.getItem('username'))
      .subscribe(
        res =>{
          this.user = res['result'];
          this.firstName = this.user.firstName;
          this.lastName = this.user.lastName;
          this.about = this.user.about;
          this.hobbies = this.user.hobbies;
          this.facebookLink = this.user.facebookLink;
          this.twitterLink = this.user.twitterLink;
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

  onFileChange1(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === "string") {
          this.image = {
            filename: file.name,
            filetype: file.type,
            value: reader.result.split(',')[1]
          }
        }
      };
    }
  }

  onFileChange2(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === "string") {
          this.imageCouverture = {
            filename: file.name,
            filetype: file.type,
            value: reader.result.split(',')[1]
          }
        }
      };
    }
  }


  get f() { return this.postForm.controls; }
  get f1() { return this.commentForm.controls; }

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
