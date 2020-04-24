import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'product',
        loadChildren: () => import('./product/product.module').then(m => m.WarehouseErpProductModule)
      },
      {
        path: 'customer',
        loadChildren: () => import('./customer/customer.module').then(m => m.WarehouseErpCustomerModule)
      },
      {
        path: 'payment-type',
        loadChildren: () => import('./payment-type/payment-type.module').then(m => m.WarehouseErpPaymentTypeModule)
      },
      {
        path: 'invoice',
        loadChildren: () => import('./invoice/invoice.module').then(m => m.WarehouseErpInvoiceModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class WarehouseErpEntityModule {}
