import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-form-control-name-text',
  templateUrl: './input-form-control-name-text.component.html',
  styleUrl: './input-form-control-name-text.component.css',
})
export class InputFormControlNameTextComponent {
  @Input() submited!: boolean;
  @Input() form!: FormGroup;
  @Input() control!: FormControl;
  @Input() controlName!: string;
  @Input() typeInput!: boolean;
  @Input() req!: boolean;
}
