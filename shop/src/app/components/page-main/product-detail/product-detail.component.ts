import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductType } from '../../../../assets/Model/product-type';
import { productDataList } from '../../../../assets/database/product-data-list';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent {
  productData!: ProductType;
  productAmount!: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.onLoadProductDetail();
  }

  async onLoadProductDetail() {
    // await this.route.queryParams.subscribe((params) => {
    //   const productId = params['productId'];
    await this.route.paramMap.subscribe(async (params) => {
      const productId = await params.get('productId');
      if (!productId) {
        alert('path ไม่ถูกต้อง');
        return;
      }

      this.getProductDetail(productId);
    });
  }

  getProductDetail(productId: string) {
    // ค้นหาข้อมูลสินค้าจากรายการ
    const data = productDataList.find((product) => product.id === productId);

    if (!data) {
      alert('ไม่พบรายการสินค้าที่ค้นหา');
      return;
    }

    this.productData = data;

    // หรือหากใช้ API, คุณสามารถเรียก API ที่นี่
    // this.productService.getProductById(id).subscribe(product => this.product = product);
  }

  receiveProductAmount(amount: number) {
    this.productAmount = amount;
  }
}
