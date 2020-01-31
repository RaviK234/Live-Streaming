import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UtilitiesService } from './utilities.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  cloned;
  token;
  constructor(private utility: UtilitiesService) {
    console.log('Interceptor');
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.utility.getToken()) {
      this.cloned = req.clone({
        headers: req.headers.set('authorization', 'Bearer ' + this.utility.getToken().access_token)
      });
      return next.handle(this.cloned);
    }
    return next.handle(req);
  }
}
