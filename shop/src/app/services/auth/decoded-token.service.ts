import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class DecodedTokenService {
  constructor(private token: TokenService) {}

  //ถอดรหัส token เพื่อรับข้อมูลที่ต้องการ
  decodedToken = () => {
    const jwtHelper = new JwtHelperService();
    const token = this.token.getStorageToken();
    if (token) return jwtHelper.decodeToken(token);
  };

  getId() {
    //เคยเขียนไว้ที่ constructor แล้ว บางที dataPayload จะเป็น undefind
    const dataPayload = this.decodedToken();
    if (dataPayload) return dataPayload.Id;
  }

  getUsername() {
    const dataPayload = this.decodedToken();
    if (dataPayload) return dataPayload.Username;
  }
}
