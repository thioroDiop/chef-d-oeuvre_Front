import {Injectable} from '@angular/core';
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Credentials} from "./model/credentials";
import {Observable} from "rxjs";
import {Jwt} from "./model/jwt";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLoggedin: boolean = false;
  admin: boolean = false;
  static readonly JWT_STORAGE_KEY = environment.apiUrl + 'JWT_QUOTES_API';
  private readonly AUTH_ENDPOINT = environment.apiUrl + '/authentication';

  constructor(private http: HttpClient) {
  }

  //fonction pour se connecter
  signIn(credentials: Credentials): Observable<Jwt> {
    return this.http.post<Jwt>(this.AUTH_ENDPOINT + "/signin", credentials).pipe(
      tap(jwt => {
        //met le token dans la session Storage
        sessionStorage.setItem(UserService.JWT_STORAGE_KEY, jwt.idToken);
      }));
  }

  //fonction pour se déconnecter
  signOut(): void {
    sessionStorage.removeItem(UserService.JWT_STORAGE_KEY);
  }


//renvoie le role qui est connecté
  getRoles(): string[] {
    const jwt = sessionStorage.getItem(UserService.JWT_STORAGE_KEY);
    if (jwt) {
      // On décode la partie payload du token
      const tokenPayload = JSON.parse(atob(jwt.split('.')[1]));
      // On retourne les rôles
      return tokenPayload.auth.split(",")
    }
    return [];
  }

  //fonction pour verifier si on est connecté
  isLoggedIn(): boolean {
    let roles = this.getRoles();
    if (roles.length > 0) {
      this.isLoggedin = true;
      return this.isLoggedin;
    } else {
      return false;
    }
  }

  //fonction pour savoir si c'est l'admin qui est authentifié
  isAdmin(): boolean {
    let roles = this.getRoles();
    //on vérifie si le rôle est égale à roleAdmin,et on le met dans la variable
    this.admin = roles[roles.length - 1] === "ROLE_ADMIN";
    return this.admin;
  }

}
