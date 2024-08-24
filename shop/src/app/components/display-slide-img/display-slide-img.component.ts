import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { ProductType } from '../../../assets/Model/product-type';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-display-slide-img',
  templateUrl: './display-slide-img.component.html',
  styleUrl: './display-slide-img.component.css',
})
export class DisplaySlideImgComponent {
  @ViewChild('slider') slider!: ElementRef;

  @Input() product!: ProductType;

  imgBigDisplay!: string;
  canScrollLeft = false;
  canScrollRight = true;

  scrollSize = environment.scrollSizeSlide;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (this.product) this.imgBigDisplay = this.product.allImg[0];
  }

  ngAfterViewInit(): void {
    this.updateScrollButtons();

    const sliderElement = this.slider.nativeElement;
    sliderElement.addEventListener('scroll', () => this.updateScrollButtons());

    // บังคับให้ Angular ทำการตรวจสอบการเปลี่ยนแปลงอีกครั้ง ถ้าไม่มีบรรทัดนี้ จะมีคำเตือนขึ้นมา
    this.cdr.detectChanges();
  }

  scrollLeft() {
    const sliderElement = this.slider.nativeElement;
    sliderElement.scrollBy({
      left: -this.scrollSize,
      behavior: 'smooth',
    });

    this.updateScrollButtons();
  }

  scrollRight() {
    const sliderElement = this.slider.nativeElement;
    sliderElement.scrollBy({
      left: this.scrollSize,
      behavior: 'smooth',
    });

    this.updateScrollButtons();
  }

  //เช็กเพื่อดำเนินการซ่อนปุ่มเลื่อนซ้าย/ขวาของสไลด์
  updateScrollButtons() {
    const sliderElement = this.slider.nativeElement;
    this.canScrollLeft = sliderElement.scrollLeft > 0;
    this.canScrollRight =
      this.adjustedScrollWidth(sliderElement.scrollLeft) <
      this.adjustedScrollWidth(sliderElement.scrollWidth) -
        this.adjustedScrollWidth(sliderElement.clientWidth);
  }

  //ปัดให้หาร 100 ลงตัว
  //ไม่งั้นเวลาไปถึงหน้าสุดท้าย แล้วย้อนกลับมา(กดซ้าย 1 ครั้ง)
  //เมื่อจะเลื่อนไปหน้าสุดท้ายใหม่ จะต้องกดเลื่อนไปขวาสองครั้ง
  adjustedScrollWidth(data: number) {
    return Math.ceil(data / this.scrollSize) * this.scrollSize;
  }

  changeDisplayImgBig(path: string) {
    this.imgBigDisplay = path;
  }
}
