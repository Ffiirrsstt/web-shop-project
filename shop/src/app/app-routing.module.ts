import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/page-main/main-page/main-page.component';
import { ProductDetailComponent } from './components/page-main/product-detail/product-detail.component';
import { LoginComponent } from './components/page-main/login/login.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'product/:productId', component: ProductDetailComponent },
  { path: 'login', component: LoginComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
