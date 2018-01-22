import { Component, OnInit } from '@angular/core';
import { MiscService } from 'app/_services/misc.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public miscService: MiscService) {
    this.miscService.GetPosts().subscribe( data => {
      console.log(data);
    })
   }

  ngOnInit() {
  }

  gotoPage(){
    console.log('Go To Details Page');
  }

}
