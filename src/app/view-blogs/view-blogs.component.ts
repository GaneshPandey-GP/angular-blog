import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin-service/admin.service';

@Component({
  selector: 'app-view-blogs',
  templateUrl: './view-blogs.component.html',
  styleUrls: ['./view-blogs.component.scss']
})
export class ViewBlogsComponent implements OnInit {

  constructor(private adminService:AdminService) { }
  blogs: any = [];

  ngOnInit() {
    this.adminService.viewBlogs()
    .subscribe(
      data => {
        console.log(data)
        if(data.length == 0) {
          throw new Error('Error Fetching Blogs... ');
        } else {
          this.blogs=data;
        }
      },
      err => console.log(err)
    );
  }

}
