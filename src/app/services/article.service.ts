import { Injectable } from '@angular/core';
import { Article } from "../models/Article";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private uri = "http://localhost:8000/api/articles";
  token = localStorage.getItem('currentUser');

  constructor(private http: HttpClient, private authenticationService: AuthService) { }

  getArticles(): Observable<any>{
    const headers = new HttpHeaders();
    headers.append('Authorization', 'Bearer ' + this.token );
    return this.http.get<any>(this.uri,{headers});
  }

  addArticle(article: Article) {
    const headers = new HttpHeaders();
    headers.append('content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token );
    return this.http.post(this.uri, JSON.stringify(article),{headers});
  }

  updateArticle(article: Article , id) {
    const headers = new HttpHeaders();
    headers.append('content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token );
    return this.http.post(this.uri + '/' + id , JSON.stringify(article),{headers});
  }

  deleteArticle(id: any) {
    const headers = new HttpHeaders();
    headers.append('Authorization', 'Bearer ' + this.token );
    return this.http.delete(this.uri + '/' + id,{headers});
  }


}
