import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-display-number-increment-decrement',
  templateUrl: './display-number-increment-decrement.component.html',
  styleUrl: './display-number-increment-decrement.component.css',
})
export class DisplayNumberIncrementDecrementComponent {
  @Input() inventory!: number;
  @Output() sendProductAmount = new EventEmitter<number>();

  //จำนวนสินค้าที่ลูกค้าจะสั่งซื้อ
  amount = 1;

  decrementAmount() {
    if (this.amount > 1) this.amount--;
    this.sendAmount();
  }
  incrementAmount() {
    if (this.amount < this.inventory) this.amount++;
    this.sendAmount();
  }

  //ทำงานเมื่อป้อนค่าเข้าไปทาง input น่ะ แต่ถ้ากดปุ่ม +/- มันไม่ทำงานนะ
  checkAmount() {
    //ถ้าป้อนจำนวนที่ต้องการซื้อมากกว่าจำนวนสินค้าทั้งหมดที่มีในคลัง
    //จะทำการแก้ไขให้ตัวเลขกลายเป็นจำนวนสินค้าสูงสุดที่มีในคลังแทน(เท่าที่มีขาย)
    if (this.amount > this.inventory) this.amount = this.inventory;
    else if (this.amount <= 0) this.amount = 1; //ใส่สินค้าที่ต้องการซื้อเป็น 0 ชิ้นหรือติดลบ ให้แก้เป็น 1 ชิ้น

    this.sendAmount();
  }

  sendAmount() {
    this.sendProductAmount.emit(this.amount);
  }
}
