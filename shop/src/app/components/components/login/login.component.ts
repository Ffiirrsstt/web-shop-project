import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { resLoginSingup } from '../../../../assets/Model/response-login-signup';
import { FormGroupService } from '../../../services/form/form-group.service';
import { PasswordDisplayService } from '../../../services/form/password-display.service';
import { DataService } from '../../../services/manage/data.service';
import { LoginService } from '../../../servicesSwagger/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  @Output() sendResponseLogin = new EventEmitter<resLoginSingup>();
  loginForm!: FormGroup;

  isHidePassword = true;
  passwordDisplay: string = '';

  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private form: FormGroupService,
    private pwd: PasswordDisplayService,
    private login: LoginService,
    private data: DataService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group(this.form.setFormLogin());
  }

  async onsubmitSignup() {
    this.isSubmitted = true;
    const pwd = this.loginForm.controls['password'].value;
    const dataSend = {
      username: this.loginForm.controls['username'].value,
      password: pwd,
      //ใส่ไปไม่ให้ error เพราะตัวเช็กที่อยู่ใน c# น่ะ
      passwordConfirm: pwd,
    };

    await this.login.apiLogin(dataSend).subscribe({
      next: (res) => {
        this.sendResponseLogin.emit({ status: 200, message: res.message });
      },
      error: (err) => {
        const message = this.data.displayError(err);

        this.sendResponseLogin.emit({ status: err.status, message });
      },
    });
  }

  onHidePassword(event: Event) {
    this.passwordDisplay = this.pwd.onDisplayPassword(
      event,
      this.loginForm,
      'password',
      this.isHidePassword,
      this.passwordDisplay
    );
  }

  onIsHidePassword() {
    this.isHidePassword = !this.isHidePassword;
    this.pwd.displayPassword(
      this.loginForm,
      this.isHidePassword,
      this.passwordDisplay,
      'password'
    );
  }
}
