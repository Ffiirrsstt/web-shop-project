import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySlideImgComponent } from './display-slide-img.component';

describe('DisplaySlideImgComponent', () => {
  let component: DisplaySlideImgComponent;
  let fixture: ComponentFixture<DisplaySlideImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplaySlideImgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplaySlideImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
