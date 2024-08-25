import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
import { ActivatedRoute, Router } from '@angular/router';
import {
  resLoginSingupErrors,
  resLoginSingupOk,
} from '../../../../assets/Model/response-login-signup';
import { ManageTimeService } from '../../../services/manage/manage-time.service';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.css',
})
export class LoginSignupComponent {
  environments = environment;

  messageAlert = '';

  isSignupPage!: boolean;

  alertTimeout: any;
  //ใช้แสดงผล progressbar
  progressbar = 0;
  progressInterval!: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private manageTime: ManageTimeService
  ) {}

  ngOnInit(): void {
    this.checkCurrentPage();
  }

  //เช็กว่า path ว่าเป็น login หรือ signup
  checkCurrentPage(): void {
    const currentUrl = this.router.url;
    this.isSignupPage = currentUrl.includes('/signup');
  }

  async receiveResponseSignup(data: resLoginSingupOk | resLoginSingupErrors) {
    if (data?.status === 200) {
      this.alertOK(data);
    }

    // this.router.navigate(['/page-message'], {
    //   queryParams: { message: (data as resLoginSingupOk)?.message },
    // });
  }

  alertOK(data: resLoginSingupOk | resLoginSingupErrors) {
    this.messageAlert = (data as resLoginSingupOk)?.message;
    // ยกเลิกการปิด alert ที่รอดำเนินการอยู่ก่อนหน้านี้ (ถ้ามี) (ไม่ให้มีปัญหาเวลากดปุ่มซ้ำ ๆ แล้ว alert ทับกัน)
    if (this.alertTimeout) {
      clearTimeout(this.alertTimeout);
    }

    this.startProgressBar(this.environments.alertDelay);

    //ให้ปิด alert อัตโนมัติเมื่อผ่านไป 2 วินาที
    this.alertTimeout = setTimeout(async () => {
      this.messageAlert = '';
    }, this.environments.alertDelay);
  }

  startProgressBar(duration: number) {
    // เคลียร์ progress bar เก่าถ้ามี (ให้มันเริ่มที่ 0 ต่อให้เรากดปุ่มซ้ำ ๆ ให้ alert ขึ้นน่ะนะ)
    if (this.progressInterval)
      //ยกเลิกการเรียกใช้ requestAnimationFrame
      cancelAnimationFrame(this.progressInterval);

    // ตั้งค่าเริ่มต้น progress bar
    this.progressbar = 0;
    let startTime = performance.now(); //คือการรับเวลา ณ ค่าปัจจุบันที่แม่นยำ

    // เริ่มต้นการอัปเดต progress bar
    // requestAnimationFrame ใช้จัดการอัปเดตที่เกี่ยวกับเรนเดอร์หน้าจอบนเบาว์เซอร์ (ที่ช่วยเรื่องให้มันแสดงผลราบรื่นน่ะ)
    this.progressInterval = requestAnimationFrame((currentTime) =>
      this.updateProgressBar(currentTime, startTime, duration)
    );
  }

  updateProgressBar(currentTime: number, startTime: number, duration: number) {
    // คำนวณเวลาที่ใช้ไป
    const elapsedTime = currentTime - startTime;
    //เวลาที่ใช้หารด้วยเวลาทั้งหมด คูณ100 เพื่อคิดเป็นอัตราเปอร์เซ็น
    //อากิวเมนต์แรก คือกำหนดว่าจะแสดงผลไม่เกิน 100 (แสดงค่าที่คำนวณได้ถ้าค่าดังกล่าวไม่เกิน 100)
    this.progressbar = Math.min(100, (elapsedTime / duration) * 100);

    if (this.progressbar < 100)
      //ยังไม่เต็ม 100 เรียกใช้ซ้ำ เพื่อ update จนกว่า progressbar จะเต็ม
      this.progressInterval = requestAnimationFrame((currentnNewTime) =>
        this.updateProgressBar(currentnNewTime, startTime, duration)
      );
  }

  receiveMessageAlertOk(message: string) {
    this.messageAlert = message;
  }
}
