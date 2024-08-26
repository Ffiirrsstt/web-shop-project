import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert-error',
  templateUrl: './alert-error.component.html',
  styleUrl: './alert-error.component.css',
})
export class AlertErrorComponent {
  @Input() messageAlert = '';
  @Input() progressbar = 0;
  @Output() sendMessageAlert = new EventEmitter<string>();

  closeAlert() {
    this.sendMessageAlert.emit('');
  }
}
