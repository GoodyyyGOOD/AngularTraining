import { Directive } from '@angular/core';
import { ValidationErrors,AbstractControl, ValidatorFn } from '@angular/forms';
export function contactNumberValidator(): ValidatorFn{
  return (control:AbstractControl): ValidationErrors | null =>{
    // Regular expression for the desired format (09xxxxxxxxx)
    const pattern = /^09\d{9}$/;

    // Check if the control value matches the pattern
    const isValid = pattern.test(control.value);

    // If the value is valid, return null, otherwise return an error object
    return isValid ? null : { invalidContactNumber: true };
  }
}
@Directive({
  selector: '[appContactNumber]'
})
export class ContactNumberDirective {

  constructor() { }

}
