import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { passwordMatchValidator } from '../../../validator/passwordMatchValidator';
import { FormGroupService } from '../../../services/form/form-group.service';
import { PasswordDisplayService } from '../../../services/form/password-display.service';
import { SignupService } from '../../../servicesSwagger/signup.service';
import { resLoginSingup } from '../../../../assets/Model/response-login-signup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  @Output() sendResponseSignup = new EventEmitter<resLoginSingup>();

  signupForm!: FormGroup;

  isHidePassword = true;
  //เก็บ password จริง ๆ เอาไว้ใช้แสดงผล
  passwordDisplay: string = '';
  isHidePasswordConfirm = true;
  passwordDisplayConfirm: string = '';

  constructor(
    private fb: FormBuilder,
    private form: FormGroupService,
    private pwd: PasswordDisplayService,
    private signup: SignupService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group(this.form.setFormSignup(), {
      validator: passwordMatchValidator('password', 'passwordConfirm'),
    });
  }

  async onsubmitSignup() {
    //ย้ายไปเช็กใน api
    // if (
    //   this.signupForm.controls['username'].hasError('required') ||
    //   this.signupForm.controls['password'].hasError('required') ||
    //   this.signupForm.controls['passwordConfirm'].hasError('required')
    // ) {
    //   alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    //   return;
    // }
    // const errors = this.signupForm.errors;
    // if (errors && errors['mismatch']) {
    //   alert('รหัสผ่านไม่ตรงกัน');
    //   return;
    // }

    const dataSend = {
      username: this.signupForm.controls['username'].value,
      password: this.signupForm.controls['password'].value,
      passwordConfirm: this.signupForm.controls['passwordConfirm'].value,
    };

    await this.signup.apiSignup(dataSend).subscribe({
      next: (res) => {
        this.sendResponseSignup.emit({ status: 200, message: res.message });
      },
      error: (err) => {
        console.error(err);

        console.log(err.error.errors);
      },
    });
  }

  onHidePassword(event: Event) {
    this.passwordDisplay = this.pwd.onDisplayPassword(
      event,
      this.signupForm,
      'password',
      this.isHidePassword,
      this.passwordDisplay
    );
  }

  onHidePasswordConfirm(event: Event) {
    this.passwordDisplayConfirm = this.pwd.onDisplayPassword(
      event,
      this.signupForm,
      'passwordConfirm',
      this.isHidePasswordConfirm,
      this.passwordDisplayConfirm
    );
  }

  onIsHidePassword() {
    this.isHidePassword = !this.isHidePassword;
    this.pwd.displayPassword(
      this.signupForm,
      this.isHidePassword,
      this.passwordDisplay,
      'password'
    );
  }

  onIsHidePasswordConfirm() {
    this.isHidePasswordConfirm = !this.isHidePasswordConfirm;
    this.pwd.displayPassword(
      this.signupForm,
      this.isHidePasswordConfirm,
      this.passwordDisplayConfirm,
      'passwordConfirm'
    );
  }
}
