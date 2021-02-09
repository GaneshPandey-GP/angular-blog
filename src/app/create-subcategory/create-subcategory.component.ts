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
  subCategoryForm = new FormGroup({
    category: new FormControl(''),
    subCategory: new FormControl('')
  })
  categoryNameControl = new FormControl('', [
      Validators.required,
    ]);

  selectFormControl = new FormControl('', Validators.required);

  matcher = new MyErrorStateMatcher();

  constructor(private adminService:AdminService, private router: Router, private _snackBar: MatSnackBar, public dialogRef: MatDialogRef<CreateSubcategoryComponent>){}
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }
  categories: any = [];
  ngOnInit() {
    this.adminService.viewCategories().subscribe(
      (data) => {
        if (data.length == 0) {
          throw new Error('Error Fetching States... ');
        } else {
          this.categories = data;
        }
      },
      (err) => console.log(err)
    );
  }
  data:any={};
  success(res:any){
    this.data=res;
  }
  submit() {
    console.log(this.subCategoryForm.value);

    if(this.subCategoryForm.value.subCategory!='' && this.subCategoryForm.value.category!=''){
      this.adminService
        .createSubCategory(this.subCategoryForm.value.subCategory, this.subCategoryForm.value.category.name, this.subCategoryForm.value.category.categoryid)
        .subscribe(
          data => {
            console.log('data ', data);
            if(data.length == 0) {
              throw new Error('Error Creating Sub-Category... ');
              this.openSnackBar("Error Registering User", "Close");
            } else {
              this.success(data);
              this.openSnackBar("Sub-Category Created Successfully", "Close");
            }
          },
          err => console.log(err)
        );
      this.openSnackBar("Sub-Category Created Successfully", "Close");
      this.close();
    }
  }
  close(): void {
    this.dialogRef.close();
  }
}
