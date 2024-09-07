import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
})
export class AlertComponent {
  @Input() messageAlert = '';
  @Input() progressbar = 0;
  @Input() title!: string;
  @Input() color!: string;
  @Output() sendMessageAlert = new EventEmitter<string>();

  // ไม่ใช้เป็น
  // title = '';
  // ใช้เป็น Input เพราะบางครั้งในกรณีที่กดซ้ำ ๆ มันจะมีปัญหาการแก้ผล

  closeAlert() {
    this.sendMessageAlert.emit('');
  }
}
