import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { resLoginSingup } from '../../../../assets/Model/response-login-signup';
import { FormGroupService } from '../../../services/form/form-group.service';
import { PasswordDisplayService } from '../../../services/form/password-display.service';
import { SignupService } from '../../../servicesSwagger/signup.service';
import { DataService } from '../../../services/manage/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  @Output() sendResponseSignup = new EventEmitter<resLoginSingup>();
  loginForm!: FormGroup;

  isHidePassword = true;
  passwordDisplay: string = '';

  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private form: FormGroupService,
    private pwd: PasswordDisplayService,
    private signup: SignupService,
    private data: DataService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group(this.form.setFormLogin());
  }

  async onsubmitSignup() {
    this.isSubmitted = true;
    const dataSend = {
      username: this.loginForm.controls['username'].value,
      password: this.loginForm.controls['password'].value,
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
