import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { WarehouseErpTestModule } from '../../../test.module';
import { PaymentTypeUpdateComponent } from 'app/entities/payment-type/payment-type-update.component';
import { PaymentTypeService } from 'app/entities/payment-type/payment-type.service';
import { PaymentType } from 'app/shared/model/payment-type.model';

describe('Component Tests', () => {
  describe('PaymentType Management Update Component', () => {
    let comp: PaymentTypeUpdateComponent;
    let fixture: ComponentFixture<PaymentTypeUpdateComponent>;
    let service: PaymentTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WarehouseErpTestModule],
        declarations: [PaymentTypeUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PaymentTypeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PaymentTypeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PaymentTypeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PaymentType(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new PaymentType();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
