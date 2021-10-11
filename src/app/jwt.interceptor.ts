import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserService} from "./user.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() {
  }
//lui donne le token avant qu'il sorte
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (sessionStorage.getItem(UserService.JWT_STORAGE_KEY)) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${sessionStorage.getItem(UserService.JWT_STORAGE_KEY)}`
        }
      });
    }

    return next.handle(request);
  }
}
