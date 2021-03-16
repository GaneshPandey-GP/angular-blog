import {Component} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { AdminService } from "src/app/admin-service/admin.service";
import { Router } from "@angular/router";
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent {
  matcher = new MyErrorStateMatcher();
  createCategoryForm = new FormGroup({
    name: new FormControl('')
  });

  constructor(private adminService:AdminService, private _snackBar: MatSnackBar,public dialogRef: MatDialogRef<CreateCategoryComponent>){}
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }
  
  close(): void {
    this.dialogRef.close();
  }
  createCategory() {
    if(this.createCategoryForm.value.name!=''){
      this.adminService
        .createCategory(this.createCategoryForm.value.name)
        .subscribe(
          data => {
            console.log('data ', data);
            if(data.length == 0) {
              throw new Error('Error Creating Category... ');
              this.openSnackBar("Error Creating Category...", "Close");
            } else {
              this.close();
              this.openSnackBar("Category Created Successfully", "Close");
            }
          },
          err => console.log(err)
        );

    }
  }

}
