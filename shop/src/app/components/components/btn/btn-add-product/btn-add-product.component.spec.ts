import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnAddProductComponent } from './btn-add-product.component';

describe('BtnAddProductComponent', () => {
  let component: BtnAddProductComponent;
  let fixture: ComponentFixture<BtnAddProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BtnAddProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnAddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
