import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Guest} from "./guest";
import {Gift} from "./gift";

@Injectable({
  providedIn: 'root'
})
export class GiftService {

  baseUrl ='http://localhost:8080/api/';
  constructor(private http: HttpClient) { }

  getAllGift(): Observable<Gift[]> {
    return this.http.get<Gift[]>(this.baseUrl + 'gifts');
  }

}
