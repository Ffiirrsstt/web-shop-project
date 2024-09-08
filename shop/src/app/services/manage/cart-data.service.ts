import { Injectable } from '@angular/core';
import { CartService } from '../../servicesSwagger/cart.service';
import { ReadTokenService } from '../auth/read-token.service';
import { BehaviorSubject } from 'rxjs';
import { ProductType } from '../../../assets/Model/product-type';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class CartDataService {
  private sumQuantityCartSubject = new BehaviorSubject<number>(0);
  sumQuantityCart$ = this.sumQuantityCartSubject.asObservable();

  constructor(
    private cart: CartService,
    private readTk: ReadTokenService,
    private data: DataService
  ) {}

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

  settingQuantityItemsCart() {
    this.readTk.readIdUsername().subscribe(([id, username]) => {
      if (id && username) {
        this.cart.apiCartGet(id, username).subscribe({
          next: (res) => {
            const sum = this.calculateQuantityCart(res.datas.cart);
            this.sumQuantityCartSubject.next(sum);
          },
          error: (err) => {
            // จัดการกับข้อผิดพลาด
            console.error('Error:', err);
          },
        });
      }
    });
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

  updateCart(productCart: ProductType, quantity: number) {
    //ส่งเป้นตัวของชิ้นที่เปลี่ยนแปลงนะ (เฉพาะสินค้าที่เปลี่ยนแปลง)
    const dataCart = { ...productCart, quantity };
    // const dataCart = { ...this.productData, quantity: this.productQuantity };
    const dataCartJson = JSON.stringify(dataCart);
    this.readTk.readIdUsername().subscribe(([id, username]) => {
      //ข้อมูลที่จะใช้ส่งให้ api
      const dataSend = this.settingDataSend(id, username, dataCartJson);

      this.cart.apiUpdateCart(dataSend).subscribe({
        next: (response) => {
          //อัปเดตการแสดงผลตะกร้าสินค้า
          this.settingQuantityItemsCart();
        },
        error: (error) => {
          // จัดการกับข้อผิดพลาด
          console.error('Error:', error);
        },
      });
    });
  }

  sortById(dataCart: Array<ProductType>): Array<ProductType> {
    return dataCart.sort((a, b) => a.Id - b.Id);
  }
}
