import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn  } from "@angular/forms";

// export function payableAmountValid(accountBalanceFormControl: string, paymentAmountFormControl: string) {
// 	return (paymentFormGroup: FormGroup) => {
//     const accountBalnce: FormControl = paymentFormGroup.controls[accountBalanceFormControl] as FormControl;
//     const paymentAmount: FormControl = paymentFormGroup.controls[paymentAmountFormControl] as FormControl;
//     if (paymentAmount.errors) {
//       // return if another validator has already found an error on the paymentAmount control
//       return null;
//     }
//     if(paymentAmount.value > accountBalnce.value) {
//       paymentAmount.setErrors({amountInputInvalid: true});
//     }
// }
// }

export function AgeValidator(
  control: FormGroup
): { [key: string]: boolean } | null {
  if (control.controls) {
    return { age: true };
  }
  return null;
}

export function RetypeConfirm(balance: string) {
  return (control: FormControl): { [key: string]: boolean } | null => {
      if (!control || !control.parent) {
          return null;
      }
      if (control.value && balance) {
          return { 'mismatch': true };
      }
      return null;
  };
}

