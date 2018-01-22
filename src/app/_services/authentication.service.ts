import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions,  } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { AppConfig } from '../app.config'
import { RegisterModel} from '../_models/RegisterModel';

@Injectable()
export class AuthenticationService {

    token:string = "";

    constructor(private http: Http, private config: AppConfig){
        this.token = localStorage.getItem("token");
    }


    login(username:string, password:string){
        return this.http.post(this.config.apiUrl + '/api/account/login', {UserName:username, Password:password})
        .map((response: Response) => {
            
            //Login successful if there is a JWT token in the response
            let data = response.json();

            if(data.token){
                localStorage.setItem('token', data.token);
                localStorage.setItem('expire', data.expiration);
            }


            // if(user && user.token){
            //     //store the user details and jwt in locat storage to keep user logged in
            //     localStorage.setItem('currentUser', JSON.stringify(user));
            // }
        })
    }

    getUsers(){
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + this.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.config.apiUrl + '/api/account/getregisteredusers', options)
        .map((response: Response) => response.json())
    }

    getUserById(id: number){
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + this.token });
        let options = new RequestOptions({ headers: headers });

        let url:string = this.config.apiUrl + '/api/account/getregistereduserbyid?id=' + id.toString();

        return this.http.get(url, options)
        .map((response: Response) => response.json())
    }

    register(register: RegisterModel){
        return this.http.post(this.config.apiUrl + '/api/account/registerUser', register)
        .map((response: Response) => {
            
            //Login successful if there is a JWT token in the response
            let status = response.json();
            
        })
    }

    logout(){
        //remove the user from the localstorage to log user out
        localStorage.removeItem('token');
        localStorage.removeItem('expire');
    }
}