import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin-service/admin.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  categories: any = [];
  allBlogs: any = [];
  recentBlogs: any = [];
  blogs: any = [];

  constructor(private adminService:AdminService ) { }
  setLocal(blogid: any) {
    localStorage.setItem('blogid', blogid);
    location.reload();
  }
  ngOnInit(): void {
    this.adminService.getBlogsList(0).subscribe(
      (data) => {
        if (data.length == 0) {
          throw new Error('Error Fetching Blogs... ');
        } else {
          this.allBlogs = data;
          this.recentBlogs = [this.allBlogs[this.allBlogs.length-1], this.allBlogs[this.allBlogs.length-2], this.allBlogs[this.allBlogs.length-3]];
        }
      },
      (err) => console.log(err)
    );
    this.adminService
      .getCategories()
      .subscribe(
        data => {
          if(data.length == 0) {
            throw new Error('Error Fetching Categories... ');
          } else {
            this.categories=data;
          }
        },
        err => console.log(err)
      );
  }
  handleCategory(value: any) {
    this.adminService
      .filterByCategory(value)
      .subscribe(
        data => {
          if (data.length == 0) {
            throw new Error('Error Fetching Blogs... ');
          } else {
            this.blogs = data;
          }
        },
        err => console.log(err)
      );
  }

}
