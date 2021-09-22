import { Injectable } from '@angular/core';
import {HttpClient,HttpParams} from "@angular/common/http";
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

  getGuestByGift(id: number):Observable<Guest[]>{
    return this.http.get<Guest[]>(this.baseUrl+'guests/gifts/'+id);
  }


  getPaginatedGifts(page: number, size: number): Observable<Gift[]> {
    const params = new HttpParams().set('page', page).set('size', size)
    return this.http.get<Gift[]>(this.baseUrl + 'gifts', {params: params})
  }

  getTotalGiftsCount(): Observable<number> {
    return this.http.get<number>(this.baseUrl + 'gifts'+ '/count');
  }

}
