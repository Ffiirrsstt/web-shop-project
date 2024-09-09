import { Component, HostListener } from '@angular/core';
import { environment } from '../../../../../environments/environment.prod';
import { RoutingService } from '../../../../services/manage/routing.service';
import { TokenService } from '../../../../services/auth/token.service';

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

  constructor(private routing: RoutingService, public token: TokenService) {}
  toIndexPage() {
    this.routing.toIndexPage();

    // this.token.isLogin()
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isOpen = !this.isOpen;
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

  signout() {
    //เพื่อให้ปิด dropdown (ไม่งั้นมันจะขึ้นค้างเอาไว้น่ะ)
    this.isOpen = false;
    this.token.logout();
  }
}
