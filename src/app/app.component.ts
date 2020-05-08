import { Component } from '@angular/core';
import {AuthService} from "./services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "./models/User";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngApp';
  currentUser: User;
  user: Object;

  constructor(private router: Router,
              private authenticationService: AuthService,
              private activatedRoute: ActivatedRoute) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }


  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (parametre) => {
        this.authenticationService.getUser(parametre.id).subscribe(
          (user) => this.user = user['result'],
          (error) => this.router.navigate(['/'])
        );
      }
    );
    this.activatedRoute.queryParams.subscribe(
      (qps) => console.log(qps)
    );
  }
}
