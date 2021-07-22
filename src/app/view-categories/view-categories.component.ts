import { Component,  } from '@angular/core';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from "src/app/admin-service/admin.service";
import { UpdateCategoryComponent } from '../update-category/update-category.component';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.scss']
})
export class ViewCategoriesComponent {
  categories:any = [];
  constructor(private adminService:AdminService, public dialog: MatDialog, private _bottomSheetRef: MatBottomSheetRef<ViewCategoriesComponent>) { }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
  ngOnInit(): void {
    this.adminService
      .getCategories()
      .subscribe(
        data => {
          if(data.length == 0) {
            throw new Error('Error Fetching Categories... ');
          } else {
            this.categories=data;
            console.log(this.categories)
          }
        },
        err => console.log(err)
      );
  }
  updateCategoryDialog(category: any){
    const dialogRef = this.dialog.open(UpdateCategoryComponent, {
      data: {categoryInfo: category},
    });
  }
}
