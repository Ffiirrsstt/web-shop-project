import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { TokenService } from '../services/auth/token.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private token: TokenService, private router: Router) {}

  canActivate(): boolean {
    if (this.token.isLogin()) return true;
    else {
      // this.toast.warning('Please log in.', 'WARNING');
      console.log('ไปหน้า login');
      this.router.navigate(['login']);
      return false;
    }
  }
}
