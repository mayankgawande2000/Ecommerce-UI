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
import { ProductViewDetailsComponent } from './shared/components/product-view-details/product-view-details.component';
import { BuyProductComponent } from './shared/components/buy-product/buy-product.component';
import { BuyProductResolverService } from './shared/service/buy-product-resolver.service';
import { OrderConfirmationComponent } from './shared/components/order-confirmation/order-confirmation.component';
import { RegisterComponent } from './shared/components/register/register.component';
import { CartComponent } from './shared/components/cart/cart.component';
import { MyOrdersComponent } from './shared/components/my-orders/my-orders.component';
import { OrderDetailsComponent } from './shared/components/order-details/order-details.component';

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
  },
  {
    path: 'productViewDetails',
    component:ProductViewDetailsComponent,
    resolve:{
      product:ProductResolverService
    }
  },
  {
    path:'buyProduct',
    component: BuyProductComponent,
    canActivate:[AuthGuard],
    data:{roles:['User']},
    resolve:{
      productDetails: BuyProductResolverService
    }

  },
  {
    path:'orderConfirm',
    component: OrderConfirmationComponent,
    canActivate:[AuthGuard],
    data:{roles:['User']},
  },
  {
    path:'cart',
    component: CartComponent,
    canActivate:[AuthGuard],
    data:{roles:['User']},
  },
  {
    path:'myOrders',
    component: MyOrdersComponent,
    canActivate:[AuthGuard],
    data:{roles:['User']},
  },
  {
    path: 'orderInformation', component: OrderDetailsComponent,
    canActivate:[AuthGuard],
    data:{roles:['Admin']}
  },
  {
    path:'register',
    component: RegisterComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
