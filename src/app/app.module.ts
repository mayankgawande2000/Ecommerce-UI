import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './shared/_auth/auth.guard';
import { AuthInterceptor } from './shared/_auth/auth.interceptor';
import { UserService } from './shared/service/user.service';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    SharedModule,
    AdminModule,
    UserModule, 
    FormsModule,
    HttpClientModule,
    RouterModule,
    MatToolbarModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptor,
      multi:true
    },
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
