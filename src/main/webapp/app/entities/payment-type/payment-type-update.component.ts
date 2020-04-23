import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPaymentType, PaymentType } from 'app/shared/model/payment-type.model';
import { PaymentTypeService } from './payment-type.service';

@Component({
  selector: 'jhi-payment-type-update',
  templateUrl: './payment-type-update.component.html'
})
export class PaymentTypeUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    description: [null, [Validators.required]]
  });

  constructor(protected paymentTypeService: PaymentTypeService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ paymentType }) => {
      this.updateForm(paymentType);
    });
  }

  updateForm(paymentType: IPaymentType): void {
    this.editForm.patchValue({
      id: paymentType.id,
      description: paymentType.description
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const paymentType = this.createFromForm();
    if (paymentType.id !== undefined) {
      this.subscribeToSaveResponse(this.paymentTypeService.update(paymentType));
    } else {
      this.subscribeToSaveResponse(this.paymentTypeService.create(paymentType));
    }
  }

  private createFromForm(): IPaymentType {
    return {
      ...new PaymentType(),
      id: this.editForm.get(['id'])!.value,
      description: this.editForm.get(['description'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPaymentType>>): void {
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
}
