import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from "./dashboard/dashboard.component";
import  { TrendingComponent } from "./trending/trending.component";

const routes: Routes = [
  {path:'dashboard', component:DashboardComponent},
  {path:'latest', component:TrendingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
