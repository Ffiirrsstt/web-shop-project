import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { environment } from '../../../../../../environments/environment.prod';
import { RoutingService } from '../../../../../services/manage/routing.service';
import { TokenService } from '../../../../../services/auth/token.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  environments = environment;
  //เทสว่า login อยู่มั้้ย
  loggedIn = false;
  // loggedIn = true;
  isOpen = false;
  quantityCart!: number;

  constructor(
    public routing: RoutingService,
    public token: TokenService,
    private cdr: ChangeDetectorRef
  ) {}

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isOpen = !this.isOpen;
  }

  receiveCountCart(count: number) {
    this.quantityCart = count;
    this.cdr.detectChanges();
  }

  // ปิด dropdown เมื่อคลิกที่ตำแหน่งอื่นบนเอกสาร
  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event) {
    const target = event.target as HTMLElement;
    // ถ้าไม่พบองค์ประกอบ (จากที่คลิก) ที่มีคลาส relative (หมายถึงการคลิกนอก dropdown)
    if (!target.closest('.relative')) {
      this.isOpen = false;
    }
  }
}
