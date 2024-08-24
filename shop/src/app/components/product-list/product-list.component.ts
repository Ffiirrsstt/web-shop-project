import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { productDataList } from '../../../assets/database/product-data-list';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  productList = productDataList;

  constructor(private router: Router) {}

  openProductDetail(productId: string) {
    this.router.navigate(['/product', productId]);
    // this.router.navigate(['/product'], { queryParams: { productId: productId } });
  }
}
