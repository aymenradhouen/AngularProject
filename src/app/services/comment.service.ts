import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private uri = "http://localhost:8000/api/comment";
  token = localStorage.getItem('currentUser');
  private _refresh$ = new Subject();

  constructor(private http: HttpClient) { }

  getRefresh()
  {
    return this._refresh$;
  }

  addComment(comment: Comment, email, id) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token );
    return this.http.post(this.uri + '/' + email + '/' + id, JSON.stringify(comment),{headers: headers})
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      );
  }

  getComments(id): Observable<any>{
    const headers = new HttpHeaders();
    headers.append('Authorization', 'Bearer ' + this.token );
    return this.http.get<any>(this.uri + '/' + id,{headers});
  }

  getAllComments(): Observable<any>{
    const headers = new HttpHeaders();
    headers.append('Authorization', 'Bearer ' + this.token );
    return this.http.get<any>(this.uri,{headers}).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  deleteComment(id: any) {
    const headers = new HttpHeaders();
    headers.append('content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token );
    return this.http.delete(this.uri + '/delete/' + id,{headers});
  }
}
