import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
import { Router } from '@angular/router';
import { resLoginSingup } from '../../../../assets/Model/response-login-signup';
import { ProgressbarService } from '../../../services/components/progressbar.service';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.css',
})
export class LoginSignupComponent {
  environments = environment;
  isSignupPage!: boolean;

  messageAlert = '';
  color = '';
  progress = 0;

  constructor(
    private router: Router,
    private progressbar: ProgressbarService
  ) {}

  ngOnInit(): void {
    this.checkCurrentPage();

    this.useTogether();
  }

  // Subscribe เพื่อรับค่าแบบเรียลไทม์ (จาก services)
  useTogether() {
    this.progressbar.progress$.subscribe((progressbar) => {
      this.progress = progressbar;
    });
    this.progressbar.messageAlert$.subscribe((message) => {
      this.messageAlert = message;
    });
    this.progressbar.color$.subscribe((color) => {
      this.color = color;
    });
  }

  //เช็กว่า path ว่าเป็น login หรือ signup
  checkCurrentPage(): void {
    const currentUrl = this.router.url;
    this.isSignupPage = currentUrl.includes('/signup');
  }

  async receiveResponseSignup(data: resLoginSingup) {
    this.progressbar.alertOKError(data);

    // this.router.navigate(['/page-message'], {
    //   queryParams: { message: (data as resLoginSingupOk)?.message },
    // });
  }

  receiveMessageAlert(message: string) {
    this.messageAlert = message;
  }
}
