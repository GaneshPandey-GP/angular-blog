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
  selector: 'app-create-subcategory',
  templateUrl: './create-subcategory.component.html',
  styleUrls: ['./create-subcategory.component.scss']
})
export class CreateSubcategoryComponent {
  categoryNameControl = new FormControl('', [
      Validators.required,
    ]);

  selectFormControl = new FormControl('', Validators.required);

  matcher = new MyErrorStateMatcher();

  createSubCategoryForm = new FormGroup({
    name: new FormControl(''),
    category: new FormControl('')
  });

  constructor(private adminService:AdminService, private router: Router, private _snackBar: MatSnackBar, public dialogRef: MatDialogRef<CreateSubcategoryComponent>){}
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }
  createSubCategory() {
    console.log(this.createSubCategoryForm.value);

    if(this.createSubCategoryForm.value.name!='' && this.createSubCategoryForm.value.category!=''){
      // this.adminService
      //   .createSubCategory(this.createSubCategoryForm.value.name, this.createSubCategoryForm.value.category)
      //   .subscribe(
      //     data => {
      //       console.log('data ', data);
      //       if(data.length == 0) {
      //         throw new Error('Error Creating Sub-Category... ');
      //         this.openSnackBar("Error Registering User", "Close");
      //       } else {
      //         this.success(data);
      //         this.openSnackBar("Sub-Category Created Successfully", "Close");
      //       }
      //     },
      //     err => console.log(err)
      //   );
      this.openSnackBar("Sub-Category Created Successfully", "Close");
      this.close();
    }
  }
  close(): void {
    this.dialogRef.close();
  }
}
