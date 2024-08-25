import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.css',
})
export class LoginSignupComponent {
  environments = environment;

  isSignupPage!: boolean;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.checkCurrentPage();
  }

  //เช็กว่า path ว่าเป็น login หรือ signup
  checkCurrentPage(): void {
    const currentUrl = this.router.url;
    this.isSignupPage = currentUrl.includes('/signup');
  }
}
