import { Route } from '@angular/router';
import { PaymentTypeCountsComponent } from 'app/displays/payment-type-counts/payment-type-counts.component';

export const PAYMENT_TYPE_COUNTS_ROUTE: Route = {
  path: 'counts',
  component: PaymentTypeCountsComponent,
  data: {
    authorities: [],
    pageTitle: ''
  }
};
