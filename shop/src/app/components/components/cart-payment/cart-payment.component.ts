import { Component, Input, SimpleChanges } from '@angular/core';
import { productPriceQuantityType } from '../../../../assets/Model/product-price-quantity-type';
import { DataService } from '../../../services/manage/data.service';

@Component({
  selector: 'app-cart-payment',
  templateUrl: './cart-payment.component.html',
  styleUrl: './cart-payment.component.css',
})
export class CartPaymentComponent {
  @Input() quantityPay!: number;
  @Input() pricePay!: number;
}
