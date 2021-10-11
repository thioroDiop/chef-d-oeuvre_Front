import {Injectable} from '@angular/core';
import {environment} from "../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Credentials} from "./model/credentials";
import {Observable} from "rxjs";
import {Jwt} from "./model/jwt";
import {User} from "./model/user";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl ='http://localhost:8080';
  // @ts-ignore
  static readonly JWT_STORAGE_KEY = this.apiUrl + 'JWT_QUOTES_API';
  private readonly AUTH_ENDPOINT = this.apiUrl + '/authentication';
  private readonly USER_ENDPOINT = this.apiUrl + '/admin/users';

  constructor(private http: HttpClient) {
  }

  signIn(credentials: Credentials): Observable<Jwt> {
    return this.http.post<Jwt>(this.AUTH_ENDPOINT + "/signin", credentials).pipe(
      tap(jwt => {
        //met le token dans la session Storage
        sessionStorage.setItem(UserService.JWT_STORAGE_KEY, jwt.idToken);
      }));
  }

  signUp(user: User): Observable<any> {
    return this.http.post(this.AUTH_ENDPOINT + "/signup", user);
  }

  getPaginatedUsers(page: number, size: number): Observable<User[]> {
    const params = new HttpParams().set('page', page).set('size', size)
    return this.http.get<User[]>(this.USER_ENDPOINT, {params: params})
  }

  getTotalUsersCount(): Observable<number> {
    return this.http.get<number>(this.USER_ENDPOINT + '/count');
  }

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

}
