export interface IPaymentType {
  id?: number;
  description?: string;
}

export class PaymentType implements IPaymentType {
  constructor(public id?: number, public description?: string) {}
}
