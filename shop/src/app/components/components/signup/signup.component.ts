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

  isHidePassword = true;
  //เก็บ password จริง ๆ เอาไว้ใช้แสดงผล
  passwordDisplay: string = '';
  isHidePasswordConfirm = true;
  passwordDisplayConfirm: string = '';

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
      password: this.signupForm.controls['password'].value,
      passwordConfirm: this.signupForm.controls['passwordConfirm'].value,
    };

    await this.signup.apiSignup(dataSend).subscribe({
      next: (res) => {
        this.sendResponseSignup.emit({ status: 200, message: res.message });
      },
      error: (err) => {
        const message = this.data.displayError(err.error.errors);

        this.sendResponseSignup.emit({ status: err.status, message });
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
