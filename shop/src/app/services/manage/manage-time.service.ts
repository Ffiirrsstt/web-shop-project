import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ManageTimeService {
  constructor() {}

  async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
