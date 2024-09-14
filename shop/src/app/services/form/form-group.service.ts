import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormGroupService {
  constructor() {}

  setFormProduct() {
    return {
      titleProduct: ['', Validators.required],
      PriceProduct: ['', Validators.required],
      InventoryProduct: ['', Validators.required],
    };
  }

  control(form: FormGroup, controlName: string) {
    return form.get(controlName) as FormControl;
  }

  setFormSignup() {
    return {
      username: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
    };
  }

  setFormLogin() {
    return {
      username: ['', Validators.required],
      password: ['', Validators.required],
    };
  }
}
