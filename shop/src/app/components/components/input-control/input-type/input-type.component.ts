import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-type',
  templateUrl: './input-type.component.html',
  styleUrl: './input-type.component.css',
})
export class InputTypeComponent {
  @Input() submited!: boolean;
  @Input() form!: FormGroup;
  @Input() control!: FormControl;
  @Input() controlName!: string;
  @Input() typeInput!: string;
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() req!: boolean;
}
