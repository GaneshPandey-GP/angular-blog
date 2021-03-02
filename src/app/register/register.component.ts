import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../admin-service/admin.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirm_password: new FormControl(''),
  })
  constructor(private adminService: AdminService, private _snackBar: MatSnackBar, private router: Router) { }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }
  
  ngOnInit(): void {
  }

  submit(){
    if(this.registerForm.value.password === this.registerForm.value.confirm_password){
    this.adminService.register(this.registerForm.value.username, this.registerForm.value.email, this.registerForm.value.password)
    .subscribe(
      data => {
        if(data.Status === "1") {
          this.router.navigate(["/login"]);
          this.openSnackBar("User Created Successfully", "Close");
        } else {
          throw new Error('Error Creating User... ');
          this.openSnackBar("Error Creating User...", "Close");
        }
      },
      err => console.log(err)
    )
    }
  }
}
