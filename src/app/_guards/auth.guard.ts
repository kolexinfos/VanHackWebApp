import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private router : Router) {

    }

    canActivate(route:ActivatedRouteSnapshot, state: RouterStateSnapshot){

        var expire = new Date(localStorage.getItem("expire"))
        

        if(localStorage.getItem('token') != undefined && (Date.now() < expire.getTime() )){
            console.log("Logged in as ");
            //Logged in so return true
            //this.router.navigate(state.url);
            return true;
        }
        console.log("Not logged in");
        //not logged in so redirect to login page with the return url
        this.router.navigate(['login'], {queryParams: { returnUrl: state.url}});
        return false; 
    }

    canActivateChild(route:ActivatedRouteSnapshot, state: RouterStateSnapshot){

        var expire = new Date(localStorage.getItem("expire"));
        var token = localStorage.getItem('token');
        var now = Date.now();
        var status:boolean = now < expire.getTime(); 

        if( token != undefined && ( now < expire.getTime() )){
            console.log("Logged in as ");
            //Logged in so return true
            //this.router.navigate(state.url);
            return true;
        }
        console.log("Not logged in");
        //not logged in so redirect to login page with the return url
        this.router.navigate(['/'], {queryParams: { returnUrl: state.url}});
        return false; 
    }
}
