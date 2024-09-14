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
  cartQuantityPay!: string;
  cartPricePay!: string;

  cartProductSelectedPay!: Array<boolean>;

  constructor(private data: DataService) {}

  settingDataDisplayQuantity(displayTotalPay: Array<productPriceQuantityType>) {
    const arrayQuantity = displayTotalPay.map(
      (item: productPriceQuantityType) => item.Quantity
    );

    this.cartQuantityPay = this.data.sumArray(arrayQuantity).toLocaleString();
  }

  settingDataDisplayPrice(displayTotalPay: Array<productPriceQuantityType>) {
    const arrayPriceDisplay = displayTotalPay.map(
      (item: productPriceQuantityType) => item.PriceDisplay
    );

    this.cartPricePay = this.data.sumArray(arrayPriceDisplay).toLocaleString();
  }

  receiveDisplayPriceQuantity(event: Array<productPriceQuantityType>) {
    this.settingDataDisplayQuantity(event);
    this.settingDataDisplayPrice(event);
  }

  receiveSelectProduct(productSelected: Array<boolean>) {
    this.cartProductSelectedPay = productSelected;
  }
}
