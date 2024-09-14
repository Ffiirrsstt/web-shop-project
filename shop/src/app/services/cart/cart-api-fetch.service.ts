import { Injectable } from '@angular/core';
import { CartDataService } from './cart-data.service';
import { ReadTokenService } from '../auth/read-token.service';
import { Observable } from 'rxjs';
import { CartService } from '../../servicesSwagger/cart.service';

@Injectable({
  providedIn: 'root',
})
export class CartApiFetchService {
  constructor(
    private cartCal: CartDataService,
    private readTk: ReadTokenService,
    private cart: CartService
  ) {}

  // มีตัวมาเรียกใช้ fetchCartData อีกที ที่กำหนด selectDefault default เป็น false เหมือนกัน
  // แต่ต้องมากำหนด selectDefault: boolean = false ตรงนี้อีกที
  // เพราะมันบังคับมาจากทางส่วนของ api services (file servicesSwagger)
  fetchCartData(selectDefault: boolean = false): Observable<any> {
    return new Observable((observer) => {
      this.readTk.readIdUsername().subscribe({
        next: ([id, username]) => {
          if (id && username) {
            this.cart.apiCartGet(id, username, selectDefault).subscribe({
              next: (res) => observer.next(res),
              error: (err) => observer.error(err),
            });
          } else {
            observer.error(new Error('Invalid ID or Username'));
          }
        },
        error: (err) => observer.error(err),
      });
    });
  }
}
