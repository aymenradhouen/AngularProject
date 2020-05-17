import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Article} from "../models/Article";
import {User} from "../models/User";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private uriUser = "http://localhost:8000/api/users";

  constructor(public http: HttpClient,private authService: AuthService) { }

  getUser(username)
  {
    const headers = new HttpHeaders();
    headers.append('Authorization', 'Bearer ' + this.authService.currentUser );
    return this.http.get(this.uriUser + '/' + username,{headers});
  }

  updateUser(user: User , username) {
    const headers = new HttpHeaders();
    headers.append('content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authService.currentUser );
    return this.http.patch(this.uriUser + '/' + username , JSON.stringify(user),{headers});
  }

  searchUser(value){
    const headers = new HttpHeaders();
    headers.append('content-type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authService.currentUser );
    return this.http.get(this.uriUser + '/search/' + value , {headers});
  }

  getAllUsers(): Observable<any>
  {
    const headers = new HttpHeaders();
    headers.append('Authorization', 'Bearer ' + this.authService.currentUser );
    return this.http.get<any>(this.uriUser,{headers});
  }

}
