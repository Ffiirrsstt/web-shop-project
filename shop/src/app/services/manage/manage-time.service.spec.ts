import { TestBed } from '@angular/core/testing';

import { ManageTimeService } from './manage-time.service';

describe('ManageTimeService', () => {
  let service: ManageTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
