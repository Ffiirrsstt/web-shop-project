import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/page-main/main-page/main-page.component';
import { ProductDetailComponent } from './components/page-main/product-detail/product-detail.component';
import { LoginComponent } from './components/components/login/login.component';
import { LoginSignupComponent } from './components/page-main/login-signup/login-signup.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'product/:productId', component: ProductDetailComponent },
  { path: 'login', component: LoginSignupComponent },
  { path: 'signup', component: LoginSignupComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
