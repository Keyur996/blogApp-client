import { FormGroup } from '@angular/forms';

export function handleError(
  controlName: string,
  type: string,
  form: FormGroup
) {
  // console.log(controlName, type);
  return (
    form.controls[controlName].hasError(type) &&
    (form.get(controlName)?.dirty || form.get(controlName)?.touched)
  );
}
