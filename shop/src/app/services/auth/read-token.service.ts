import { Injectable } from '@angular/core';
import { UserStoreService } from './user-store.service';
import { DecodedTokenService } from './decoded-token.service';
import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReadTokenService {
  constructor(
    private userStore: UserStoreService,
    private decodedTk: DecodedTokenService
  ) {}

  readUsername() {
    return this.userStore.getUsername().pipe(
      // ใช้ map เพื่อตรวจสอบและคืนค่าที่เหมาะสม
      map((value: string) => this.decodedTk.getUsername())
    );
  }

  readId() {
    return this.userStore
      .getId()
      .pipe(map((value: number) => this.decodedTk.getId()));
  }

  readRole() {
    return this.userStore
      .getRole()
      .pipe(map((value: string) => this.decodedTk.getRole()));
  }

  readIdUsername() {
    // ใช้ combineLatest เพื่อรวมค่าเป็น Observable เดียว
    return combineLatest([this.readId(), this.readUsername()]);
  }
}
