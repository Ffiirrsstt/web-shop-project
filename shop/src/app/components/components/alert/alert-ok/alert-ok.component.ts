import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { interval, Subject, take, takeUntil } from 'rxjs';
import { environment } from '../../../../../environments/environment.prod';

@Component({
  selector: 'app-alert-ok',
  templateUrl: './alert-ok.component.html',
  styleUrl: './alert-ok.component.css',
})
export class AlertOkComponent {
  @Input() messageAlert = '';
  @Input() progressbar = 0;
  @Output() sendMessageAlert = new EventEmitter<string>();

  closeAlert() {
    this.sendMessageAlert.emit('');
  }
}
