import { Injectable } from '@angular/core';
import {
  resLoginSingupErrors,
  resLoginSingupOk,
} from '../../../assets/Model/response-login-signup';
import { environment } from '../../../environments/environment.prod';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgressbarService {
  alertTimeout: any;
  //ใช้แสดงผล progress
  //อยากให้แชร์ progress กับ components แบบเรียลไทม์น่ะ
  private progressSubject = new BehaviorSubject<number>(0);
  progress$ = this.progressSubject.asObservable();
  // public progress = 0;
  public messageAlert = '';
  progressInterval!: any;

  constructor() {}

  alertOK(data: resLoginSingupOk | resLoginSingupErrors) {
    this.messageAlert = (data as resLoginSingupOk)?.message;
    // // ยกเลิกการปิด alert ที่รอดำเนินการอยู่ก่อนหน้านี้ (ถ้ามี) (ไม่ให้มีปัญหาเวลากดปุ่มซ้ำ ๆ แล้ว alert ทับกัน)
    if (this.alertTimeout) {
      clearTimeout(this.alertTimeout);
    }

    this.startprogress(environment.alertDelay);

    //ให้ปิด alert อัตโนมัติเมื่อผ่านไปตามที่กำหนด
    this.alertTimeout = setTimeout(async () => {
      this.messageAlert = '';
    }, environment.alertDelay);
  }

  startprogress(duration: number) {
    // เคลียร์ progress bar เก่าถ้ามี (ให้มันเริ่มที่ 0 ต่อให้เรากดปุ่มซ้ำ ๆ ให้ alert ขึ้นน่ะนะ)
    if (this.progressInterval)
      //ยกเลิกการเรียกใช้ requestAnimationFrame
      cancelAnimationFrame(this.progressInterval);

    // ตั้งค่าเริ่มต้น progress bar
    this.progressSubject.next(0);
    // this.progress = 0;
    let startTime = performance.now(); //คือการรับเวลา ณ ค่าปัจจุบันที่แม่นยำ

    // เริ่มต้นการอัปเดต progress bar
    // requestAnimationFrame ใช้จัดการอัปเดตที่เกี่ยวกับเรนเดอร์หน้าจอบนเบาว์เซอร์ (ที่ช่วยเรื่องให้มันแสดงผลราบรื่นน่ะ)
    this.progressInterval = requestAnimationFrame((currentTime) =>
      this.updateprogress(currentTime, startTime, duration)
    );
  }

  updateprogress(currentTime: number, startTime: number, duration: number) {
    // คำนวณเวลาที่ใช้ไป
    const elapsedTime = currentTime - startTime;
    //เวลาที่ใช้หารด้วยเวลาทั้งหมด คูณ100 เพื่อคิดเป็นอัตราเปอร์เซ็น
    //อากิวเมนต์แรก คือกำหนดว่าจะแสดงผลไม่เกิน 100 (แสดงค่าที่คำนวณได้ถ้าค่าดังกล่าวไม่เกิน 100)
    const progress = Math.min(100, (elapsedTime / duration) * 100);
    this.progressSubject.next(progress); // อัปเดตค่า progress ใน BehaviorSubject

    if (progress < 100)
      //ยังไม่เต็ม 100 เรียกใช้ซ้ำ เพื่อ update จนกว่า progress จะเต็ม
      this.progressInterval = requestAnimationFrame((currentnNewTime) =>
        this.updateprogress(currentnNewTime, startTime, duration)
      );
  }
}
