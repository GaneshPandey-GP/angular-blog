import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AdminService } from '../admin-service/admin.service';

@Component({
  selector: 'app-view-subcategory',
  templateUrl: './view-subcategory.component.html',
  styleUrls: ['./view-subcategory.component.scss']
})
export class ViewSubcategoryComponent implements OnInit {
  categories: any = [];
  subCategories: any = [];
  innerCats: any = [];
  constructor(private adminService:AdminService, private _bottomSheetRef: MatBottomSheetRef<ViewSubcategoryComponent>) { }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
  panelOpenState = false;

  ngOnInit(): void {
    this.adminService
      .viewCategories()
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
      this.adminService.viewSubCategories('').subscribe(
        data => {
          if(data.length == 0) {
            throw new Error("Error Fetching Subcategories");
          } else {
            this.subCategories = data;
          }
        },
        err => console.log(err)
      );
  }

  getSubCategoryInfo(categoryid: any) {
    this.innerCats = (this.subCategories.filter((item) => item.categoryid === categoryid))
  }
}
