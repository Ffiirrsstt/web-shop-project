import { Component, EventEmitter, Output } from '@angular/core';
import { CartManageService } from '../../../../../services/cart/cart-manage.service';
import { RoutingService } from '../../../../../services/manage/routing.service';

@Component({
  selector: 'app-nav-cart',
  templateUrl: './nav-cart.component.html',
  styleUrl: './nav-cart.component.css',
})
export class NavCartComponent {
  @Output() sendCountCart = new EventEmitter<number>();
  sumQuantityCart!: number;
  constructor(
    private cartManage: CartManageService,
    public routing: RoutingService
  ) {}
  ngOnInit(): void {
    this.useTogether();
    this.cartManage.settingQuantityItemsCart();
  }

  useTogether() {
    this.cartManage.sumQuantityCart$.subscribe((value) => {
      this.sumQuantityCart = value;
      this.sendCountCart.emit(value);
    });
  }
}
