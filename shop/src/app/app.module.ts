import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/page-main/main-page/main-page.component';
import { NavComponent } from './components/components/nav/nav/nav/nav.component';
import { SearchComponent } from './components/components/search/search.component';
import { ProductDetailComponent } from './components/page-main/product-detail/product-detail.component';
import { PageLoadingComponent } from './components/page/page-loading/page-loading.component';
import { DisplaySlideImgComponent } from './components/components/display-slide-img/display-slide-img.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DisplayNumberIncrementDecrementComponent } from './components/components/display-number-increment-decrement/display-number-increment-decrement.component';
import { LoginComponent } from './components/components/login/login.component';
import { ProductListComponent } from './components/page-main/product-list/product-list.component';
import { NavLoginSignupComponent } from './components/components/nav/nav-login-signup/nav-login-signup.component';
import { SignupComponent } from './components/components/signup/signup.component';
import { LoginSignupComponent } from './components/page-main/login-signup/login-signup.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AlertOkComponent } from './components/components/alert/alert-ok/alert-ok.component';
import { AlertErrorComponent } from './components/components/alert/alert-error/alert-error.component';
import { AlertComponent } from './components/components/alert/alert/alert.component';
import { authInterceptor } from './interceptors/auth.interceptor';
import { NavCartComponent } from './components/components/nav/nav/nav-cart/nav-cart.component';
import { CartComponent } from './components/page-main/cart/cart.component';
import { CartListComponent } from './components/components/cart/cart-list/cart-list.component';
import { CartPaymentComponent } from './components/components/cart/cart-payment/cart-payment.component';
import { CheckoutComponent } from './components/page-main/checkout/checkout.component';
import { ProductListCheckoutComponent } from './components/components/checkout/product-list-checkout/product-list-checkout.component';
import { NavListItemsComponent } from './components/components/nav/nav/nav-list-items/nav-list-items.component';
import { ProductManageComponent } from './components/page-main/product-manage/product-manage.component';
import { AddProductComponent } from './components/page-main/add-product/add-product.component';
import { BtnAddProductComponent } from './components/components/btn/btn-add-product/btn-add-product.component';
import { InputFormControlNameTextComponent } from './components/components/input/input-form-control-name-text/input-form-control-name-text.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    NavComponent,
    SearchComponent,
    ProductListComponent,
    ProductDetailComponent,
    PageLoadingComponent,
    DisplaySlideImgComponent,
    DisplayNumberIncrementDecrementComponent,
    NavLoginSignupComponent,
    LoginComponent,
    SignupComponent,
    LoginSignupComponent,
    AlertOkComponent,
    AlertErrorComponent,
    AlertComponent,
    NavCartComponent,
    CartComponent,
    CartListComponent,
    CartPaymentComponent,
    CheckoutComponent,
    ProductListCheckoutComponent,
    NavListItemsComponent,
    ProductManageComponent,
    AddProductComponent,
    BtnAddProductComponent,
    InputFormControlNameTextComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: authInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
