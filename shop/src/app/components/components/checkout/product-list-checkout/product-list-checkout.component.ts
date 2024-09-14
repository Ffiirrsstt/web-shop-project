import { Component, Input } from '@angular/core';
import { ProductType } from '../../../../../assets/Model/product-type';

@Component({
  selector: 'app-product-list-checkout',
  templateUrl: './product-list-checkout.component.html',
  styleUrl: './product-list-checkout.component.css',
})
export class ProductListCheckoutComponent {
  @Input() productListCheckout!: ProductType[];
}
