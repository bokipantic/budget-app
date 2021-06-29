import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      const authReq = req.clone({ setHeaders: { Authorization: token } }); // Authorization: `Bearer ${ token }`
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}
