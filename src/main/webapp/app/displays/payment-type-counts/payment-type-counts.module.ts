import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WarehouseErpSharedModule } from 'app/shared/shared.module';
import { PaymentTypeCountsComponent } from 'app/displays/payment-type-counts/payment-type-counts.component';
import { PAYMENT_TYPE_COUNTS_ROUTE } from 'app/displays/payment-type-counts/payment-type-counts.route';

@NgModule({
  imports: [WarehouseErpSharedModule, RouterModule.forChild([PAYMENT_TYPE_COUNTS_ROUTE])],
  declarations: [PaymentTypeCountsComponent]
})
export class PaymentTypeCountsModule {}
