import { Component } from '@angular/core';
import { CartManageService } from '../../../../services/cart/cart-manage.service';

@Component({
  selector: 'app-nav-cart',
  templateUrl: './nav-cart.component.html',
  styleUrl: './nav-cart.component.css',
})
export class NavCartComponent {
  sumQuantityCart!: number;
  constructor(private cartManage: CartManageService) {}
  ngOnInit(): void {
    this.useTogether();
    this.cartManage.settingQuantityItemsCart();
  }

  useTogether() {
    this.cartManage.sumQuantityCart$.subscribe((value) => {
      this.sumQuantityCart = value;
    });
  }
}
