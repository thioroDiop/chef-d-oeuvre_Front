import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {WeddingTable} from "./WeddingTable";
import {Guest} from "./guest";

@Injectable({
  providedIn: 'root'
})
export class TableService {
  baseUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) {
  }


  getTableById(idTable: number): Observable<WeddingTable> {
    return this.http.get<WeddingTable>(this.baseUrl + 'tables/' + idTable);
  }

  getAllTable(): Observable<WeddingTable[]> {
    return this.http.get<WeddingTable[]>(this.baseUrl + 'tables');
  }

  getGuestByTable(id: number): Observable<Guest[]> {
    return this.http.get<Guest[]>(this.baseUrl + 'guests/table/' + id);
  }

  getTableNotFull(): Observable<WeddingTable> {
    return this.http.get<WeddingTable>(this.baseUrl + 'tables/listeTableNonRempli')
  }
}
