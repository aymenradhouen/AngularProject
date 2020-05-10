import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import {User} from "../models/User";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  firstName: String;
  lastName: String;
  about: String;
  hobbies: String;
  image: String;
  imageCouverture: String;
  facebookLink: String;
  twitterLink: String;
  errors: [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
        this.userService.getUser(localStorage.getItem('username')).subscribe(
          (user) => this.user = user['result'],
          (error) => this.router.navigate(['/'])
        );
      }

  updateProfile(firstName, lastName, about, hobbies, image, imageCouverture, facebookLink, twitterLink)
  {
    let userr : any;
    userr = {firstName: firstName, lastName: lastName, about: about, hobbies: hobbies, image: image, imageCouverture: imageCouverture, facebookLink: facebookLink, twitterLink: twitterLink};
    this.userService.updateUser(userr,localStorage.getItem('username')).subscribe((result => {
      console.log(userr);
      window.location.reload();
    }) , editError => this.errors = editError);
  }
}
