import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
import { RoutingService } from '../../../services/manage/routing.service';

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

  constructor(private routing: RoutingService) {}
  toIndexPage() {
    this.routing.toIndexPage();
  }
}
