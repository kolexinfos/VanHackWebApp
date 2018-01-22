import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RegisterModel} from '../_models/RegisterModel';
import { AlertService, AuthenticationService } from '../_services/index';
import { SimpleNotificationsModule, NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  // template: '<simple-notifications [options]="options"></simple-notifications>', 
})
export class RegisterComponent implements OnInit {

  active : boolean = true;
  returnUrl:string;
  register : RegisterModel = new RegisterModel("","","","","","");

  public options = {
        position: ["top", "left"],
        timeOut: 0,
        lastOnBottom: true,
    };


  constructor(private authenticationService: AuthenticationService,
   private alertService: AlertService,private route: ActivatedRoute,private notificationsService: NotificationsService,
   private router: Router) { }

  doRegister(){
    console.log(this.register);

    this.authenticationService.register(this.register)
      .subscribe(
                data => {
                    this.notificationsService.success('Item created!', 'Click to undo...', {
                    timeOut: 3000,
                    showProgressBar: true,
                    pauseOnHover: true,
                    clickToClose: true
                  });
                  
                  this.router.navigate([this.returnUrl]); 
                },
                error => {
                    var body = JSON.parse(error._body);
                    this.notificationsService.error('Notification', body.Message[0], {
                    timeOut: 5000,
                    showProgressBar: true,
                    pauseOnHover: true,
                    clickToClose: true
                  });

                  this.register.password = "";
                    
                });

  }

  ngOnInit() {
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

}


