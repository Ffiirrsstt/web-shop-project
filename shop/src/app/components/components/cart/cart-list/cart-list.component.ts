import { Component, EventEmitter, Output } from '@angular/core';
import { ProductType } from '../../../../../assets/Model/product-type';
import { CartDataService } from '../../../../services/cart/cart-data.service';
import { productPriceQuantityType } from '../../../../../assets/Model/product-price-quantity-type';
import { CartApiUpdateService } from '../../../../services/cart/cart-api-update.service';
import { CartManageService } from '../../../../services/cart/cart-manage.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.css',
})
export class CartListComponent {
  @Output() sendProductDisplayPriceQuantity = new EventEmitter<
    Array<productPriceQuantityType>
  >();

  productDisplayPriceQuantity!: Array<productPriceQuantityType>;
  cartList!: Array<ProductType>;

  constructor(
    private cartCal: CartDataService,
    private cartUpdate: CartApiUpdateService,
    private cartManage: CartManageService
  ) {}

  ngOnInit(): void {
    this.settingOnInit();
  }

  async settingOnInit() {
    await this.retrieveCart();
    // เกี่ยวกับการแสดงผลราคาสินค้าแต่ละชิ้น
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
            // ตั้งค่าเริ่มต้นของ Select เป็น false (ยังไม่ได้เลือกสินค้าที่จะชำระเงิน)
            Select: false,
          };
        }
      );
      //ไว้ส่งไปแสดงยอดรวมที่ต้องชำระ
      this.sendToPayment();
    } else alert('error display item.Price * item.Quantity');
  }

  async retrieveCart() {
    this.cartList = (await this.cartManage.retrieveCart(true)) as ProductType[];
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
    this.sendToPayment();

    //ส่งตัวที่มีความเปลี่ยนแปลงไป (ใน api จะเช็กเรื่องซ้ำอะไรให้เอง)
    // this.cartList[productIndex] = สินค้าตัวที่มีการเปลี่ยนแปลงจำนวน
    this.cartUpdate.updateCartQuantity(
      this.cartList[productIndex],
      productQuantity
    );
  }

  //ไว้ส่งไปแสดงยอดรวมที่ต้องชำระ
  //กรองส่งไปเฉพาะค่าที่ติ๊ก checkbox
  sendToPayment() {
    const dataSend = this.cartCal.cartFilterSelected(
      this.productDisplayPriceQuantity
    ) as productPriceQuantityType[];
    this.sendProductDisplayPriceQuantity.emit(dataSend);
  }

  sendSelectedProductPay(index: number) {
    // บันทึกการเปลี่ยนแปลง (เรื่องการเลือกรายการน่ะ เพื่อนำไปใช้ในการดึงข้อมูล (api) ตอนไปหน้าชำระเงิน)
    this.cartUpdate.updateCartSelect(
      this.cartList[index],
      this.productDisplayPriceQuantity[index].Select
    );

    //จัดการกับข้อมูลที่ส่งไปให้แสดง (พวกยอดเงิน ,จำนวนของ) (มันจะกรองให้ เอาเฉพาะที่เลือกน่ะ)
    this.sendToPayment();
  }
}
