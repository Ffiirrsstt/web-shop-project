import { Component } from '@angular/core';
import { CartDataService } from '../../../services/manage/cart-data.service';

@Component({
  selector: 'app-nav-cart',
  templateUrl: './nav-cart.component.html',
  styleUrl: './nav-cart.component.css',
})
export class NavCartComponent {
  sumQuantityCart!: number;
  constructor(private cartCal: CartDataService) {}
  ngOnInit(): void {
    this.useTogether();
    this.cartCal.settingQuantityItemsCart();
  }

  useTogether() {
    this.cartCal.sumQuantityCart$.subscribe((value) => {
      this.sumQuantityCart = value;
    });
  }
}
