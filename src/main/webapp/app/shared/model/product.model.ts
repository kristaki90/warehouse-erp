export interface IProduct {
  id?: number;
  name?: string;
  barcode?: string;
  description?: string;
  unit?: string;
  price?: number;
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public name?: string,
    public barcode?: string,
    public description?: string,
    public unit?: string,
    public price?: number
  ) {}
}
