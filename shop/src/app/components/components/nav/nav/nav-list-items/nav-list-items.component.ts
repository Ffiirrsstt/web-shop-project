import { Component, Input } from '@angular/core';
import { TokenService } from '../../../../../services/auth/token.service';
import { RoutingService } from '../../../../../services/manage/routing.service';
import { ReadTokenService } from '../../../../../services/auth/read-token.service';

@Component({
  selector: 'app-nav-list-items',
  templateUrl: './nav-list-items.component.html',
  styleUrl: './nav-list-items.component.css',
})
export class NavListItemsComponent {
  @Input() isOpen!: boolean;
  @Input() sumQuantityCart!: number;

  role!: string;

  constructor(
    public token: TokenService,
    public routing: RoutingService,
    private readTk: ReadTokenService
  ) {}

  ngOnInit(): void {
    this.readRoleToken();
  }

  signout() {
    //เพื่อให้ปิด dropdown (ไม่งั้นมันจะขึ้นค้างเอาไว้น่ะ)
    this.isOpen = false;
    this.token.logout();
  }

  readRoleToken() {
    this.readTk.readRole().subscribe((role) => {
      this.role = role;
    });
  }
}
