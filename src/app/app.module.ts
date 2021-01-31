import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FlexLayoutModule} from "@angular/flex-layout";
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatListModule} from '@angular/material/list';


import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { AdminComponent } from './admin/admin.component';
import { AdminHeadComponent } from './admin-head/admin-head.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { ViewCategoriesComponent } from './view-categories/view-categories.component';
import { CreateSubcategoryComponent } from './create-subcategory/create-subcategory.component';
import { ViewSubcategoryComponent } from './view-subcategory/view-subcategory.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    AdminComponent,
    AdminHeadComponent,
    CreateCategoryComponent,
    ViewCategoriesComponent,
    CreateSubcategoryComponent,
    ViewSubcategoryComponent,
    UpdateCategoryComponent,
    CreateBlogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatSlideToggleModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatSelectModule,
    MatMenuModule,
    MatCarouselModule,
    MatCardModule,
    MatChipsModule,
    MatExpansionModule,
    MatDividerModule,
    MatDialogModule,
    MatRadioModule,
    MatInputModule,
    MatSnackBarModule,
    MatBottomSheetModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
