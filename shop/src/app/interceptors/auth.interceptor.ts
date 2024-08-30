import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '../services/auth/token.service';
import { Router } from '@angular/router';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { TokenResponseOK, TokenType } from '../../assets/Model/auth-type';
import { AuthService } from '../servicesSwagger/auth.service';

@Injectable()
export class authInterceptor implements HttpInterceptor {
  constructor(
    private token: TokenService,
    private auth: AuthService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const dataToken = this.token.getStorageToken();

    if (dataToken)
      req = req.clone({ setHeaders: { Authorization: `Bearer ${dataToken}` } });

    return next.handle(req).pipe(
      catchError((err) => {
        if (err.status === 401) return this.unAythorizedHandle(req, next, err);

        return throwError(() => err);
      })
    );
  }

  unAythorizedHandle(
    req: HttpRequest<unknown>,
    next: HttpHandler,
    err: unknown
  ) {
    let tokenModel = new TokenType();
    const token = this.token.getStorageToken();
    const refreshToken = this.token.getStorageRefreshToken();
    if (token && refreshToken) {
      tokenModel.token = token;
      tokenModel.refreshToken = refreshToken;
      return this.auth.apiRefreshToken(tokenModel).pipe(
        switchMap((data: TokenResponseOK) => {
          if (data.datas) {
            const token = data.datas.token;
            const refreshToken = data.datas.refreshToken;
            if (token && refreshToken) {
              this.token.setStorageToken(token);
              this.token.setStorageRefreshToken(refreshToken);

              req = req.clone({
                setHeaders: { Authorization: `Bearer ${token}` },
              });
              return next.handle(req);
            }
          }

          return next.handle(req);
        }),
        catchError((err) => {
          return throwError(() => {
            if (err.status === 401) {
              console.log('The token has expired. Please log in again.');
              // this.toast.warning(
              //   'The token has expired. Please log in again.',
              //   'WARNING'
              // );
              // this.router.navigate(['login']);
            }

            return err;
          });
        })
      );
    } else return throwError(() => err);
  }
}
