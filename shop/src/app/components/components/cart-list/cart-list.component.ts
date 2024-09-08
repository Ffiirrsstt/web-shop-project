import { Component, EventEmitter, Output } from '@angular/core';
import { ProductType } from '../../../../assets/Model/product-type';
import { ReadTokenService } from '../../../services/auth/read-token.service';
import { CartService } from '../../../servicesSwagger/cart.service';
import { CartDataService } from '../../../services/manage/cart-data.service';
import { productPriceQuantityType } from '../../../../assets/Model/product-price-quantity-type';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.css',
})
export class CartListComponent {
  @Output() sendProductDisplayPriceQuantity = new EventEmitter<
    Array<productPriceQuantityType>
  >();

  cartList!: any;
  productDisplayPriceQuantity!: Array<productPriceQuantityType>;
  // cartList!: Array<ProductType>;

  constructor(
    private readTk: ReadTokenService,
    private cart: CartService,
    private cartCal: CartDataService
  ) {}

  ngOnInit(): void {
    this.settingOnInit();
  }

  async settingOnInit() {
    await this.retrieveCart();
    this.manageOnInitDisplayPrice();
  }

  manageOnInitDisplayPrice() {
    if (this.cartList && this.cartList.length > 0) {
      this.productDisplayPriceQuantity = this.cartList.map(
        (item: ProductType) => {
          return {
            PriceDisplay: this.cartCal.calculatePrice(
              item.Price,
              item.Quantity
            ),
            Quantity: item.Quantity,
          };
        }
      );
      //ไว้ส่งไปแสดงยอดรวมที่ต้องชำระ
      this.sendProductDisplayPriceQuantity.emit(
        this.productDisplayPriceQuantity
      );
    } else alert('error display item.Price * item.Quantity');
  }

  retrieveCart() {
    return new Promise((resolve, reject) => {
      this.readTk.readIdUsername().subscribe(([id, username]) => {
        if (id && username) {
          this.cart.apiCartGet(id, username).subscribe({
            next: (res) => {
              // res.datas.cart
              const list = JSON.parse(res.datas.cart);
              //เรียงตาม id ไม่งั้นเดี๋ยวรีเฟชรหน้าครั้งหนึ่ง มันก็เรียงสลับไปมา
              this.cartList = this.cartCal.sortById(list);

              resolve(res);
            },
            error: (err) => {
              // จัดการกับข้อผิดพลาด
              console.error('Error:', err);
              reject(err);
            },
          });
        } else {
          reject(new Error('Invalid ID or Username'));
        }
      });
    });
  }

  receiveProductQuantity(event: {
    productIndex: number;
    productQuantity: number;
  }) {
    const { productIndex, productQuantity } = event;
    this.productDisplayPriceQuantity[productIndex].PriceDisplay =
      this.cartCal.calculatePrice(
        this.cartList[productIndex].Price,
        productQuantity
      );

    this.productDisplayPriceQuantity[productIndex].Quantity = productQuantity;

    //ไว้ส่งไปแสดงยอดรวมที่ต้องชำระ
    this.sendProductDisplayPriceQuantity.emit(this.productDisplayPriceQuantity);

    //ส่งตัวที่มีความเปลี่ยนแปลงไป (ใน api จะเช็กเรื่องซ้ำอะไรให้เอง)
    // this.cartList[productIndex] = สินค้าตัวที่มีการเปลี่ยนแปลงจำนวน
    this.cartCal.updateCart(this.cartList[productIndex], productQuantity);
  }
}
