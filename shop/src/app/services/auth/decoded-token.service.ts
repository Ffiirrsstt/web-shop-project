import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class DecodedTokenService {
  private dataPayload: any;

  constructor(private token: TokenService) {
    this.dataPayload = this.decodedToken();
  }

  //ถอดรหัส token เพื่อรับข้อมูลที่ต้องการ
  decodedToken = () => {
    const jwtHelper = new JwtHelperService();
    const token = this.token.getStorageToken();
    if (token) return jwtHelper.decodeToken(token);
  };

  getUsername() {
    if (this.dataPayload) return this.dataPayload.Username;
  }

  getId() {
    if (this.dataPayload) return this.dataPayload.Id;
  }
}
