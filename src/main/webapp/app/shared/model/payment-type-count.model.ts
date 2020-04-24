import { IPaymentType } from 'app/shared/model/payment-type.model';

export interface IPaymentTypeCount {
  paymentType?: IPaymentType;
  count?: number;
}

export class PaymentTypeCount implements IPaymentTypeCount {
  constructor(public paymentType?: IPaymentType, public count?: number) {}
}
