import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { AdminService } from '../admin-service/admin.service';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.scss']
})
export class CreateBlogComponent implements OnInit {
  categories: any = []
  subCategories: any = []

  createBlogForm = new FormGroup({
    category: new FormControl(''),
    subCategory: new FormControl(''),
    categoryid: new FormControl(''),
    subCategoryid: new FormControl(''),
    content: new FormControl('')
  })

  constructor(private adminService:AdminService, private _snackBar: MatSnackBar, public dialog: MatDialog, public dialogRef: MatDialogRef<CreateBlogComponent>){}

  data:any={};
  success(res:any){
    this.data=res;
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

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }
  selectFormControl = new FormControl('', Validators.required);

  getSubCategory(event: any) {
    this.adminService
      .viewSubCategories(event.value.categoryid)
      .subscribe(
        data => {
          console.log(data)
          if(data.length == 0) {
            throw new Error('Error Fetching Categories... ');
          } else {
            this.subCategories=data;
          }
        },
        err => console.log(err)
      );
  }

  openEditor(){
    const dialogRef = this.dialog.open(EditorComponent);
  }

  getFormData(event: any) {
    console.log(event)
    this.createBlogForm.value.category = event.value.category
    this.createBlogForm.value.categoryid = event.value.categoryid
    this.createBlogForm.value.subCategory = event.value.subCategory
    this.createBlogForm.value.subCategoryid = event.value.subCategoryid
  }
  submit() {
    console.log(this.createBlogForm.value)
  }
}
