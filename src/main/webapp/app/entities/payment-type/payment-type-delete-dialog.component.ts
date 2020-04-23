import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPaymentType } from 'app/shared/model/payment-type.model';
import { PaymentTypeService } from './payment-type.service';

@Component({
  templateUrl: './payment-type-delete-dialog.component.html'
})
export class PaymentTypeDeleteDialogComponent {
  paymentType?: IPaymentType;

  constructor(
    protected paymentTypeService: PaymentTypeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.paymentTypeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('paymentTypeListModification');
      this.activeModal.close();
    });
  }
}
