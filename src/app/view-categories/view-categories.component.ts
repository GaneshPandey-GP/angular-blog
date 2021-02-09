import { Component,  } from '@angular/core';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { AdminService } from "src/app/admin-service/admin.service";

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.scss']
})
export class ViewCategoriesComponent {
  categories:any = [];
  constructor(private adminService:AdminService, private _bottomSheetRef: MatBottomSheetRef<ViewCategoriesComponent>) { }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
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
  }
}
