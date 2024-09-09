import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { resLoginSingup } from '../../../../assets/Model/response-login-signup';
import { FormGroupService } from '../../../services/form/form-group.service';
import { DataService } from '../../../services/manage/data.service';
import { LoginService } from '../../../servicesSwagger/login.service';
import { TokenService } from '../../../services/auth/token.service';
import { Router } from '@angular/router';
import { UserStoreService } from '../../../services/auth/user-store.service';
import { DecodedTokenService } from '../../../services/auth/decoded-token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  @Output() sendResponseLogin = new EventEmitter<resLoginSingup>();
  loginForm!: FormGroup;

  isLogin = false;

  constructor(
    private fb: FormBuilder,
    private form: FormGroupService,
    private login: LoginService,
    private data: DataService,
    private token: TokenService,
    private decodedTk: DecodedTokenService,
    private router: Router,
    private userStore: UserStoreService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group(this.form.setFormLogin());
  }

  async onsubmitLogin() {
    this.isLogin = true;
    const pwd = this.loginForm.controls['password'].value;
    const dataSend = {
      username: this.loginForm.controls['username'].value,
      password: pwd,
      //ใส่ไปไม่ให้ error เพราะตัวเช็กที่อยู่ใน c# น่ะ
      passwordConfirm: pwd,
    };

    await this.login.apiLogin(dataSend).subscribe({
      next: (res) => {
        this.token.setStorageToken(res.datas.token);
        this.token.setStorageRefreshToken(res.datas.refreshToken);

        const decodedToken = this.decodedTk.decodedToken();
        if (decodedToken) {
          this.userStore.setUsername(decodedToken.Username);
          this.userStore.setUsername(decodedToken.Id);
          // this.userStore.setRole(decodedToken.role);
          // this.userStore.setGoogleAccount(decodedToken.unique_name);
          // this.userStore.setEmailContact(decodedToken.email);
          // this.userStore.setFirstName(decodedToken.FirstName);
          // this.userStore.setLastName(decodedToken.LastName);
        }

        this.sendResponseLogin.emit({ status: 200, message: res.message });
        this.router.navigate(['product']);
      },
      error: (err) => {
        const message = this.data.displayError(err, true);

        this.sendResponseLogin.emit({ status: err.status, message });
      },
    });
  }
}
