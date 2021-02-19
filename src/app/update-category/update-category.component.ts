import {Component, Inject} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { AdminService } from "src/app/admin-service/admin.service";
import { Router } from "@angular/router";
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss']
})
export class UpdateCategoryComponent {
  categoryNameControl = new FormControl('', [
      Validators.required,
    ]);

  matcher = new MyErrorStateMatcher();
  updateCategoryForm = new FormGroup({
    name: new FormControl(this.categoryInfo.categoryInfo.name)
  });

  constructor(@Inject(MAT_DIALOG_DATA) public categoryInfo: any, private adminService:AdminService, private router: Router, private _snackBar: MatSnackBar,public dialogRef: MatDialogRef<UpdateCategoryComponent>){}
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }
  updateCategory() {
    if(this.updateCategoryForm.value.name!=''){
      this.adminService
        .updateCategory(this.categoryInfo.categoryInfo.categoryid, this.updateCategoryForm.value.name)
        .subscribe(
          data => {
            console.log('data ', data);
            if(data.length == 0) {
              throw new Error('Error Updating Category... ');
              this.openSnackBar("Error Updating Category...", "Close");
            } else {
              this.close();
              this.openSnackBar("Category Updated Successfully", "Close");
            }
          },
          err => console.log(err)
        );

    }
  }
  close(): void {
    this.dialogRef.close();
  }
}