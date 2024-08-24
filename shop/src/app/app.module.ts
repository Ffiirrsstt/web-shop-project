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
import { FormsModule } from '@angular/forms';
import { DisplayNumberIncrementDecrementComponent } from './components/components/display-number-increment-decrement/display-number-increment-decrement.component';
import { LoginComponent } from './components/page-main/login/login.component';
import { ProductListComponent } from './components/page-main/product-list/product-list.component';
import { NavLoginSignupComponent } from './components/components/nav-login-signup/nav-login-signup.component';

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
    LoginComponent,
    NavLoginSignupComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
