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
    //on vérifie si la session contient la clé qui permet d'avoir le Token
    if (sessionStorage.getItem(UserService.JWT_STORAGE_KEY)) {
      //si le JWT est présent, nous clonerons les en-têtes HTTP et ajouterons un en-tête supplémentaire, qui contiendra le token
      request = request.clone({
        //on rajoute à l'entête le token
        setHeaders: {
          Authorization: `Bearer ${sessionStorage.getItem(UserService.JWT_STORAGE_KEY)}`
        }
      });
    }//si le JWT n’est pas présent, la requête passe au serveur sans modification
    return next.handle(request);
  }
}
