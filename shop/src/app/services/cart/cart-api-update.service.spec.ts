import { TestBed } from '@angular/core/testing';

import { CartApiUpdateService } from './cart-api-update.service';

describe('CartApiUpdateService', () => {
  let service: CartApiUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartApiUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
