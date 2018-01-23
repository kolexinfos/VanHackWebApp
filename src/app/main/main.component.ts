import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/_services';
import { ChangeDetectorRef, NgZone } from '@angular/core';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  token: string;
  loggedIn: boolean;

  constructor(public authService: AuthenticationService, public changes: ChangeDetectorRef) {
     this.token = localStorage.getItem('token');
     this.loggedIn = false;
   }

  ngOnInit() {
    if(this.token != null){
      this.loggedIn = true;
      this.changes.detectChanges();
  }
  }

}
