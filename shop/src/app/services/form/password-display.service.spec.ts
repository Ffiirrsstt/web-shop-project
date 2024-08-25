import { TestBed } from '@angular/core/testing';

import { PasswordDisplayService } from './password-display.service';

describe('PasswordDisplayService', () => {
  let service: PasswordDisplayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordDisplayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
