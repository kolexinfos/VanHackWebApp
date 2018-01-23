import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryModel } from 'app/_models/CategoryModel';
import { PostModel } from 'app/_models/PostModel';
import { MiscService } from 'app/_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  categories: Array<CategoryModel>
  create: PostModel;

  constructor(public route: ActivatedRoute, public miscService: MiscService, public router: Router ) {
    this.create = new PostModel(0,'','','','','',[],0);
   }

  ngOnInit() {
    this.route.data.subscribe((data: { category: CategoryModel[] }) => {

      console.log(data.category);
      this.categories = data.category;
    });
  }

  addTopic(){
    this.miscService.AddTopic(this.create).subscribe( data => {
        // TODO : Implement popover to display success

        this.router.navigate(['']);
    },
    error => {
      console.log('error' + error);

      // TODO : Implement popover to display error
    })
  }

  clearForm(){
    console.log(this.create);
    this.create = new PostModel(0,'','','','','',[],0); 
  }

}
