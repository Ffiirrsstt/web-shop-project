import { TestBed } from '@angular/core/testing';

import { FileNameService } from './file-name.service';

describe('FileNameService', () => {
  let service: FileNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
