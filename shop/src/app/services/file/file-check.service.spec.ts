import { TestBed } from '@angular/core/testing';

import { FileCheckService } from './file-check.service';

describe('FileCheckService', () => {
  let service: FileCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
