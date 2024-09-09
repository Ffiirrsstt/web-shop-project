import { Component } from '@angular/core';
import { environment } from '../../../../../environments/environment.prod';
import { RoutingService } from '../../../../services/manage/routing.service';

@Component({
  selector: 'app-nav-login-signup',
  templateUrl: './nav-login-signup.component.html',
  styleUrl: './nav-login-signup.component.css',
})
export class NavLoginSignupComponent {
  environments = environment;
  constructor(private routing: RoutingService) {}
  toIndexPage() {
    this.routing.toIndexPage();
  }
}
