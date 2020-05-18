import { Injectable } from '@angular/core';
import { Article } from "../models/Article";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {AuthService} from "./auth.service";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private uri = "http://localhost:8000/api/articles";
  token = localStorage.getItem('currentUser');
  private _refresh$ = new Subject();

  constructor(private http: HttpClient, private authenticationService: AuthService) { }

  getRefresh()
  {
    return this._refresh$;
  }

  getArticles(): Observable<any>{
    const headers = new HttpHeaders();
    headers.append('Authorization', 'Bearer ' + this.token );
    return this.http.get<any>(this.uri,{headers}).pipe();
  }

  addArticle(article: Article, email) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token );
    return this.http.post(this.uri + '/' + email, JSON.stringify(article),{headers: headers})
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      );
  }

  updateArticle(article: Article , id) {
    const headers = new HttpHeaders();
    headers.append('content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token );
    return this.http.put(this.uri + '/' + id , JSON.stringify(article),{headers})
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      );
  }

  deleteArticle(id: any) {
    const headers = new HttpHeaders();
    headers.append('content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token );
    return this.http.delete(this.uri + '/delete/' + id,{headers});
  }

  profileArticle(email) {
    const headers = new HttpHeaders();
    headers.append('Authorization', 'Bearer ' + this.token );
    return this.http.get(this.uri + '/list/' + email,{headers});
  }

  peopleArticle(id) {
    const headers = new HttpHeaders();
    headers.append('Authorization', 'Bearer ' + this.token );
    return this.http.get(this.uri + '/profile/' + id,{headers});
  }

  valueArticle(id)
  {
    const headers = new HttpHeaders();
    headers.append('Authorization', 'Bearer ' + this.token );
    return this.http.get<any>(this.uri + '/' + id,{headers});
  }


}
