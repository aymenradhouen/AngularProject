import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import {Router} from '@angular/router';
import {NgForm} from "@angular/forms";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = {};

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
  }

  loginUser(loginForm: NgForm) {
    this.authService.login(this.loginUserData)
      .subscribe(
        (response) => {
          localStorage.setItem('token', response.id);
          this.router.navigate(['/']);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
