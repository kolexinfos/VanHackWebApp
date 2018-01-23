import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/_services';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(public route: Router, public authService: AuthenticationService) { }

  ngOnInit() {
    this.authService.logout();
  }

  gotoLogin(){
    this.route.navigate(['login']);
  }

  gotoHome(){
    this.route.navigate(['']);
  }

}
