import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTypeComponent } from './input-type.component';

describe('InputTypeComponent', () => {
  let component: InputTypeComponent;
  let fixture: ComponentFixture<InputTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
