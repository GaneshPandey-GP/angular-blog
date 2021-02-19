import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../admin-service/admin.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Inject} from '@angular/core';

@Component({
  selector: 'app-update-blog',
  templateUrl: './update-blog.component.html',
  styleUrls: ['./update-blog.component.scss']
})
export class UpdateBlogComponent implements OnInit {
  categories: any = []
  subCategories: any = []

  updateBlogForm:  FormGroup

  constructor(@Inject(MAT_DIALOG_DATA) public blogInfo: any, private formBuilder: FormBuilder, private adminService:AdminService, private _snackBar: MatSnackBar, public dialog: MatDialog, public dialogRef: MatDialogRef<UpdateBlogComponent>){}

  data:any={};
  success(res:any){
    this.data=res;
  }

  ngOnInit() {

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
      
      this.updateBlogForm = this.formBuilder.group({
        category: this.blogInfo.blogInfo.category,
        subCategory: this.blogInfo.blogInfo.subCategory,
        categoryid: this.blogInfo.blogInfo.categoryid,
        subCategoryid: this.blogInfo.blogInfo.subCategoryid,
        title: this.blogInfo.blogInfo.title,
        content: this.blogInfo.blogInfo.content,
        thumbnail: this.blogInfo.blogInfo.thumbnail
      });
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

  handleImgChange = (event: any) => {
    let file = event.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload =  () => 
     this.updateBlogForm.patchValue({
       thumbnail: reader.result
     })
,
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 };

  submit() {
    console.log(this.updateBlogForm.value)
    this.adminService
      .updateBlog(this.blogInfo.blogInfo.blogid, this.updateBlogForm.value.subCategory.category, this.updateBlogForm.value.subCategory.categoryid, this.updateBlogForm.value.subCategory.name, this.updateBlogForm.value.subCategory.subCategoryid, this.updateBlogForm.value.title, this.updateBlogForm.value.content, this.updateBlogForm.value.thumbnail)
      .subscribe(
        data => {
          console.log('data ', data);
          if(data.status == 1) {
            this.success(data);
            this.openSnackBar("Blog Updated Successfully", "Close");
          } else {
            throw new Error('Error Creating Blog... ');
            this.openSnackBar("Error Updating Blog", "Close");
          }
        },
        err => console.log(err)
      );
  }
}