import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { CreateCategoryComponent } from "../create-category/create-category.component";
import { ViewCategoriesComponent } from "../view-categories/view-categories.component";
import {MatBottomSheet} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-admin-head',
  templateUrl: './admin-head.component.html',
  styleUrls: ['./admin-head.component.scss']
})
export class AdminHeadComponent implements OnInit {

  constructor(public dialog: MatDialog, private _bottomSheet: MatBottomSheet) { }

  ngOnInit(): void {
  }
  viewCategory(){
    this._bottomSheet.open(ViewCategoriesComponent);
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