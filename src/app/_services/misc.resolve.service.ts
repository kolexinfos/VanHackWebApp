import { Injectable } from '@angular/core';
import {   Router, Resolve, ActivatedRouteSnapshot} from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { MiscService } from 'app/_services';
import { PostModel } from 'app/_models/PostModel';

@Injectable()
export class MiscResolve implements Resolve<PostModel[]> {
    constructor(private miscService: MiscService) { }
    
    resolve(route: ActivatedRouteSnapshot): Observable<PostModel[]> {
        
       return this.miscService.GetPosts();

    }
}