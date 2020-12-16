import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private AuthService: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = sessionStorage.getItem('access_token')
    let newHeaders = req.headers;
    if (token) {
      newHeaders.delete('Authorization', "Basic " + btoa("myappname123" + ':' + "myappsecret123"))
      // newHeaders.set('Authorization', `Bearer ${token}`);

      newHeaders = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    }
    const authReq = req.clone({ headers: newHeaders });
    return next.handle(authReq);
  }



}