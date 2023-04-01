import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin/components/admin-dashboard/admin-dashboard.component';
import { AddNewProductComponent } from './shared/components/add-new-product/add-new-product.component';
import { ForbiddenPageComponent } from './shared/components/forbidden-page/forbidden-page.component';
import { HomeComponent } from './shared/components/home/home.component';
import { LoginComponent } from './shared/components/login/login.component';
import { ShowProductDetailsComponent } from './shared/components/show-product-details/show-product-details.component';
import { ProductResolverService } from './shared/service/product-resolver.service';
import { AuthGuard } from './shared/_auth/auth.guard';
import { UserDashboardComponent } from './user/components/user-dashboard/user-dashboard.component';

const routes: Routes = [
  {
    path:'', component:HomeComponent
  },
  {
    path:'admin', component:AdminDashboardComponent,
    canActivate:[AuthGuard],
    data:{roles:['Admin']}
  },
  {
    path:'user', component:UserDashboardComponent,
    canActivate:[AuthGuard],
    data:{roles:['User']}
  },
  {
    path:'login', component:LoginComponent
  },
  {
    path:'forbidden', component:ForbiddenPageComponent
  },
  {
    path:'addNewProduct', component:AddNewProductComponent,
    canActivate:[AuthGuard],
    data:{roles:['Admin']},
    resolve:{
      product: ProductResolverService
    }
  },
  {
    path: 'showProductDetails', component: ShowProductDetailsComponent,
    canActivate:[AuthGuard],
    data:{roles:['Admin']}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
