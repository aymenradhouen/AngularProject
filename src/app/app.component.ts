import { Component } from '@angular/core';
import {AuthService} from "./services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "./models/User";
import {UserService} from "./services/user.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngApp';
  public id: number;
  public idd : number;
  currentUser: User;
  user : User;
  errorMessage: string;
  private results = new BehaviorSubject([]);
  private url = "http://localhost:8000/uploads";



  constructor(private router: Router,
              private authenticationService: AuthService,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private route: ActivatedRoute) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.idd = this.route.snapshot.params['id'];
  }

  public getId()
  {
    return this.idd;
  }

  public getResults$(){
    return this.results.asObservable();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (parametre) => {
        this.userService.getUser(localStorage.getItem("username")).subscribe(
          (user) => this.user = user['result'],
          (error) => this.router.navigate(['/'])
        );
      }
    );
  }

  searchUser(value)
  {
    this.userService.searchUser(value).subscribe(
      res => {
        this.results.next(res['result'])
      },
      error => this.errorMessage = <any> error
    );
  }
}
