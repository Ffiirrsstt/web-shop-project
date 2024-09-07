import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductType } from '../../../../assets/Model/product-type';
import { productDataList } from '../../../../assets/database/product-data-list';
import { ReadTokenService } from '../../../services/auth/read-token.service';
import { forkJoin, lastValueFrom, map, tap } from 'rxjs';
import { CartService } from '../../../servicesSwagger/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent {
  productData!: ProductType;
  productAmount = 1;

  //ราคาที่คำนวณกับจำนวนสินค้าแล้ว
  priceDisplay!: number;

  constructor(
    private route: ActivatedRoute,
    private readTk: ReadTokenService,
    private cart: CartService
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

      this.getProductDetail(productId);
    });
  }

  getProductDetail(productId: string) {
    // ค้นหาข้อมูลสินค้าจากรายการ
    const data = productDataList.find((product) => product.id === productId);

    if (!data) {
      //น่าจะเด้งไปหน้า404
      alert('ไม่พบรายการสินค้าที่ค้นหา');
      return;
    }

    this.productData = data;
    this.calculatePrice();

    // หรือหากใช้ API, คุณสามารถเรียก API ที่นี่
    // this.productService.getProductById(id).subscribe(product => this.product = product);
  }

  calculatePrice() {
    this.priceDisplay = this.productData.price * this.productAmount;
  }

  addCart() {
    //ไม่ส่งว่าต้องชำระเท่าไหร่ ให้ไปคำนวณใน cart เอา เพาะเผื่อมีการเปลี่ยนแปลงราคาสินค้า
    const dataCart = { ...this.productData, quantity: this.productAmount };
    const dataCartJson = JSON.stringify(dataCart);

    this.readTk.readIdUsername().subscribe(([id, username]) => {
      //ข้อมูลที่จะใช้ส่งให้ api
      const dataSend = {
        Id: id,
        Username: username,
        //แค่ไม่ให้มัน error ที่ว่าง เพราะกำหนดเอาไว้เป็น Req
        //(หมายเหตุ : Password และ PasswordConfirm กำหนเไว้เฉย ๆ อะไรก็ได้ แต่ต้องกำหนดและกำหนดเหมือนกัน)
        Password: 'passward',
        PasswordConfirm: 'passward',
        CartDetail: dataCartJson,
      };

      console.log(dataCartJson);

      this.cart.apiUpdateCart(dataSend).subscribe({
        next: (response) => {
          // จัดการกับข้อมูลที่ได้รับจากการตอบกลับ
          console.log('Success:', response);
        },
        error: (error) => {
          // จัดการกับข้อผิดพลาด
          console.error('Error:', error);
        },
      });
    });
  }

  receiveProductAmount(amount: number) {
    this.productAmount = amount;
    this.calculatePrice();
  }
}
