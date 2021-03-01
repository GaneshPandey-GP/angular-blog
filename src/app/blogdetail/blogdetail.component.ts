import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin-service/admin.service';

@Component({
  selector: 'app-blogdetail',
  templateUrl: './blogdetail.component.html',
  styleUrls: ['./blogdetail.component.scss']
})
export class BlogdetailComponent implements OnInit {
  blog: any;
  constructor(private adminService:AdminService) { }

  ngOnInit() {
    let blogid = localStorage.getItem("blogid")
    console.log(blogid)
    this.adminService.getBlog(parseInt(blogid))
    .subscribe(
      data => {
        if(data.length == 0) {
          throw new Error('Error Fetching Blogs... ');
        } else {
          this.blog=data;
        }
      },
      err => console.log(err)
    );
  }

}
