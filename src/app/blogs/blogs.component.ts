import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin-service/admin.service';

import { parse } from 'angular-html-parser';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
})
export class BlogsComponent implements OnInit {
  constructor(private adminService: AdminService) {}
  allBlogs: any = [];
  blogs: any = [];
  pageNo: any = 1;
  noOfBlogs: any;
  currentValue: any = 0;

  ngOnInit() {
    this.adminService.pagination(0).subscribe(
      (data) => {
        if (data.length == 0) {
          throw new Error('Error Fetching Blogs... ');
        } else {
          this.blogs = data;
        }
      },
      (err) => console.log(err)
    );
    this.adminService.viewBlogs().subscribe(
      (data) => {
        if (data.length == 0) {
          throw new Error('Error Fetching Blogs... ');
        } else {
          this.allBlogs = data;
          this.noOfBlogs = this.allBlogs.filter(
            (blog) => blog.isActive === 1
          ).length;
        }
      },
      (err) => console.log(err)
    );
  }

  setLocal(blogid: any) {
    localStorage.setItem('blogid', blogid);
  }

  handlePagination(value: any) {
    if (value === 'prev') {
      if (this.currentValue > 0) {
        this.adminService.pagination(this.currentValue - 2).subscribe(
          (data) => {
            if (data.length == 0) {
              throw new Error('Error Fetching Blogs... ');
            } else {
              this.blogs = data;
              this.pageNo = this.pageNo - 1;
              console.log(this.blogs)
            }
          },
          (err) => console.log(err)
        );
        
        this.currentValue = this.currentValue - 2;
      }
    } else {
      if (this.currentValue < this.noOfBlogs) {
        this.adminService.pagination(this.currentValue + 2).subscribe(
          (data) => {
            if (data.length == 0) {
              throw new Error('Error Fetching Blogs... ');
            } else {
              this.blogs = data;
              this.pageNo = this.pageNo + 1;
              console.log(this.blogs)

            }
          },
          (err) => console.log(err)
        );
        
        this.currentValue = this.currentValue + 2;
      }
    }
  }
}
