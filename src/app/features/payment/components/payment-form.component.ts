import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, NgModule, OnDestroy, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { AccountInfoModel } from '../models/account-info.model';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PaymentFormComponent implements OnDestroy {
  @Output() public paymentSubmission$: EventEmitter<AccountInfoModel> = new EventEmitter<AccountInfoModel>();

  private readonly numberPattern: RegExp = /^[0-9]*$/;
  public paymentFormGroup!: FormGroup;

  private destroy$: Subject<void> = new Subject<void>();
  constructor() {
    this.paymentFormGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email]),
      accountNumber: new FormControl(null, [Validators.pattern(this.numberPattern), Validators.required]),
      accountBalance: new FormControl(500, [Validators.required]),
      paymentAmount: new FormControl(null, [Validators.required, ])
    });

    // listens for value changes to update errors when the payment amount is greater than account balance
    this.paymentFormGroup.controls['paymentAmount'].valueChanges.pipe(takeUntil(this.destroy$)).subscribe((paymentAmountValue: number)=>{
      if(paymentAmountValue > this.paymentFormGroup.value.accountBalance) {
        this.paymentFormGroup.get('paymentAmount')?.setErrors({paymentInvalid: true});
      }
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onSubmit(): void {
    if(this.paymentFormGroup.valid){
      this.paymentSubmission$.emit({...this.paymentFormGroup?.value,
        newPaymentBalance: this.paymentFormGroup?.value?.accountBalance - this.paymentFormGroup?.value?.paymentAmount
      })
    }
  }
}
@NgModule({
  imports:[CommonModule, ReactiveFormsModule],
  declarations: [PaymentFormComponent],
  exports: [PaymentFormComponent]
})
export class PaymentFormComponentModule {}


