import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    title: new FormControl(''),
    thumbnail: new FormControl(''),
    content: new FormControl(''),
    desc: new FormControl('')

  })

  constructor(private adminService:AdminService, private _snackBar: MatSnackBar, public dialog: MatDialog, public dialogRef: MatDialogRef<CreateBlogComponent>){}

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
      this.createBlogForm.patchValue({
        thumbnail: reader.result
      })
,
     reader.onerror = function (error) {
       console.log('Error: ', error);
     };
  };

  submit() {
    this.adminService
      .createBlog(this.createBlogForm.value.subCategory.category, this.createBlogForm.value.subCategory.categoryid, this.createBlogForm.value.subCategory.name, this.createBlogForm.value.subCategory.subCategoryid, this.createBlogForm.value.title, this.createBlogForm.value.desc, this.createBlogForm.value.content, this.createBlogForm.value.thumbnail)
      .subscribe(
        data => {
          console.log('data ', data);
          if(data.status == 1) {
            this.success(data);
            this.openSnackBar("Blog Created Successfully", "Close");
          } else {
            throw new Error('Error Creating Blog... ');
            this.openSnackBar("Error Creating Blog", "Close");
          }
        },
        err => console.log(err)
      );
  }
}
