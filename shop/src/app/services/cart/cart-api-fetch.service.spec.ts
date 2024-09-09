import { TestBed } from '@angular/core/testing';

import { CartApiFetchService } from './cart-api-fetch.service';

describe('CartApiFetchService', () => {
  let service: CartApiFetchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartApiFetchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
