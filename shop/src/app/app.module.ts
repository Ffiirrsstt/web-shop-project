import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/page-main/main-page/main-page.component';
import { NavComponent } from './components/components/nav/nav.component';
import { SearchComponent } from './components/components/search/search.component';
import { ProductDetailComponent } from './components/page-main/product-detail/product-detail.component';
import { PageLoadingComponent } from './components/page/page-loading/page-loading.component';
import { DisplaySlideImgComponent } from './components/components/display-slide-img/display-slide-img.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DisplayNumberIncrementDecrementComponent } from './components/components/display-number-increment-decrement/display-number-increment-decrement.component';
import { LoginComponent } from './components/components/login/login.component';
import { ProductListComponent } from './components/page-main/product-list/product-list.component';
import { NavLoginSignupComponent } from './components/components/nav-login-signup/nav-login-signup.component';
import { SignupComponent } from './components/components/signup/signup.component';
import { LoginSignupComponent } from './components/page-main/login-signup/login-signup.component';
import { HttpClientModule } from '@angular/common/http';
import { AlertOkComponent } from './components/components/alert/alert-ok/alert-ok.component';
import { AlertErrorComponent } from './components/components/alert/alert-error/alert-error.component';
import { AlertComponent } from './components/components/alert/alert/alert.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
