import { Component, Input, SimpleChanges } from '@angular/core';
import { productPriceQuantityType } from '../../../../../assets/Model/product-price-quantity-type';
import { DataService } from '../../../../services/manage/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-payment',
  templateUrl: './cart-payment.component.html',
  styleUrl: './cart-payment.component.css',
})
export class CartPaymentComponent {
  // .toLocaleString() ถูกใช้ตั้งแต่ส่งมาให้แล้ว (ไม่ได้ไปเรียกในหน้า html เพราะเหมือนตอนแรกมีปัญหาไม่แสดงผล)
  @Input() quantityPay!: string;
  @Input() pricePay!: string;

  constructor(private router: Router) {}

  ToCheckout() {
    this.router.navigate(['/checkout']);
  }
}
