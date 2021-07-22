import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin-service/admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-blogdetail',
  templateUrl: './blogdetail.component.html',
  styleUrls: ['./blogdetail.component.scss']
})
export class BlogdetailComponent implements OnInit {
  blog: any;
  constructor(private adminService:AdminService, private route: ActivatedRoute, private titleService: Title, private metaService: Meta ) { }
  public setTitle( newTitle: string) {
       this.titleService.setTitle( newTitle );
    }
  loadScript() {
    let node = document.createElement('script'); // creates the script tag
    node.src = 'assets/js/gtm.js'; // sets the source (insert url in between quotes)
    node.type = 'text/javascript'; // set the script type
    node.async = true; // makes script run asynchronously
    node.charset = 'utf-8';
    // append to head of document
    document.getElementsByTagName('head')[0].appendChild(node);
  }
  ngOnInit() {
    let createUrl = this.route.snapshot.params.createUrl;
    this.adminService.getBlog2(createUrl)
    .subscribe(
      data => {
        if(data.length == 0) {
          throw new Error('Error Fetching Blogs... ');
        } else {
          this.blog=data;
          this.setTitle(this.blog[0].createPageTitle);
              this.metaService.updateTag(
                {
                   name: 'description',
                   content: this.blog[0].createMetaDescription
                }
              );
              this.metaService.updateTag(
                {
                  name: 'keyword',
                  content: this.blog[0].createMetaKeywords
                }
              );
              this.loadScript();
        }
      },
      err => console.log(err)
    );
  }

}
