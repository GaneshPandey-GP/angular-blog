import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import {Router} from '@angular/router';
import { AdminService } from '../admin-service/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userData: any = {};
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })
  
  constructor(private router: Router, private adminService: AdminService, private _snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

  
  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem("user"));
    if(this.userData.length > 0) this.router.navigate([""]);
  }

  submit(){
    this.adminService.login(this.loginForm.value.username, this.loginForm.value.password)
    .subscribe(
      data => {
        if(data.length == 0) {
          throw new Error('Error logging User... ');
          this.openSnackBar("Error logging User...", "Close");
        } else {
          localStorage.setItem("user", JSON.stringify(data));
          this.router.navigate([""]);
          this.openSnackBar("User Created Successfully", "Close");
        }
      },
      err => console.log(err)
    )
  }

  }
  
