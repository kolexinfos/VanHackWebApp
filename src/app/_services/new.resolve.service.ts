import { Injectable } from '@angular/core';
import {   Router, Resolve, ActivatedRouteSnapshot} from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { MiscService } from 'app/_services';
import { CategoryModel } from 'app/_models/CategoryModel';

@Injectable()
export class NewResolve implements Resolve<CategoryModel[]> {
    constructor(private miscService: MiscService) { }
    
    resolve(route: ActivatedRouteSnapshot): Observable<CategoryModel[]> {
        
       return this.miscService.GetCategories();

    }
}