import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {User} from "../models/User";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = "http://localhost:8000/api/users/register";
  private _loginUrl = "http://localhost:8000/api/login_check";
  private uriUser = "http://localhost:8000/api/users";
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(public http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  registerUser(user)
  {
    return this.http.post<any>(this._registerUrl,user);
  }

  login(username: string, password:string) {
    return this.http.post<any>(this._loginUrl, { username, password })
      .pipe(map(response =>{
        localStorage.setItem('currentUser', JSON.stringify(response));
        localStorage.setItem('username', username);
        this.currentUserSubject.next(response);
        return response;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('username');
    this.currentUserSubject.next(null);
  }




}
