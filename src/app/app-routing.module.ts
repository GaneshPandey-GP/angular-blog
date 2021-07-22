import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from "./dashboard/dashboard.component";

import { AdminComponent } from "./admin/admin.component";
import { BlogdetailComponent } from './blogdetail/blogdetail.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path:'', component:DashboardComponent},
  {path:'category/:categoryid', component:DashboardComponent},

  {path:'blog/:createUrl', component:BlogdetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
