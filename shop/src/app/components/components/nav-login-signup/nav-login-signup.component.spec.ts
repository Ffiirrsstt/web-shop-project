import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavLoginSignupComponent } from './nav-login-signup.component';

describe('NavLoginSignupComponent', () => {
  let component: NavLoginSignupComponent;
  let fixture: ComponentFixture<NavLoginSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavLoginSignupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavLoginSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
