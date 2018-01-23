import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SimpleNotificationsModule, NotificationsService } from 'angular2-notifications';

import { LoginModel} from '../_models/LoginModel'
import { AlertService, AuthenticationService } from '../_services/index';
import 'rxjs/add/operator/map'
import { AuthModel } from 'app/_models/AuthModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    
    
    active: boolean = true;
    model: any = {};
    loading = false;
    returnUrl: string;
    login: LoginModel;

    public options = {
        position: ["top", "left"],
        timeOut: 0,
        lastOnBottom: true,
    };

  constructor(private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,private notificationsService: NotificationsService,
        private alertService: AlertService) {
            this.login = new LoginModel();
         }

  doLogin() {
      

      
      this.active = false;
      setTimeout( () => this.active = true, 0);

      this.loading = true;
        this.authenticationService.Login(this.login)
            .subscribe(
                data => {

                    localStorage.setItem('token', data.access_token );
                    localStorage.setItem('expire', data.expirydate);
                    localStorage.setItem('username', data.username);
                    localStorage.setItem('userid', data.userid);

                    this.notificationsService.success('Notification', 'Successfully Logged In', {
                    timeOut: 3000,
                    showProgressBar: true,
                    pauseOnHover: true,
                    clickToClose: true
                    });

                    this.router.navigate([this.returnUrl]);

                },
                error => {

                    this.notificationsService.error('Notification', 'Invalid username and password', {
                    timeOut: 5000,
                    showProgressBar: true,
                    pauseOnHover: true,
                    clickToClose: true
                  });
                    this.loading = false;
                });

                this.login.password = '';
  }

  ngOnInit() {
     // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
  }


}
