import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WarehouseErpTestModule } from '../../../test.module';
import { CustomerDetailComponent } from 'app/entities/customer/customer-detail.component';
import { Customer } from 'app/shared/model/customer.model';

describe('Component Tests', () => {
  describe('Customer Management Detail Component', () => {
    let comp: CustomerDetailComponent;
    let fixture: ComponentFixture<CustomerDetailComponent>;
    const route = ({ data: of({ customer: new Customer(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WarehouseErpTestModule],
        declarations: [CustomerDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CustomerDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CustomerDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load customer on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.customer).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
