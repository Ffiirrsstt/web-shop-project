import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFormControlNameTextComponent } from './input-form-control-name-text.component';

describe('InputFormControlNameTextComponent', () => {
  let component: InputFormControlNameTextComponent;
  let fixture: ComponentFixture<InputFormControlNameTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputFormControlNameTextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputFormControlNameTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
