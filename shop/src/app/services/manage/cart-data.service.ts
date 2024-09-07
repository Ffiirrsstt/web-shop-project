import { Injectable } from '@angular/core';
import { CartService } from '../../servicesSwagger/cart.service';
import { ReadTokenService } from '../auth/read-token.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartDataService {
  private sumQuantityCartSubject = new BehaviorSubject<number>(0);
  sumQuantityCart$ = this.sumQuantityCartSubject.asObservable();

  constructor(private cart: CartService, private readTk: ReadTokenService) {}

  calculateQuantityCart(cartJson: string) {
    const cartArray = JSON.parse(cartJson);

    return cartArray.reduce(
      (sum: any, obj: any) => sum + (obj.Quantity || 0),
      0
    );
  }

  settingQuantityItemsCart() {
    console.log('test');
    this.readTk.readIdUsername().subscribe(([id, username]) => {
      console.log(id);
      console.log(username);
      if (id && username) {
        this.cart.apiCartGet(id, username).subscribe({
          next: (res) => {
            const sum = this.calculateQuantityCart(res.datas.cart);
            this.sumQuantityCartSubject.next(sum);
            console.log('run');
          },
          error: (err) => {
            // จัดการกับข้อผิดพลาด
            console.error('Error:', err);
          },
        });
      }
    });
  }
}
