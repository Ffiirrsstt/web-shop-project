import { TestBed } from '@angular/core/testing';

import { DisplaySlideImgService } from './display-slide-img.service';

describe('DisplaySlideImgService', () => {
  let service: DisplaySlideImgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisplaySlideImgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
