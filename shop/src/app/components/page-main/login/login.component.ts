import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  environments = environment;
}
