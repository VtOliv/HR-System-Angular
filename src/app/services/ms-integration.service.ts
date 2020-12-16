import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MsIntegrationService {

  constructor(private http: HttpClient) { }

  apiUrl = `${environment.url}`

  workerAPI = `${this.apiUrl}/hr-worker/workers`
  paymentAPI = `${this.apiUrl}/hr-payroll/payments`


  getWorkers():Observable<any>{
    return this.http.get(this.workerAPI)
  }

  getWorkerById(id):Observable<any>{
    return this.http.get<any[]>(`${this.workerAPI}/${id}`)
  }

  getWorkerPayment(id,days):Observable<any>{
    return this.http.get(`${this.paymentAPI}/${id}/days/${days}`)
  }

  getWorkerPaymentAlt(form):Observable<any>{
    return this.http.post(`${this.paymentAPI}/getPayments`, form)
  }

  getWorkersPaginated(page):Observable<any>{
    return this.http.get(`${this.workerAPI}/all?page=${page}`)
  }

}
