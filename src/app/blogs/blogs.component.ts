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
  }

    setLocal(blogid: any) {
      localStorage.setItem("blogid", blogid)
    }



}
