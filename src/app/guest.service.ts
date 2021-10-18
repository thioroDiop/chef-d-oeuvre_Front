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

  /**
   * liste des invités
   */
  getAllGuest(): Observable<Guest[]> {
    return this.http.get<Guest[]>(this.baseUrl + 'guests');
  }

  /**
   * methode qui crée un nouveau invité
   * @param guest
   */
  createGuest(guest: Guest |undefined): Observable<Guest>{
    return this.http.post<Guest>(this.baseUrl+'guests/',guest)
  }


  /**
   * methode qui supprime un invité à partir de son id
   * @param guestId
   */
  deleteGuest(guestId: number):Observable<any>{
    return this.http.delete(this.baseUrl+'guests/'  + guestId)
  }

  /**
   * methode qui modifié un invité
   * @param guest
   */
  updateGuest( guest: Guest | undefined): Observable<Guest> {
    return this.http.put<Guest>(this.baseUrl+'guests/guest/update' ,guest);
  }

  /**
   *liste des invités a placé sur les tables et a attribué une tache/un role
   */
  organiseGuest():Observable<Guest[]> {
  return this.http.get<Guest[]>(this.baseUrl + 'guests/placed');
}



}
