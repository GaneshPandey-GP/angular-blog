import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { CreateCategoryComponent } from "../create-category/create-category.component";

@Component({
  selector: 'app-admin-head',
  templateUrl: './admin-head.component.html',
  styleUrls: ['./admin-head.component.scss']
})
export class AdminHeadComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  viewCategory(){

  }
  createCategory(){
    const dialogRef = this.dialog.open(CreateCategoryComponent);

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('Dialog result:');
    // });

  }
  viewCategoryStatistics(){

  }

}
