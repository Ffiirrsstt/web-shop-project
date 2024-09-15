import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  ProductImgType,
  ProductType,
} from '../../../../assets/Model/product-type';
import { environment } from '../../../../environments/environment.prod';
import { DisplaySlideImgService } from '../../../services/display/display-slide-img.service';
import { scrollButtonsReturn } from '../../../../assets/Model/img-slide-type';

@Component({
  selector: 'app-display-slide-img',
  templateUrl: './display-slide-img.component.html',
  styleUrl: './display-slide-img.component.css',
})
export class DisplaySlideImgComponent {
  @ViewChild('slider') slider?: ElementRef; // ใช้ ? ทำให้ TypeScript รู้ว่าอาจจะเป็น undefined

  @Input() product!: ProductType | ProductImgType;

  imgBigDisplay!: string;
  canScrollLeft!: boolean;
  canScrollRight!: boolean;

  scrollSize = environment.scrollSizeSlide;

  constructor(
    private cdr: ChangeDetectorRef,
    private slide: DisplaySlideImgService
  ) {}

  hasImages(): boolean {
    return Array.isArray(this.product.AllImg) && this.product.AllImg.length > 0;
  }

  // product ถ้าตัวนี้มันเปลี่ยน ให้รีเซ็ตค่าใน Component ทุกครั้ง (เพื่อให้ Components ประมวลผลทุกอย่างใหม่อะนะ)
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product']) {
      this.resetComponent();

      this.cdr.detectChanges(); // บังคับให้ Angular ตรวจสอบการเปลี่ยนแปลง
    }
  }

  ngAfterViewInit(): void {
    this.resetComponent();
  }

  // รีเซ็ต Component และตั้งค่าใหม่
  resetComponent(): void {
    if (this.product) {
      this.imgBigDisplay = this.product.AllImg[0]; // ตั้งค่าเริ่มต้นภาพใหญ่
    }
    this.controlScrollSlider();
  }

  // ตั้งค่าสำหรับ Scroll Slider และให้สไลด์เลื่อนไปจุดเริ่มต้น
  controlScrollSlider() {
    // ตั้งค่าการแสดงผลลูกศรซ้าย-ขวา
    const sliderElement = this.slider?.nativeElement;
    this.callUpdateScroll(sliderElement);

    this.callSettingScroll(sliderElement);

    // บังคับให้ Angular ทำการตรวจสอบการเปลี่ยนแปลงอีกครั้ง ถ้าไม่มีบรรทัดนี้ จะมีคำเตือนขึ้นมา
    this.cdr.detectChanges();
  }

  callSettingScroll(sliderElement: HTMLElement) {
    const canScroll = this.slide.settingScroll(sliderElement);
    this.settingCanScroll(canScroll);
  }

  callUpdateScroll(sliderElement: HTMLElement) {
    if (sliderElement) {
      const canScroll = this.slide.updateScrollButtons(sliderElement);
      this.settingCanScroll(canScroll);
    }
  }

  settingCanScroll(canScroll: scrollButtonsReturn) {
    if (canScroll) {
      console.log(canScroll);
      this.canScrollLeft = canScroll.canScrollLeft;
      this.canScrollRight = canScroll.canScrollRight;
    }
  }

  scrollLeft() {
    const sliderElement = this.slider?.nativeElement;
    if (sliderElement) {
      sliderElement.scrollBy({
        left: -this.scrollSize,
        behavior: 'smooth',
      });

      this.callUpdateScroll(sliderElement);
    }
  }

  scrollRight() {
    const sliderElement = this.slider?.nativeElement;
    if (sliderElement) {
      sliderElement.scrollBy({
        left: this.scrollSize,
        behavior: 'smooth',
      });

      this.callUpdateScroll(sliderElement);
    }
  }

  changeDisplayImgBig(path: string) {
    this.imgBigDisplay = path;
  }
}
