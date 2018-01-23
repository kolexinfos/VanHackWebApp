import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { AppConfig } from '../app.config'
import { RegisterModel } from '../_models/RegisterModel';
import { LoginModel } from 'app/_models/LoginModel';
import { AuthModel } from 'app/_models/AuthModel';

@Injectable()
export class AuthenticationService {

    token: string;

    constructor(private http: Http, private config: AppConfig) {
        this.token = localStorage.getItem('token');
    }

    Login(user: LoginModel): Observable<AuthModel> {
        const headers = new Headers(); // { 'Content-Type': 'application/json' });
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        const options = new RequestOptions({ headers: headers });

        return this.http.post(this.config.apiUrl + 'token', 'grant_type=password' + '&username=' + user.username + '&password=' + user.password, options)
            .map(res => {
                console.log(res.json());
                let auth = res.json();
                return new AuthModel(
                    auth.access_token,
                    auth['.expires'],
                );
            })

    }



    register(register: RegisterModel) {
        return this.http.post(this.config.apiUrl + '/api/account/register', register)
            .map((response: Response) => {

            })
    }

    logout() {
        // remove the user from the localstorage to log user out
        localStorage.removeItem('token');
        localStorage.removeItem('expire');
    }
}