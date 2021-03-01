import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from "./dashboard/dashboard.component";

import { AdminComponent } from "./admin/admin.component";
import { BlogdetailComponent } from './blogdetail/blogdetail.component';

const routes: Routes = [
  {path:'', component:DashboardComponent},
  {path:'admin', component:AdminComponent},
  {path:'blog/:title', component:BlogdetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
