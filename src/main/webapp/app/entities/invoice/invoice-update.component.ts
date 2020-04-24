import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IInvoice, Invoice } from 'app/shared/model/invoice.model';
import { InvoiceService } from './invoice.service';
import { ICustomer } from 'app/shared/model/customer.model';
import { CustomerService } from 'app/entities/customer/customer.service';
import { IPaymentType } from 'app/shared/model/payment-type.model';
import { PaymentTypeService } from 'app/entities/payment-type/payment-type.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { IProduct } from 'app/shared/model/product.model';
import { ProductService } from 'app/entities/product/product.service';

type SelectableEntity = ICustomer | IPaymentType | IUser | IProduct;

@Component({
  selector: 'jhi-invoice-update',
  templateUrl: './invoice-update.component.html'
})
export class InvoiceUpdateComponent implements OnInit {
  isSaving = false;
  customers: ICustomer[] = [];
  paymenttypes: IPaymentType[] = [];
  users: IUser[] = [];
  products: IProduct[] = [];
  createdDateDp: any;

  editForm = this.fb.group({
    id: [],
    createdDate: [],
    comments: [],
    customer: [null, Validators.required],
    paymentType: [null, Validators.required],
    user: [null, Validators.required],
    products: [null, Validators.required]
  });

  constructor(
    protected invoiceService: InvoiceService,
    protected customerService: CustomerService,
    protected paymentTypeService: PaymentTypeService,
    protected userService: UserService,
    protected productService: ProductService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ invoice }) => {
      this.updateForm(invoice);

      this.customerService.query().subscribe((res: HttpResponse<ICustomer[]>) => (this.customers = res.body || []));

      this.paymentTypeService.query().subscribe((res: HttpResponse<IPaymentType[]>) => (this.paymenttypes = res.body || []));

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));

      this.productService.query().subscribe((res: HttpResponse<IProduct[]>) => (this.products = res.body || []));
    });
  }

  updateForm(invoice: IInvoice): void {
    this.editForm.patchValue({
      id: invoice.id,
      createdDate: invoice.createdDate,
      comments: invoice.comments,
      customer: invoice.customer,
      paymentType: invoice.paymentType,
      user: invoice.user,
      products: invoice.products
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const invoice = this.createFromForm();
    if (invoice.id !== undefined) {
      this.subscribeToSaveResponse(this.invoiceService.update(invoice));
    } else {
      this.subscribeToSaveResponse(this.invoiceService.create(invoice));
    }
  }

  private createFromForm(): IInvoice {
    return {
      ...new Invoice(),
      id: this.editForm.get(['id'])!.value,
      createdDate: this.editForm.get(['createdDate'])!.value,
      comments: this.editForm.get(['comments'])!.value,
      customer: this.editForm.get(['customer'])!.value,
      paymentType: this.editForm.get(['paymentType'])!.value,
      user: this.editForm.get(['user'])!.value,
      products: this.editForm.get(['products'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInvoice>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }

  getSelected(selectedVals: IProduct[], option: IProduct): IProduct {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
