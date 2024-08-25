import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { interval, Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-alert-ok',
  templateUrl: './alert-ok.component.html',
  styleUrl: './alert-ok.component.css',
})
export class AlertOkComponent {
  @Input() messageAlertOk = '';
  @Input() progress = 0;
  // @Input() startProgress: boolean = true;
  @Output() sendMessageAlertOk = new EventEmitter<string>();

  closeAlert() {
    this.sendMessageAlertOk.emit('');
  }
}
