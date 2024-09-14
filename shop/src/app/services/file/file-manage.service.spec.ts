import { TestBed } from '@angular/core/testing';

import { FileManageService } from './file-manage.service';

describe('FileManageService', () => {
  let service: FileManageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileManageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
