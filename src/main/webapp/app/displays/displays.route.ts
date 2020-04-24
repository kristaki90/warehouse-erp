import { Routes } from '@angular/router';

export const DISPLAYS_ROUTE: Routes = [
  {
    path: 'payment-type',
    loadChildren: () => import('./payment-type-counts/payment-type-counts.module').then(m => m.PaymentTypeCountsModule)
  }
];
