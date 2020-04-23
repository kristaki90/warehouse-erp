export interface ICustomer {
  id?: number;
  companyName?: string;
  vatNumber?: number;
  phone?: string;
  mobile?: string;
  address?: string;
}

export class Customer implements ICustomer {
  constructor(
    public id?: number,
    public companyName?: string,
    public vatNumber?: number,
    public phone?: string,
    public mobile?: string,
    public address?: string
  ) {}
}
