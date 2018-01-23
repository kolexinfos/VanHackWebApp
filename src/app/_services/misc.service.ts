import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions,  } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { AppConfig } from '../app.config'
import { RegisterModel} from '../_models/RegisterModel';
import { PostModel } from 'app/_models/PostModel';
import { CategoryModel } from 'app/_models/CategoryModel';
import { CommentModel } from 'app/_models/CommentModel';

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

    AddComment(comment: CommentModel){
        let token = localStorage.getItem('token');
        const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + token});
        const options = new RequestOptions({ headers: headers });

        let userid = localStorage.getItem('userid');
        let currentdate =  new Date();
        let datetime = currentdate.getFullYear() + "-"
                       + (currentdate.getMonth()+1)  + "-"
                       + currentdate.getDate() + ' '

        console.log(datetime);

        return this.http.post(this.config.apiUrl + 'api/comments', {fulltext: comment.FullText, userid: userid, 
        datecreated: datetime, edited: false, topicid: comment.topicid });
    }

    AddTopic(topic: PostModel){

        let token = localStorage.getItem('token');
        const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + token});
        const options = new RequestOptions({ headers: headers });

        let userid = localStorage.getItem('userid');
        let currentdate =  new Date();
        let datetime = currentdate.getFullYear() + "-"
                       + (currentdate.getMonth()+1)  + "-"
                       + currentdate.getDate() + ' '

        

        return this.http.post(this.config.apiUrl + '/api/topics', {fulltext: topic.fulltext, title: topic.title,
            categoryid: topic.categoryid, userid: userid, datecreated: datetime }, options );
    }

}
