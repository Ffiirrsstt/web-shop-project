import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { productDataList } from '../../../../assets/database/product-data-list';
import { ProgressbarService } from '../../../services/components/progressbar.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  productList = productDataList;

  //ใช้ใน alert
  messageAlert = '';
  colorAlert!: string;
  titleAlert!: string;
  progress = 0;

  constructor(
    private router: Router,
    private progressbar: ProgressbarService
  ) {}

  ngOnInit(): void {
    this.useTogether();
  }

  openProductDetail(productId: number) {
    this.router.navigate(['/product', productId]);
    // this.router.navigate(['/product'], { queryParams: { productId: productId } });
  }

  receiveMessageAlert(message: string) {
    this.progressbar.closeAlert();
  }

  // Subscribe เพื่อรับค่าแบบเรียลไทม์ (จาก services)
  useTogether() {
    this.progressbar.progress$.subscribe((progressbar) => {
      this.progress = progressbar;
    });
    this.progressbar.messageAlert$.subscribe((message) => {
      this.messageAlert = message;
    });
    this.progressbar.colorAlert$.subscribe((color) => {
      this.colorAlert = color;
    });
    this.progressbar.titleAlert$.subscribe((text) => {
      this.titleAlert = text;
    });
  }
}
