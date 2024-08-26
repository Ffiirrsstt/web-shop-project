import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
})
export class AlertComponent {
  @Input() messageAlert = '';
  @Input() progressbar = 0;
  @Input() color!: string;
  @Output() sendMessageAlert = new EventEmitter<string>();

  closeAlert() {
    this.sendMessageAlert.emit('');
  }
}
