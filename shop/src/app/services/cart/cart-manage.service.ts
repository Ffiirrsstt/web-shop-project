import { Injectable } from '@angular/core';
import { CartApiFetchService } from './cart-api-fetch.service';
import { CartDataService } from './cart-data.service';
import { BehaviorSubject } from 'rxjs';
import { ProductType } from '../../../assets/Model/product-type';

@Injectable({
  providedIn: 'root',
})
export class CartManageService {
  private sumQuantityCartSubject = new BehaviorSubject<number>(0);
  sumQuantityCart$ = this.sumQuantityCartSubject.asObservable();

  constructor(
    private cartFetch: CartApiFetchService,
    private cartCal: CartDataService
  ) {}

  async settingQuantityItemsCart() {
    return new Promise((resolve, reject) => {
      this.cartFetch.fetchCartData().subscribe({
        next: (res) => {
          const sum = this.cartCal.calculateQuantityCart(res.datas.cart);
          this.sumQuantityCartSubject.next(sum);
          resolve(res);
        },
        error: (err) => {
          console.error('Error:', err);
          reject(err);
        },
      });
    });
  }

  // ดึงเฉพาะรายการในหน้าจ่ายเงิน (Checkout)
  async retrieveCartPay(settingDefault: boolean = false) {
    const productPay = (await this.retrieveCart()) as ProductType[];
    console.log(productPay);
    return this.cartCal.cartFilterSelected(productPay);
  }

  retrieveCart(settingDefault: boolean = false) {
    return new Promise((resolve, reject) => {
      this.cartFetch.fetchCartData(settingDefault).subscribe({
        next: (res) => {
          // res.datas.cart
          const list = JSON.parse(res.datas.cart);
          //เรียงตาม id ไม่งั้นเดี๋ยวรีเฟชรหน้าครั้งหนึ่ง มันก็เรียงสลับไปมา
          resolve(this.cartCal.sortById(list));
        },
        error: (err) => {
          console.error('Error:', err);
          reject(err);
        },
      });
    });
  }
}
