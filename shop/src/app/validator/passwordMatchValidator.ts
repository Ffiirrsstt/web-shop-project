import { ValidationErrors, FormGroup } from '@angular/forms';

export function passwordMatchValidator(
  password: string,
  passwordConfirm: string
) {
  return (form: FormGroup): ValidationErrors | null => {
    // if (!form.get(password) || !form.get(passwordConfirm)) {
    //   return null;
    // }
    //ถ้าตรงกันไม่ return error และถ้าไม่ตรงก็ return error mismatch
    return form.get(password)?.value === form.get(passwordConfirm)?.value
      ? null
      : { mismatch: true };
  };
}
