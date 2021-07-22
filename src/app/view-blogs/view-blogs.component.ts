import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../admin-service/admin.service';
import { CreateBlogComponent } from '../create-blog/create-blog.component';
import { UpdateBlogComponent } from '../update-blog/update-blog.component';

@Component({
  selector: 'app-view-blogs',
  templateUrl: './view-blogs.component.html',
  styleUrls: ['./view-blogs.component.scss']
})
export class ViewBlogsComponent implements OnInit {

  constructor(private adminService:AdminService, public dialog: MatDialog) { }
  blogs: any = [];

  ngOnInit() {
    this.adminService.getBlogsList(0)
    .subscribe(
      data => {
        if(data.length == 0) {
          throw new Error('Error Fetching Blogs... ');
        } else {
          this.blogs=data;
        }
        console.log(data)
      },
      err => console.log(err)
    );
  }

  editBlog(blog: any) {
    const dialogRef = this.dialog.open(UpdateBlogComponent, {
      data: {blogInfo: blog},
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
