import { Component, OnInit } from '@angular/core';
import { InvoiceService } from 'app/entities/invoice/invoice.service';
import { IPaymentTypeCount } from 'app/shared/model/payment-type-count.model';

@Component({
  selector: 'jhi-payment-type-counts',
  templateUrl: './payment-type-counts.component.html',
  styleUrls: ['payment-type-counts.scss']
})
export class PaymentTypeCountsComponent implements OnInit {
  public paymentTypeCounts: IPaymentTypeCount[] | undefined;

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    this.invoiceService.getPaymentTypeCounts().subscribe(
      result => {
        this.paymentTypeCounts = result;
        console.error(this.paymentTypeCounts);
      },
      error => {
        console.error('Something went wrong ' + JSON.stringify(error));
      }
    );
  }
}
