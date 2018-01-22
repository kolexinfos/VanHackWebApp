import { Component, OnInit } from '@angular/core';
import { MiscService } from 'app/_services/misc.service';
import { ActivatedRoute } from '@angular/router';
import { PostModel } from 'app/_models/PostModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts: Array<PostModel>;

  constructor(private route: ActivatedRoute, public miscService: MiscService, public router: Router ) {
   }

  ngOnInit() {
    this.route.data.subscribe((data: { posts: PostModel[] }) => {
      
      this.posts = data.posts;
      this.miscService.posts = data.posts;
    });
  }

  openThread(post: PostModel){
    
    this.router.navigate(['thread', {id: post.id}])
  }

}
