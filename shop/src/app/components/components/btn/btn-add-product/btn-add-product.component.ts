import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-btn-add-product',
  templateUrl: './btn-add-product.component.html',
  styleUrl: './btn-add-product.component.css',
})
export class BtnAddProductComponent {
  @Input() btnType!: string;
}
