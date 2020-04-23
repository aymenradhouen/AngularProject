import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs/index";
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;

  private _registerUrl = "http://localhost:8000/api/users/register";
  private _loginUrl = "http://localhost:8000/api/login_check";

  constructor(public http: HttpClient) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  registerUser(user)
  {
    return this.http.post<any>(this._registerUrl,user);
  }

  login(credentials): Observable<any> {
    return this.http.post<any>(this._loginUrl, credentials);
  }

  // logout(): void {
  //   this.token = null;
  //   localStorage.removeItem('currentUser');
  // }
}
