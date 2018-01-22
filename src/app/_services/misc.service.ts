import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions,  } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { AppConfig } from '../app.config'
import { RegisterModel} from '../_models/RegisterModel';
import { PostModel } from 'app/_models/PostModel';

@Injectable()
export class MiscService {

    token: string;
    posts: Array<PostModel>;

    constructor(private http: Http, private config: AppConfig){
        this.token = localStorage.getItem('token');
    }

    GetPosts(): Observable<PostModel[]>{
        const headers = new Headers({ 'Content-Type': 'application/json'});
        const options = new RequestOptions({ headers: headers });

        return this.http.get(this.config.apiUrl + '/api/topics', options)
        .map(resp => {
            return resp.json().map(post => {
                
                
                return new PostModel(
                    post.Id,
                    post.Title,
                    post.FullText,
                    post.DateCreated,
                    post.Category,
                    post.Username,
                    post.Comments
                )
            })
        })
    }

}