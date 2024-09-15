import { ElementRef, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { scrollButtonsReturn } from '../../../assets/Model/img-slide-type';

@Injectable({
  providedIn: 'root',
})
export class DisplaySlideImgService {
  scrollSize = environment.scrollSizeSlide;
  constructor() {}

  // setting scroll และ ตั้งค่าให้เลื่อนไปจุดเริ่มต้น
  settingScroll(sliderElement: HTMLElement): scrollButtonsReturn {
    if (sliderElement) {
      // รีเซ็ตการเลื่อนสไลด์
      sliderElement.scrollLeft = 0;
      sliderElement.addEventListener('scroll', () => {
        return this.updateScrollButtons(sliderElement);
      });
    }
    return;
  }

  //เช็กเพื่อดำเนินการซ่อนปุ่มเลื่อนซ้าย/ขวาของสไลด์
  updateScrollButtons(sliderElement: HTMLElement): scrollButtonsReturn {
    if (sliderElement) {
      const canScrollLeft = sliderElement.scrollLeft > 0;
      let canScrollRight;

      // พท.ทั้งหมดรวมที่ออกนอกกรอบ - พท.(กรอบ) = พท.ที่สามารถขยับเลื่อนขวาไปได้
      const scrollLeftAdjusted = this.adjustedScrollWidth(
        sliderElement.scrollLeft
      );
      const spaceMove = sliderElement.scrollWidth - sliderElement.clientWidth;
      const spaceMoveAdjusted =
        this.adjustedScrollWidth(sliderElement.scrollWidth) -
        this.adjustedScrollWidth(sliderElement.clientWidth);

      // ใช้  spaceMoveAdjusted เพื่อแก้ปัญหามันเลื่อนทีละเล็กทีละน้อย
      // มีเงื่อนไข spaceMove < this.scrollSize เพื่อแก้ปัญหาจากการใช้ spaceMoveAdjusted
      // spaceMoveAdjusted ในกรณีที่ค่า spaceMove น้อยมาก มันจะมีปัญหาทำให้ลูกศรไม่ขึ้น ทั้ง ๆ ที่ควรขึ้นมาแทน (ซึ่งทำให้เลื่อนรุปไม่ได้)
      // ดังนั้นเลยใช้เงื่อนไข spaceMove < this.scrollSize เพื่อกันปัญหาเลื่อนไม่ได้ ทั้ง ๆ ที่ควรเลื่อนเพื่อแสดงรูปได้

      if (spaceMove < this.scrollSize)
        canScrollRight =
          scrollLeftAdjusted < this.adjustedScrollWidth(spaceMove);
      else canScrollRight = scrollLeftAdjusted < spaceMoveAdjusted;

      return { canScrollLeft, canScrollRight };
    }
    return;
  }

  //ปัดให้หาร this.scrollSize ลงตัว
  //ไม่งั้นเวลาไปถึงหน้าสุดท้าย แล้วย้อนกลับมา(กดซ้าย 1 ครั้ง)
  //เมื่อจะเลื่อนไปหน้าสุดท้ายใหม่ จะต้องกดเลื่อนไปขวาสองครั้ง
  adjustedScrollWidth(data: number) {
    return Math.ceil(data / this.scrollSize) * this.scrollSize;
  }

  scrollLeft(sliderElement: HTMLElement) {
    if (sliderElement) {
      sliderElement.scrollBy({
        left: -this.scrollSize,
        behavior: 'smooth',
      });
    }
  }
}
