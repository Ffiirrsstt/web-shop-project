import { Injectable } from '@angular/core';
import { ReadTokenService } from '../auth/read-token.service';
import { CartDataService } from './cart-data.service';
import { ProductType } from '../../../assets/Model/product-type';
import { CartService } from '../../servicesSwagger/cart.service';
import { CartManageService } from './cart-manage.service';

@Injectable({
  providedIn: 'root',
})
export class CartApiUpdateService {
  constructor(
    private readTk: ReadTokenService,
    private cartCal: CartDataService,
    private cart: CartService,
    private cartManage: CartManageService
  ) {}

  updateCartQuantity(productCart: ProductType, quantity: number) {
    //ส่งเป้นตัวของชิ้นที่เปลี่ยนแปลงนะ (เฉพาะสินค้าที่เปลี่ยนแปลง)
    const dataCart = { ...productCart, Quantity: quantity };
    this.updateCart(dataCart);
  }

  updateCartSelect(productCart: ProductType, select: boolean) {
    const dataSend = { ...productCart, Select: select };
    // บันทึกการเปลี่ยนแปลง (เรื่องการเลือกรายการน่ะ เพื่อนำไปใช้ในการดึงข้อมูล (api) ตอนไปหน้าชำระเงิน)
    this.updateCart(dataSend);
    return dataSend;
  }

  updateCart(dataCart: ProductType) {
    const dataCartJson = JSON.stringify(dataCart);
    this.readTk.readIdUsername().subscribe(([id, username]) => {
      //ข้อมูลที่จะใช้ส่งให้ api
      const dataSend = this.cartCal.settingDataSend(id, username, dataCartJson);

      this.cart.apiUpdateCart(dataSend).subscribe({
        next: (response) => {
          //อัปเดตการแสดงผลตะกร้าสินค้า
          this.cartManage.settingQuantityItemsCart();
        },
        error: (error) => {
          // จัดการกับข้อผิดพลาด
          console.error('Error:', error);
        },
      });
    });
  }
}
