import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPaymentType, PaymentType } from 'app/shared/model/payment-type.model';
import { PaymentTypeService } from './payment-type.service';
import { PaymentTypeComponent } from './payment-type.component';
import { PaymentTypeDetailComponent } from './payment-type-detail.component';
import { PaymentTypeUpdateComponent } from './payment-type-update.component';

@Injectable({ providedIn: 'root' })
export class PaymentTypeResolve implements Resolve<IPaymentType> {
  constructor(private service: PaymentTypeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPaymentType> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((paymentType: HttpResponse<PaymentType>) => {
          if (paymentType.body) {
            return of(paymentType.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PaymentType());
  }
}

export const paymentTypeRoute: Routes = [
  {
    path: '',
    component: PaymentTypeComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'warehouseErpApp.paymentType.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PaymentTypeDetailComponent,
    resolve: {
      paymentType: PaymentTypeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'warehouseErpApp.paymentType.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PaymentTypeUpdateComponent,
    resolve: {
      paymentType: PaymentTypeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'warehouseErpApp.paymentType.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PaymentTypeUpdateComponent,
    resolve: {
      paymentType: PaymentTypeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'warehouseErpApp.paymentType.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
