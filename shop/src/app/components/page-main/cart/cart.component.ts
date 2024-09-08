import { Component } from '@angular/core';
import { productPriceQuantityType } from '../../../../assets/Model/product-price-quantity-type';
import { DataService } from '../../../services/manage/data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  //ไว้ใช้แสดงยอดชำระ และจำนวนสินค้าที่จะสั่งซื้อ
  cartQuantityPay!: number;
  cartPricePay!: number;
  constructor(private data: DataService) {}
  receiveDisplayPriceQuantity(event: Array<productPriceQuantityType>) {
    this.settingDataDisplayQuantity(event);
    this.settingDataDisplayPrice(event);
  }

  settingDataDisplayQuantity(displayTotalPay: Array<productPriceQuantityType>) {
    const arrayQuantity = displayTotalPay.map(
      (item: productPriceQuantityType) => item.Quantity
    );

    this.cartQuantityPay = this.data.sumArray(arrayQuantity);
  }

  settingDataDisplayPrice(displayTotalPay: Array<productPriceQuantityType>) {
    const arrayPriceDisplay = displayTotalPay.map(
      (item: productPriceQuantityType) => item.PriceDisplay
    );

    this.cartPricePay = this.data.sumArray(arrayPriceDisplay);
  }
}
