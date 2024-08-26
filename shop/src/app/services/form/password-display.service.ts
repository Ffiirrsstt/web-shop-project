import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class PasswordDisplayService {
  constructor() {}

  onDisplayPassword(
    event: Event,
    form: FormGroup,
    controlName: string,
    isHidePassword: boolean,
    passwordDisplay: string
  ) {
    const value = (event.target as HTMLInputElement).value;
    const passwordLength = value.length;
    //ถ้ารหัสผ่านจริงๆ น้อยกว่าที่ป้อน (หมายความว่าผู้ใช้กดลบข้อมูลน่ะ)
    if (passwordDisplay.length > passwordLength)
      passwordDisplay = passwordDisplay.slice(0, passwordLength);
    //เพิ่มตัวุสดท้าย(ที่เราป้อนเข้าไปใน input) โดยต้องใช้ตัวสุดท้าย เพราะตัวอื่น ๆ เป็น *
    else passwordDisplay += value[passwordLength - 1];
    this.displayPassword(form, isHidePassword, passwordDisplay, controlName);

    return passwordDisplay;
  }

  displayPassword(
    signupForm: FormGroup,
    isHidePassword: boolean,
    password: string,
    controlName: string
  ) {
    const passwordHide = '*'.repeat(password.length);
    const display = isHidePassword ? passwordHide : password;
    signupForm.controls[controlName].setValue(display);
  }
}
