import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayNumberIncrementDecrementComponent } from './display-number-increment-decrement.component';

describe('DisplayNumberIncrementDecrementComponent', () => {
  let component: DisplayNumberIncrementDecrementComponent;
  let fixture: ComponentFixture<DisplayNumberIncrementDecrementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayNumberIncrementDecrementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayNumberIncrementDecrementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
