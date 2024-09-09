import { Component } from '@angular/core';
import { ProductType } from '../../../../assets/Model/product-type';
import { CartManageService } from '../../../services/cart/cart-manage.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  productPay!: ProductType[];

  constructor(private cartManage: CartManageService) {}
  ngOnInit(): void {
    this.settingRetrieveCartPay();
  }

  async settingRetrieveCartPay() {
    // คัดแสดงเฉพาะที่ filed Select = true
    this.productPay =
      (await this.cartManage.retrieveCartPay()) as ProductType[];
  }
}
