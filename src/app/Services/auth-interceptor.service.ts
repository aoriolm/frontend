import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  accessToken: string | null;

  constructor(private localStorageService: LocalStorageService) {
    this.accessToken = this.localStorageService.get('accessToken');
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.accessToken = this.localStorageService.get('accessToken');
    if (this.accessToken) {
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json; charset=utf-8',
          Accept: 'application/json',
          'x-access-token': this.accessToken,
        },
      });
    }

    return next.handle(req);
  }
}
