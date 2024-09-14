import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/page-main/main-page/main-page.component';
import { ProductDetailComponent } from './components/page-main/product-detail/product-detail.component';
import { LoginSignupComponent } from './components/page-main/login-signup/login-signup.component';
import { AuthGuard } from './guard/auth.guard';
import { CartComponent } from './components/page-main/cart/cart.component';
import { CheckoutComponent } from './components/page-main/checkout/checkout.component';
import { ProductManageComponent } from './components/page-main/product-manage/product-manage.component';
import { AddProductComponent } from './components/page-main/add-product/add-product.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'product', component: MainPageComponent },
  {
    path: 'product/:productId',
    component: ProductDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'management',
    component: ProductManageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'management/add/product',
    component: AddProductComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginSignupComponent },
  { path: 'signup', component: LoginSignupComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
