import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductType } from '../../../../assets/Model/product-type';
import { productDataList } from '../../../../assets/database/product-data-list';
import { ReadTokenService } from '../../../services/auth/read-token.service';
import { forkJoin, lastValueFrom, map, tap } from 'rxjs';
import { CartService } from '../../../servicesSwagger/cart.service';
import { CartDataService } from '../../../services/cart/cart-data.service';
import { CartApiUpdateService } from '../../../services/cart/cart-api-update.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent {
  productData!: ProductType;
  productQuantity = 1;

  //ราคาที่คำนวณกับจำนวนสินค้าแล้ว
  priceDisplay!: number;

  constructor(
    private route: ActivatedRoute,
    private cartCal: CartDataService,
    private cartUpdate: CartApiUpdateService
  ) {}

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

      this.getProductDetail(Number(productId));
    });
  }

  getProductDetail(productId: number) {
    // ค้นหาข้อมูลสินค้าจากรายการ
    const data = productDataList.find((product) => product.Id === productId);

    if (!data) {
      //น่าจะเด้งไปหน้า404
      alert('ไม่พบรายการสินค้าที่ค้นหา');
      return;
    }

    this.productData = data;
    this.calDisplayPrice();

    // หรือหากใช้ API, คุณสามารถเรียก API ที่นี่
    // this.productService.getProductById(id).subscribe(product => this.product = product);
  }

  addCart() {
    //ไม่ส่งว่าต้องชำระเท่าไหร่ ให้ไปคำนวณใน cart เอา เพาะเผื่อมีการเปลี่ยนแปลงราคาสินค้า
    this.cartUpdate.updateCartQuantity(this.productData, this.productQuantity);
  }

  receiveProductQuantity(event: {
    // productId: number;
    productQuantity: number;
  }) {
    const { productQuantity } = event;
    this.productQuantity = productQuantity;
    this.calDisplayPrice();
  }

  calDisplayPrice() {
    this.priceDisplay = this.cartCal.calculatePrice(
      this.productData.Price,
      this.productQuantity
    );
  }
}
