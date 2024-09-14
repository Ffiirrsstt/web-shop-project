import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListCheckoutComponent } from './product-list-checkout.component';

describe('ProductListCheckoutComponent', () => {
  let component: ProductListCheckoutComponent;
  let fixture: ComponentFixture<ProductListCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductListCheckoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
