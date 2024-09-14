import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { passwordMatchValidator } from '../../../validator/passwordMatchValidator';
import { FormGroupService } from '../../../services/form/form-group.service';
import { PasswordDisplayService } from '../../../services/form/password-display.service';
import { SignupService } from '../../../servicesSwagger/signup.service';
import { resLoginSingup } from '../../../../assets/Model/response-login-signup';
import { DataService } from '../../../services/manage/data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  @Output() sendResponseSignup = new EventEmitter<resLoginSingup>();

  signupForm!: FormGroup;

  // เช็กว่ามีการ submit ไปยัง ใช้เวลาไม่แก้ไข input แต่กด submit ไปแล้วให้สามารถขึ้น error เตือนน่ะ (small)
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private form: FormGroupService,
    private pwd: PasswordDisplayService,
    private signup: SignupService,
    private data: DataService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group(this.form.setFormSignup(), {
      validator: passwordMatchValidator('password', 'passwordConfirm'),
    });
  }

  async onsubmitSignup() {
    this.isSubmitted = true;
    const dataSend = {
      username: this.signupForm.controls['username'].value,
      password: this.signupForm.controls['password'].value, //เพราะไม่งั้นมันจะไปเก็บในฐานข้อมูลเป็น *** งี้น่ะ
      passwordConfirm: this.signupForm.controls['passwordConfirm'].value, //เพราะไม่งั้นมันจะไปเก็บในฐานข้อมูลเป็น *** งี้น่ะ
    };

    await this.signup.apiSignup(dataSend).subscribe({
      next: (res) => {
        this.sendResponseSignup.emit({ status: 200, message: res.message });
      },
      error: (err) => {
        console.log(err);
        const message = this.data.displayError(err);

        this.sendResponseSignup.emit({ status: err.status, message });
      },
    });
  }
}
