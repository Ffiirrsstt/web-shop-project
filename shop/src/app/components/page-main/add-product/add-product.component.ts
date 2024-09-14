import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormGroupService } from '../../../services/form/form-group.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  AddProductSubmit!: FormGroup;
  //เคยกด submit(add product ยัง)
  //เอาไว้ให้ขึ้น error น่ะนะ
  submitFormBool = false;

  constructor(private fb: FormBuilder, private form: FormGroupService) {}

  ngOnInit(): void {
    this.setForm();
  }

  setForm() {
    this.AddProductSubmit = this.fb.group(this.form.setFormProduct());
  }

  onSubmitAddProduct() {
    this.submitFormBool = true;
    console.log('test');
    if (this.AddProductSubmit.valid) {
      console.log(this.AddProductSubmit.get('titleProduct')?.value);
    }
  }
}
