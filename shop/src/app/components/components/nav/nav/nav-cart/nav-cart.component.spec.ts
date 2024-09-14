import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavCartComponent } from './nav-cart.component';

describe('NavCartComponent', () => {
  let component: NavCartComponent;
  let fixture: ComponentFixture<NavCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavCartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
