import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoutingService {
  constructor(private router: Router) {}

  toIndexPage() {
    this.router.navigate(['/']);
  }

  toAddProductPage() {
    this.router.navigate(['/management/add/product']);
  }

  toCartPage(quantityCart: number) {
    if (quantityCart > 0) this.router.navigate(['/cart']);
  }
}
