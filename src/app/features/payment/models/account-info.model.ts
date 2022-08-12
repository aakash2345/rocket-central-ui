export interface AccountInfoModel {
  name: string;
  email?: string;
  accountNumber: number;
  accountBalance: number;
  paymentAmount: number;
  newPaymentBalance?: number;
}
