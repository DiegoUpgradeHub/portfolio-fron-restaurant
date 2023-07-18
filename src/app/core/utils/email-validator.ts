import { FormGroup } from "@angular/forms";

export const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{1,4}$/g;

export function CompareEmail (a: string, b: string) {
  return (formGroup: FormGroup) => {
    let emailFormControl = formGroup.controls[a];
    let emailRepeatFormControl = formGroup.controls[b];

    if (emailFormControl.errors && !emailRepeatFormControl.errors?.['mustMatch']) {
      emailRepeatFormControl.setErrors({ mustMatch: true });
    } else {
      emailRepeatFormControl.setErrors(null);
    }
  }
}
