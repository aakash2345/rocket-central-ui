import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountInfoModel } from '../models/account-info.model';

import { PaymentFormComponent } from './payment-form.component';

describe('PaymentFormComponent', () => {
  let component: PaymentFormComponent;
  let fixture: ComponentFixture<PaymentFormComponent>;
  const formInputs: AccountInfoModel = {
    name: 'John Doe',
    email: 'john.doe@hotmail.com',
    accountNumber: 567542,
    accountBalance: 500,
    paymentAmount: 499
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [PaymentFormComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  /**
   * form input name specs
   */
  it('should check the require status of name field', () => {
    const paymentFormGroupNameElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#account-form').querySelectorAll('#name')[0];
    paymentFormGroupNameElement.value = '';
    paymentFormGroupNameElement.dispatchEvent(new Event('input'));
    expect(component.paymentFormGroup.get('name')?.value).toEqual('');
    expect(component.paymentFormGroup.get('name')?.status).toEqual('INVALID');
  });

  it('should check the valid status of name field', () => {
    const paymentFormGroupNameElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#account-form').querySelectorAll('#name')[0];
    paymentFormGroupNameElement.value = 'John doe';
    paymentFormGroupNameElement.dispatchEvent(new Event('input'));
    expect(paymentFormGroupNameElement.value).toEqual(component.paymentFormGroup.get('name')?.value);
    expect(component.paymentFormGroup.get('name')?.status).toEqual('VALID');
  });

  /**
   * form input email specs
   */
  it('should display the email invalid format error message', () => {
    const paymentFormGroupEmailElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#account-form').querySelectorAll('#email')[0];
    paymentFormGroupEmailElement.value = 'john#hotmail.com';
    paymentFormGroupEmailElement.dispatchEvent(new Event('input'));
    expect(component.paymentFormGroup.get('email')?.status).toEqual('INVALID');
  });

  it('should check the valid status of email field', () => {
    const paymentFormGroupEmailElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#account-form').querySelectorAll('#email')[0];
    paymentFormGroupEmailElement.value = 'john@hotmail.com';
    paymentFormGroupEmailElement.dispatchEvent(new Event('input'));
    expect(paymentFormGroupEmailElement.value).toEqual(component.paymentFormGroup.get('email')?.value);
    expect(component.paymentFormGroup.get('email')?.status).toEqual('VALID');
  });

  /**
   * form input account number specs
   */
   it('should check the required status of account number field', () => {
    const paymentFormGroupAccountNumberElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#account-form').querySelectorAll('#accountNumber')[0];
    paymentFormGroupAccountNumberElement.value = '';
    paymentFormGroupAccountNumberElement.dispatchEvent(new Event('input'));
    expect(component.paymentFormGroup.get('accountNumber')?.status).toEqual('INVALID');
  });

  it('should check the invalid status of  account number field', () => {
    const paymentFormGroupAccountNumberElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#account-form').querySelectorAll('#accountNumber')[0];
    paymentFormGroupAccountNumberElement.value = 'XCHYKR';
    paymentFormGroupAccountNumberElement.dispatchEvent(new Event('input'));
    expect(component.paymentFormGroup.get('accountNumber')?.status).toEqual('INVALID');
  });

  it('should check the valid status of account number field', () => {
    const paymentFormGroupAccountNumberElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#account-form').querySelectorAll('#accountNumber')[0];
    paymentFormGroupAccountNumberElement.value = '67524';
    paymentFormGroupAccountNumberElement.dispatchEvent(new Event('input'));
    expect(Number(paymentFormGroupAccountNumberElement.value)).toEqual(component.paymentFormGroup.get('accountNumber')?.value);
    expect(component.paymentFormGroup.get('accountNumber')?.status).toEqual('VALID');
  });

  /**
   * form input account balance specs
   */
  it('should check the default value of the account balance field', () => {
    const paymentFormGroupAccountNumberElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#account-form').querySelectorAll('#accountBalance')[0];
    paymentFormGroupAccountNumberElement.dispatchEvent(new Event('input'));
    expect(component.paymentFormGroup.get('accountBalance')?.value).toEqual(500);
    expect(component.paymentFormGroup.get('accountBalance')?.status).toEqual('VALID');
  });

   /**
   * form input payment amount specs
   */
    it('should check the required status of payment amount field', () => {
      const paymentFormGroupPaymentAmountElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#account-form').querySelectorAll('#paymentAmount')[0];
      paymentFormGroupPaymentAmountElement.value = '';
      paymentFormGroupPaymentAmountElement.dispatchEvent(new Event('input'));
      expect(component.paymentFormGroup.get('paymentAmount')?.status).toEqual('INVALID');
    });

    it('should check the invalid status when the payment amount is greater than account balance', () => {
      const paymentFormGroupPaymentAmountElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#account-form').querySelectorAll('#paymentAmount')[0];
      paymentFormGroupPaymentAmountElement.value = '700';
      paymentFormGroupPaymentAmountElement.dispatchEvent(new Event('input'));
      expect(component.paymentFormGroup.get('paymentAmount')?.status).toEqual('INVALID');
    });

    it('should check the valid status of payment amount field', () => {
      const paymentFormGroupPaymentAmountElement: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#account-form').querySelectorAll('#paymentAmount')[0];
      paymentFormGroupPaymentAmountElement.value = '499';
      paymentFormGroupPaymentAmountElement.dispatchEvent(new Event('input'));
      expect(Number(paymentFormGroupPaymentAmountElement.value)).toEqual(component.paymentFormGroup.get('paymentAmount')?.value);
      expect(component.paymentFormGroup.get('paymentAmount')?.status).toEqual('VALID');
    });

   /**
   * form input payment amount specs
   */
    it('should check the disable status of the payment submit button when the form is invalid', () => {
      component.paymentFormGroup.setValue({...formInputs, email: 'john.doe#hotmail.com'})
      expect(component.paymentFormGroup.status).toEqual('INVALID');
    });

    it('should check the valid status of the payment submit button and emit the data', () => {
      component.paymentFormGroup.setValue(formInputs)
      expect(component.paymentFormGroup.status).toEqual('VALID');
      component.paymentSubmission$.subscribe(formValues => {
        expect(formValues).toEqual(formInputs)
      })
    });
});
