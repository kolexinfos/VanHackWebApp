import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions,  } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { AppConfig } from '../app.config'
import { RegisterModel} from '../_models/RegisterModel';
import { PostModel } from 'app/_models/PostModel';
import { CategoryModel } from 'app/_models/CategoryModel';

@Injectable()
export class MiscService {

    token: string;
    posts: Array<PostModel>;

    constructor(private http: Http, private config: AppConfig){
        this.token = localStorage.getItem('token');
    }

    GetPosts(): Observable<PostModel[]>{
        const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + this.token});
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
                    post.Comments,
                    post.CategoryId
                )
            })
        })
    }

    GetCategories() : Observable<CategoryModel[]>{
        const headers = new Headers({ 'Content-Type': 'application/json'});
        const options = new RequestOptions({ headers: headers });

        return this.http.get(this.config.apiUrl + '/api/categories', options)
        .map(resp =>{
            return resp.json().map(category => {
                return new CategoryModel(
                    category.Id,
                    category.Name
                )
            })
        })
    }

    AddTopic(topic: PostModel){
        const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + this.token});
        const options = new RequestOptions({ headers: headers });

        let userid = localStorage.getItem('userid');
        let currentdate =  new Date();
        let datetime = currentdate.getFullYear() + "-"
                       + (currentdate.getMonth()+1)  + "-"
                       + currentdate.getDate() + ' '
                    //    + currentdate.getHours() + ":"  
                    //    + currentdate.getMinutes() + ":" 
                    //    + currentdate.getSeconds()
                    //    + '.0000000';
        
        // currentdate.getDate() + "-"
        //         + (currentdate.getMonth()+1)  + "-" 
        //         + currentdate.getFullYear() + " @ "  
        //         + currentdate.getHours() + ":"  
        //         + currentdate.getMinutes() + ":" 
        //         + currentdate.getSeconds()
        //         + ' 0000000';

                console.log(datetime);

        return this.http.post(this.config.apiUrl + '/api/topics', {fulltext: topic.fulltext, title: topic.title,
            categoryid: topic.categoryid, userid: userid, datecreated: datetime }, options );
    }

}
