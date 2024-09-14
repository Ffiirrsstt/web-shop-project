import { Component } from '@angular/core';
import { RoutingService } from '../../../services/manage/routing.service';

@Component({
  selector: 'app-product-manage',
  templateUrl: './product-manage.component.html',
  styleUrl: './product-manage.component.css',
})
export class ProductManageComponent {
  constructor(public routing: RoutingService) {}
}
