import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SimpleNotificationsModule, NotificationsService } from 'angular2-notifications';

import { LoginModel} from '../_models/LoginModel'
import { AlertService, AuthenticationService } from '../_services/index';
import 'rxjs/add/operator/map'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    showSpinner: boolean = true;

  constructor(private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,private notificationsService: NotificationsService,
        private alertService: AlertService) { }

        title = 'X-Pay Admin Portal';
        active: boolean = true;
        model: any = {};
        loading = false;
        returnUrl: string;

        public options = {
                position: ["top", "left"],
                timeOut: 0,
                lastOnBottom: true,
            };


        login: LoginModel = new LoginModel("", "");

  doLogin() {
      console.log(this.login);

      this.showSpinner = true;
      
      this.active = false;
      setTimeout( () => this.active = true, 0);

      this.loading = true;
        this.authenticationService.login(this.login.email, this.login.password)
            .subscribe(
                data => {
                    this.showSpinner = false;
                    this.notificationsService.success('Notification', 'Successfully Logged In', {
                    timeOut: 3000,
                    showProgressBar: true,
                    pauseOnHover: true,
                    clickToClose: true
                    });
                                    
                    this.router.navigate([this.returnUrl]); 
                    
                },
                error => {
                    this.showSpinner = false;
                    var body = JSON.parse(error._body);
                    this.notificationsService.error('Notification', body.Message[0], {
                    timeOut: 5000,
                    showProgressBar: true,
                    pauseOnHover: true,
                    clickToClose: true
                  });
                    this.loading = false;
                });

                this.login.password = "";
  }

  ngOnInit() {
     // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/main/product';

        this.showSpinner = false;
  }


}
