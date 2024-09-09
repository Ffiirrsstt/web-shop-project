import { Injectable } from '@angular/core';

import { ProductType } from '../../../assets/Model/product-type';
import { DataService } from '../manage/data.service';
import { productPriceQuantityType } from '../../../assets/Model/product-price-quantity-type';

@Injectable({
  providedIn: 'root',
})
export class CartDataService {
  constructor(private data: DataService) {}

  calculatePrice(price: number, quantity: number) {
    return price * quantity;
  }

  calculateQuantityCart(cartJson: string) {
    const cartArray = JSON.parse(cartJson);

    const cartArrayQuantity = cartArray.map(
      (item: ProductType) => item.Quantity
    );
    return this.data.sumArray(cartArrayQuantity);
  }

  settingDataSend(id: number, username: string, dataCartJson: string) {
    return {
      Id: id,
      Username: username,
      //แค่ไม่ให้มัน error ที่ว่าง เพราะกำหนดเอาไว้เป็น Req
      //(หมายเหตุ : Password และ PasswordConfirm กำหนเไว้เฉย ๆ อะไรก็ได้ แต่ต้องกำหนดและกำหนดเหมือนกัน)
      Password: 'passward',
      PasswordConfirm: 'passward',
      CartDetail: dataCartJson,
    };
  }

  sortById(dataCart: Array<ProductType>): Array<ProductType> {
    return dataCart.sort((a, b) => a.Id - b.Id);
  }

  cartFilterSelected(product: ProductType[] | productPriceQuantityType[]) {
    return product.filter(
      (item: ProductType | productPriceQuantityType) => item.Select === true
    );
  }
}
