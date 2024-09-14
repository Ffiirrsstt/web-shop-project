import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  getStorageToken = () => sessionStorage.getItem('token');
  setStorageToken = (token: string) => sessionStorage.setItem('token', token);

  getStorageRefreshToken = () => sessionStorage.getItem('refreshToken');
  setStorageRefreshToken = (refresh: string) =>
    sessionStorage.setItem('refreshToken', refresh);

  // !!แปลงให้เป็น boolean
  isLogin = () => !!this.getStorageToken();

  logout = () => sessionStorage.clear();
  // sessionStorage.removeItem('token');
}
