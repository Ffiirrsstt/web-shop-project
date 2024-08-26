import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormGroupService {
  constructor() {}

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
