import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {

  postID: number;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.postID = +params['id'];
    })
   }

  ngOnInit() {
    }

}
