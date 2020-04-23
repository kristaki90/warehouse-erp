import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WarehouseErpSharedModule } from 'app/shared/shared.module';
import { PaymentTypeComponent } from './payment-type.component';
import { PaymentTypeDetailComponent } from './payment-type-detail.component';
import { PaymentTypeUpdateComponent } from './payment-type-update.component';
import { PaymentTypeDeleteDialogComponent } from './payment-type-delete-dialog.component';
import { paymentTypeRoute } from './payment-type.route';

@NgModule({
  imports: [WarehouseErpSharedModule, RouterModule.forChild(paymentTypeRoute)],
  declarations: [PaymentTypeComponent, PaymentTypeDetailComponent, PaymentTypeUpdateComponent, PaymentTypeDeleteDialogComponent],
  entryComponents: [PaymentTypeDeleteDialogComponent]
})
export class WarehouseErpPaymentTypeModule {}
