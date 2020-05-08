import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import {User} from "../models/User";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: Object;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (parametre) => {
        this.authService.getUser(parametre.id).subscribe(
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
