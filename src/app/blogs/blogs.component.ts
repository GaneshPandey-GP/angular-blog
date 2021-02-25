import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin-service/admin.service';

import { parse } from 'angular-html-parser';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

  constructor(private adminService:AdminService) { }
  blogs: any = [];
  // content: any = [];

  ngOnInit() {
    this.adminService.viewBlogs()
    .subscribe(
      data => {
        if(data.length == 0) {
          throw new Error('Error Fetching Blogs... ');
        } else {
          this.blogs=data;
          console.log(this.blogs);
        }
      },
      err => console.log(err)
    );

    // for (let i=0; i<=this.blogs.length; i++){
    //   console.log(i)
    //   this.content.push(parse((this.blogs[i].content)))
    // }
    // console.log(this.content)
  }




}
