import { Moment } from 'moment';
import { ICustomer } from 'app/shared/model/customer.model';
import { IPaymentType } from 'app/shared/model/payment-type.model';
import { IUser } from 'app/core/user/user.model';
import { IProduct } from 'app/shared/model/product.model';

export interface IInvoice {
  id?: number;
  createdDate?: Moment;
  comments?: string;
  customer?: ICustomer;
  paymentType?: IPaymentType;
  user?: IUser;
  products?: IProduct[];
}

export class Invoice implements IInvoice {
  constructor(
    public id?: number,
    public createdDate?: Moment,
    public comments?: string,
    public customer?: ICustomer,
    public paymentType?: IPaymentType,
    public user?: IUser,
    public products?: IProduct[]
  ) {}
}
