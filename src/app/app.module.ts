import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCarouselModule } from '@ngmodule/material-carousel';

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


import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatSlideToggleModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatSelectModule,
    MatMenuModule,
    MatCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
