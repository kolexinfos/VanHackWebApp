import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostModel } from 'app/_models/PostModel';
import { MiscService } from 'app/_services';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {

  postID: number;
  post: PostModel;

  constructor(private route: ActivatedRoute, public miscService: MiscService) {
    this.route.params.subscribe(params => {
      this.postID = +params['id'];
    })
   }

  ngOnInit() {
    this.post = this.miscService.posts.find(x => x.id === this.postID);
    console.log(this.post.comments);

    }

}
