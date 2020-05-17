import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {UserService} from "../services/user.service";
import {Article} from "../models/Article";
import {User} from "../models/User";


@Component({
  selector: 'app-list-user-search',
  templateUrl: './list-user-search.component.html',
  styleUrls: ['./list-user-search.component.css']
})
export class ListUserSearchComponent implements OnInit {

  users: User[] = [];
  errorMessage: string;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.allProfiles();
    $(function() {
      $('#input-search').on('keyup', function() {
        // @ts-ignore
        var rex = new RegExp($(this).val(), 'i');
        $('.searchable-container .items').hide();
        $('.searchable-container .items').filter(function() {
          return rex.test($(this).text());
        }).show();
      });
    });
  }

  allProfiles()
  {
    this.userService.getAllUsers().subscribe(
      users => {
        this.users = users['result'];
      },
      error => this.errorMessage = <any> error
    );
  }

}
