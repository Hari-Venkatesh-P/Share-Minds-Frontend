import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler ,HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService  implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    if ((sessionStorage.getItem('user') || sessionStorage.getItem('admin')) && sessionStorage.getItem('jwttoken')) {
      req = req.clone({
        setHeaders: {
          Authorization: sessionStorage.getItem('jwttoken')
        }
      })
    }

    return next.handle(req);

  }
}
