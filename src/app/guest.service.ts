import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Observable} from "rxjs";
import {Guest} from "./guest";



@Injectable({
  providedIn: 'root'
})
export class GuestService {
baseUrl ='http://localhost:8080/api/';
  constructor(private http: HttpClient) { }

  getAllGuest(): Observable<Guest[]> {
    return this.http.get<Guest[]>(this.baseUrl + 'guests');
  }

  createGuest(guest: Guest |undefined): Observable<Guest>{
    return this.http.post<Guest>(this.baseUrl+'guests/',guest)
  }
}