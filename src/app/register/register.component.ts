import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData= {};
  errorMessage: string;

  constructor(private _auth: AuthService) { }

  ngOnInit() {
  }

  registerUser()
  {
    this._auth.registerUser(this.registerUserData)
      .subscribe(
        res => this.registerUserData = res,
        err => this.errorMessage= <any>err
      )
  }

}
