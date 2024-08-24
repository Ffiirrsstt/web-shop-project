import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NavComponent } from './components/nav/nav.component';
import { SearchComponent } from './components/search/search.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { PageLoadingComponent } from './components/page-loading/page-loading.component';
import { DisplaySlideImgComponent } from './components/display-slide-img/display-slide-img.component';
import { FormsModule } from '@angular/forms';
import { DisplayNumberIncrementDecrementComponent } from './components/display-number-increment-decrement/display-number-increment-decrement.component';

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
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
