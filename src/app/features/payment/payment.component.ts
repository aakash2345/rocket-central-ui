import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { PaymentFormComponentModule } from './components/payment-form.component';
import { AccountInfoModel } from './models/account-info.model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentComponent  {
  public accountSummary!: AccountInfoModel;
  constructor() {}

  public onPaymentSuccess($event: AccountInfoModel): void {
    this.accountSummary = $event;
  }
}

@NgModule({
  imports:[CommonModule, PaymentFormComponentModule],
  declarations: [PaymentComponent],
  exports: [PaymentComponent]
})
export class PaymentComponentModule {}
