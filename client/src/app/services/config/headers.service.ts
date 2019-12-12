import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlClient } from '../../app.global';

@Injectable({
  providedIn: 'root'
})
export class HeadersService {
  intercept(req: HttpRequest<any>, nxt: HttpHandler):
  Observable<HttpEvent<any>> {
    req = req.clone({
      withCredentials: true,
      headers: new HttpHeaders({
        'content-type': 'application/vnd.api+json',
        'Access-Control-Allow-Origin': urlClient,
        'Set-Cookie': 'HttpOnly;Secure;SameSite=Strict'
      })
    });

    return nxt.handle(req);
  }

  constructor() { }
}
