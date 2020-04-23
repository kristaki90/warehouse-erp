import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPaymentType } from 'app/shared/model/payment-type.model';

type EntityResponseType = HttpResponse<IPaymentType>;
type EntityArrayResponseType = HttpResponse<IPaymentType[]>;

@Injectable({ providedIn: 'root' })
export class PaymentTypeService {
  public resourceUrl = SERVER_API_URL + 'api/payment-types';

  constructor(protected http: HttpClient) {}

  create(paymentType: IPaymentType): Observable<EntityResponseType> {
    return this.http.post<IPaymentType>(this.resourceUrl, paymentType, { observe: 'response' });
  }

  update(paymentType: IPaymentType): Observable<EntityResponseType> {
    return this.http.put<IPaymentType>(this.resourceUrl, paymentType, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPaymentType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPaymentType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
