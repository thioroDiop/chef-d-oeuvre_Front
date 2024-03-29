import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BridalCouple} from "./bridalCouple";

@Injectable({
  providedIn: 'root'
})
export class BridalService {

  baseUrl ='https://localhost:8080/api/';
  constructor(private http: HttpClient) { }

  getBridalCouple(): Observable<BridalCouple[]> {
    return this.http.get<BridalCouple[]>(this.baseUrl + 'couple');
  }
  getNbGuestByBride(): Observable<Object> {
    return this.http.get<Object>(this.baseUrl + 'couple/nbGuest');
  }
}
