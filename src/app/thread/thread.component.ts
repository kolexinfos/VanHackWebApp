import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostModel } from 'app/_models/PostModel';
import { MiscService } from 'app/_services';
import { CommentModel } from 'app/_models/CommentModel';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {

  postID: number;
  post: PostModel;
  token: string;
  loggedIn: boolean;
  username:string;

  comment: CommentModel;
  

  constructor(private route: ActivatedRoute, public miscService: MiscService) {
    this.route.params.subscribe(params => {
      this.postID = +params['id'];
    })
    this.comment = new CommentModel();
    this.token = localStorage.getItem('token');

    if(this.token != null || this.token != undefined){
      this.loggedIn = true;
    }

    this.username = localStorage.getItem('username');

   }

  ngOnInit() {
    this.post = this.miscService.posts.find(x => x.id === this.postID);
    console.log(this.post.comments);

    }

    addComment(){
      this.comment.topicid = this.post.id;
      this.miscService.AddComment(this.comment).subscribe( data => {
          console.log("success");
      },
    error => {
      console.log("error" + error);
    })
    }

    isOwner(comment: CommentModel): boolean{
        if(this.username == comment.Username){
          console.log("True");
          return true;
        }
       return false; 
    }

}
