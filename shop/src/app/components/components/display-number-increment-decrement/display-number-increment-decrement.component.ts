import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-display-number-increment-decrement',
  templateUrl: './display-number-increment-decrement.component.html',
  styleUrl: './display-number-increment-decrement.component.css',
})
export class DisplayNumberIncrementDecrementComponent {
  @Input() inventory!: number;
  //จำนวนสินค้าที่ลูกค้าจะสั่งซื้อ
  @Input() productQuantity!: number;
  @Input() index!: number;
  @Output() sendProductQuantity = new EventEmitter<{
    productIndex: number;
    productQuantity: number;
  }>();

  decrementQuantity() {
    if (this.productQuantity > 1) this.productQuantity--;
    this.sendQuantity();
  }
  incrementQuantity() {
    if (this.productQuantity < this.inventory) this.productQuantity++;
    this.sendQuantity();
  }

  //ทำงานเมื่อป้อนค่าเข้าไปทาง input น่ะ แต่ถ้ากดปุ่ม +/- มันไม่ทำงานนะ
  checkQuantity() {
    //ถ้าป้อนจำนวนที่ต้องการซื้อมากกว่าจำนวนสินค้าทั้งหมดที่มีในคลัง
    //จะทำการแก้ไขให้ตัวเลขกลายเป็นจำนวนสินค้าสูงสุดที่มีในคลังแทน(เท่าที่มีขาย)
    if (this.productQuantity > this.inventory)
      this.productQuantity = this.inventory;
    else if (this.productQuantity <= 0) this.productQuantity = 1; //ใส่สินค้าที่ต้องการซื้อเป็น 0 ชิ้นหรือติดลบ ให้แก้เป็น 1 ชิ้น

    this.sendQuantity();
  }

  sendQuantity() {
    this.sendProductQuantity.emit({
      productIndex: this.index,
      productQuantity: this.productQuantity,
    });

    //บันทึกการเปลี่ยนแปลงตะกร้าสินค้าด้วย
  }
}
