import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { ForbiddenPageComponent } from './components/forbidden-page/forbidden-page.component';
import { FormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { AddNewProductComponent } from './components/add-new-product/add-new-product.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { DragDirective } from './directives/drag.directive';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { ShowProductDetailsComponent } from './components/show-product-details/show-product-details.component';
import { ShowProductImagesComponent } from './components/show-product-images/show-product-images.component';
@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    ForbiddenPageComponent,
    AddNewProductComponent,
    DragDirective,
    ShowProductDetailsComponent,
    ShowProductImagesComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule
  ],
  exports:[
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    ForbiddenPageComponent,
  ]
})
export class SharedModule { }
